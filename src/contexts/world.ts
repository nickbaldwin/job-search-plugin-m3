import { helper } from '../helpers/helper.ts';
import { log } from '../utils/logger.ts';

// todo? move into schema and tidy
declare global {
    interface Window {
        searchResults?: {
            estimatedTotalSize: number;
            gctsReqId: string;
            histogramQueryResult: [];
            jobRequest: { fingerprintId: string };
            jobResults: object[];
            requestTime: number;
            searchId: string;
            totalSize: number;
        };
    }
}

const moduleName = 'world script';
log({ logType: 'info', moduleName, message: 'loaded' });

console.log(helper());

const sendResults = () => {
    log({
        logType: 'info',
        moduleName,
        fn: 'sendResults',
        // added to window by SVX
        // todo - just pass results object
        payload: window.searchResults,
    });

    window.postMessage(
        {
            type: 'SEARCH_RESULTS_UPDATED',
            // added to window by SVX
            payload: window.searchResults,
            source: 'content',

            // todo - just pass results object
            // type: 'JOB_RESULTS_UPDATED',
            // payload: window.searchResults?.jobResults || [],
        },
        '*'
    );
};

const sendSearchId = () => {
    // added to window by SVX
    const searchId = window.searchResults?.searchId || '';

    log({
        logType: 'info',
        moduleName,
        fn: 'sendSearchId',
        // todo - typing
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: searchId,
    });

    window.postMessage(
        {
            type: 'SEARCH_ID_UPDATED',
            payload: searchId,
            source: 'content',
        },
        '*'
    );
};

const sendEstimatedTotalSize = () => {
    // added to window by SVX
    const est = window.searchResults?.estimatedTotalSize || '';

    log({
        logType: 'info',
        moduleName,
        fn: 'sendEstimatedTotalSize',
        // todo - typing
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: est,
    });

    window.postMessage(
        {
            type: 'ESTIMATED_TOTAL_SIZE_UPDATED',
            payload: est,
            source: 'content',
        },
        '*'
    );
};

const sendRequest = () => {
    // todo - clone?
    // added to window by SVX
    const req = window.searchResults?.jobRequest || { fingerprintId: '' };

    log({
        logType: 'info',
        moduleName,
        fn: 'sendRequest',
        payload: req,
    });

    window.postMessage(
        {
            type: 'SEARCH_REQUEST_UPDATED',
            payload: req,
            source: 'content',
        },
        '*'
    );

    const fingerprintId = req?.fingerprintId || '';
    log({
        logType: 'info',
        moduleName,
        fn: 'sendFingerprintId',
        // todo typing
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        payload: fingerprintId,
    });

    window.postMessage(
        {
            type: 'FINGERPRINT_ID_UPDATED',
            payload: fingerprintId,
            source: 'content',
        },
        '*'
    );
};

// have to use poller here, as memoized state is partially set then updated later with the data
// todo - parse with zod
const sendContext = (nodeWithRequestInfo: {
    memoizedState?: {
        baseState?: {
            location?: object;
            client?: {
                amplitudeDeviceId: string;
                fingerprintId: string;
                ipAddress: string;
            };
            software?: object;
        };
    };
}) => {
    if (nodeWithRequestInfo) {
        const poll = setInterval(() => {
            const ctx = nodeWithRequestInfo.memoizedState?.baseState;
            if (ctx?.location) {
                clearInterval(poll);

                const clone = {
                    ...ctx,
                    // do not copy property with function that can't be serialized
                    client: {
                        amplitudeDeviceId: ctx?.client?.amplitudeDeviceId,
                        fingerprintId: ctx?.client?.fingerprintId,
                        ipAddress: ctx?.client?.ipAddress,
                    },
                };

                log({
                    logType: 'info',
                    moduleName,
                    fn: 'sendContext',
                    payload: clone,
                });

                window.postMessage(
                    {
                        type: 'APP_CONTEXT_UPDATED',
                        payload: clone,
                        source: 'content',
                    },
                    '*'
                );
            }
        }, 200);
    }
};

const header = document.querySelector('.ds-header');
const findRequest = () => {
    if (!header) {
        return null;
    }
    for (const key in header) {
        if (key.startsWith('__reactFiber$')) {
            // @ts-expect-error no need to type this
            let item = header[key];
            let iterations = 0;
            // todo!
            while (
                item.memoizedState?.baseState?.client === undefined &&
                iterations < 50
            ) {
                item = item?.return;
                iterations++;
            }
            if (item.memoizedState?.baseState) {
                return item;
            } else {
                return null;
            }
        }
    }
};

// @ts-expect-error todo
const poller: number = setInterval((): void => {
    log({ logType: 'info', moduleName, message: 'polling...' });
    const cards = document.querySelector('.infinite-scroll-component');

    // todo ? - deal with card grid layout, and switching layout
    const cardListSplit = document.querySelector('#JobCardGrid>div');

    if (cards !== null && cardListSplit !== null) {
        log({ logType: 'info', moduleName, message: 'clear polling...' });
        clearInterval(poller);

        // if we have results, then there will be a request
        const nodeWithRequestInfo = findRequest();
        const sendData = () => {
            sendResults();
            sendEstimatedTotalSize();
            sendRequest(); // and fingerprintId
            sendSearchId();
            sendContext(nodeWithRequestInfo);
        };
        // need to send initial results, for popular searches
        sendData();

        const sendDataForEmptySearches = () => {
            const empty = document.querySelector('[type=empty]');
            if (empty) {
                sendData();
            }
        };

        let isFirstRender = true;

        log({
            logType: 'INFO',
            moduleName,
            fn: 'poller',
            message: 'setting up observer',
            payload: cardListSplit,
        });

        // monitor updates to card list and listen for mouse hovers
        const resultsObserver = new MutationObserver((mutations: any) => {
            if (isFirstRender) {
                // send results for empty searches - which takes time to resolve
                log({
                    logType: 'INFO',
                    moduleName,
                    fn: 'resultsObserver',
                    message:
                        'first render... sending results (to handle empty searches)',
                    // payload: mutations,
                });
                setTimeout(sendDataForEmptySearches, 5000);
                isFirstRender = false;
            }
            log({
                logType: 'INFO',
                moduleName,
                fn: 'resultsObserver',
                message: 'results list changed... sending results',
                // payload: mutations,
            });
            sendData();
        });

        resultsObserver.observe(cardListSplit, {
            childList: true,
        });
    }
}, 300);
