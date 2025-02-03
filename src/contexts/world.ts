import { helper } from '../helpers/helper.ts';
import { log } from '../utils/logger.ts';

const moduleName = 'world script';
log({ logType: 'info', moduleName, message: 'loaded' });

console.log(helper());

const sendResults = () => {
    log({
        logType: 'info',
        moduleName,
        fn: 'sendResults',
        // @ts-expect-error added to window by SVX
        payload: window.searchResults,
    });

    window.postMessage(
        {
            type: 'results',
            // @ts-expect-error added to window by SVX
            payload: window.searchResults,
            source: 'content',

            // todo
            // type: 'JOB_RESULTS_UPDATED',
            // payload: window.searchResults?.jobResults || [],
        },
        '*'
    );
};

const sendSearchId = () => {
    // @ts-expect-error added to window by SVX
    const searchId = window.searchResults?.searchId || '';

    log({
        logType: 'info',
        moduleName,
        fn: 'sendSearchId',
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

const sendFingerprintId = () => {
    // @ts-expect-error added to window by SVX
    const fingerprintId = window.searchResults?.fingerprintId || '';

    log({
        logType: 'info',
        moduleName,
        fn: 'sendFingerprintId',
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

const sendRequest = () => {
    // @ts-expect-error added to window by SVX
    let req = window.searchResults?.jobRequest || {};
    // @ts-expect-error added to window by SVX
    req.estimatedTotalSize = window.searchResults?.estimatedTotalSize || 0;
    // @ts-expect-error added to window by SVX
    req.totalSize = window.searchResults?.totalSize || 0;

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
};

// have to use poller here, as memoized state is partially set then updated later with the data
// todo - parse with zod
const sendContext = (nodeWithRequestInfo: {
    memoizedState?: {
        baseState?: { location?: any; client?: any; software?: any };
    };
}) => {
    if (nodeWithRequestInfo) {
        const poll = setInterval(() => {
            const n = nodeWithRequestInfo.memoizedState?.baseState;
            // @ts-ignore
            if (n?.location) {
                clearInterval(poll);

                log({
                    logType: 'info',
                    moduleName,
                    fn: 'sendRequest',
                    payload: {
                        location: n.location,
                        client: {
                            amplitudeDeviceId: n.client.amplitudeDeviceId,
                            fingerprintId: n.client.fingerprintId,
                            ipAddress: n.client.ipAddress,
                        },
                        software: n.software,
                        // @ts-expect-error added to window by SVX
                        totalSize: window.searchResults?.totalSize,
                        // @ts-expect-error added to window by SVX
                        searchId: window.searchResults?.searchId,
                        fingerprintId:
                            // @ts-expect-error added to window by SVX
                            window.searchResults?.jobRequest?.fingerprintId,
                    },
                });

                window.postMessage(
                    {
                        type: 'APP_CONTEXT_UPDATED',
                        // @ts-ignore
                        payload: {
                            location: n.location,
                            client: {
                                amplitudeDeviceId: n.client.amplitudeDeviceId,
                                fingerprintId: n.client.fingerprintId,
                                ipAddress: n.client.ipAddress,
                            },
                            software: n.software,
                            // @ts-expect-error added to window by SVX
                            totalSize: window.searchResults?.totalSize,
                            // @ts-expect-error added to window by SVX
                            searchId: window.searchResults?.searchId,
                            fingerprintId:
                                // @ts-expect-error added to window by SVX
                                window.searchResults?.jobRequest?.fingerprintId,
                        },
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
            // console.log('header has key');
            // @ts-ignore
            let item = header[key];
            let numberIt = 0;
            // todo!
            while (
                item.memoizedState?.baseState?.client === undefined &&
                numberIt < 50
            ) {
                item = item?.return;
                numberIt++;
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
            sendRequest();
            sendSearchId();
            sendFingerprintId();
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
