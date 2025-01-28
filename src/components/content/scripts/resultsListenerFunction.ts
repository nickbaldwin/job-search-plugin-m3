import useStore from '../../../store/store.ts';
import {
    MessageType,
    subscribeToWindowMessages,
} from '../../../utils/messaging.ts';

import { log } from '../../../utils/logger.ts';
const moduleName = 'resultsListener';

const updateResults = useStore.getState().updateResults;
export const ListenerFunction = () => {
    log({ logType: 'info', moduleName, message: 'loaded' });
    const messageHandler = (event: MessageEvent<MessageType>) => {
        if (event.data?.type === 'results') {
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
        } else {
            //
        }
    };

    subscribeToWindowMessages(messageHandler);
};
