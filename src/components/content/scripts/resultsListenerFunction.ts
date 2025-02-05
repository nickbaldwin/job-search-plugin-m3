import useStore from '../../../store/store.ts';
import {
    MessageType,
    subscribeToWindowMessages,
} from '../../../utils/messaging.ts';

import { log } from '../../../utils/logger.ts';
const moduleName = 'resultsListener';

const updateResults = useStore.getState().updateResults;
const updateFingerprintId = useStore.getState().updateFingerprintId;
const updateSearchId = useStore.getState().updateSearchId;
const updateRequest = useStore.getState().updateRequest;
const updateContext = useStore.getState().updateContext;
const updateEstimatedTotalSize = useStore.getState().updateEstimatedTotalSize;

export const ListenerFunction = () => {
    log({ logType: 'info', moduleName, message: 'loaded' });
    const messageHandler = (event: MessageEvent<MessageType>) => {
        if (event.data?.type === 'SEARCH_RESULTS_UPDATED') {
            log({
                logType: 'info',
                moduleName,
                fn: 'message handler',
                message: 'results message received',
                payload: event?.data,
            });
            // @ts-expect-error todo typing
            updateResults(event?.data?.payload);
            console.log(window.location.href);
        }

        if (event.data?.type === 'ESTIMATED_TOTAL_SIZE_UPDATED') {
            log({
                logType: 'info',
                moduleName,
                fn: 'message handler',
                message: 'estimated total size message received',
                payload: event?.data,
            });
            // @ts-expect-error todo typing
            updateEstimatedTotalSize(event?.data?.payload);
        }

        if (event.data?.type === 'SEARCH_REQUEST_UPDATED') {
            log({
                logType: 'info',
                moduleName,
                fn: 'message handler',
                message: 'search request message received',
                payload: event?.data,
            });
            // @ts-expect-error todo typing
            updateRequest(event?.data?.payload);
        }

        if (event.data?.type === 'APP_CONTEXT_UPDATED') {
            log({
                logType: 'info',
                moduleName,
                fn: 'message handler',
                message: 'app context message received',
                payload: event?.data,
            });
            // @ts-expect-error todo typing
            updateContext(event?.data?.payload);
        }

        if (event.data?.type === 'SEARCH_ID_UPDATED') {
            log({
                logType: 'info',
                moduleName,
                fn: 'message handler',
                message: 'search id message received',
                payload: event?.data,
            });
            // @ts-expect-error todo typing
            updateSearchId(event?.data?.payload);
        }

        if (event.data?.type === 'FINGERPRINT_ID_UPDATED') {
            log({
                logType: 'info',
                moduleName,
                fn: 'message handler',
                message: 'fingerprint id message received',
                payload: event?.data,
            });
            // @ts-expect-error todo typing
            updateFingerprintId(event?.data?.payload);
        }
    };

    subscribeToWindowMessages(messageHandler);
};
