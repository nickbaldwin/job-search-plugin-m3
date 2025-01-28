import useStore from '../../../store/store.ts';
import {
    MessageType,
    subscribeToWindowMessages,
} from '../../../utils/messaging.ts';
import { useEffect } from 'react';
import { log } from '../../../utils/logger.ts';

const moduleName = 'resultsListener';

// this component is responsible for listening to messages from the world script
// however zustand allows the store to be used outside of React, so we can use
// update the store from the world script - using a listener function
export const Listener = () => {
    const setResults = useStore((state) => state.results);

    useEffect(() => {
        const messageHandler = (event: MessageEvent<MessageType>) => {
            log({
                logType: 'info',
                moduleName,
                message: 'event received',
                payload: event?.data,
            });

            if (event.data?.type === 'results') {
                // @ts-expect-error need to tadd type
                const n = event?.data?.payload?.jobResults?.length || 0;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setResults(n);
            } else {
                //
            }
        };
        subscribeToWindowMessages(messageHandler);

        return () => {
            console.log(
                'cleanup - removing event listener in listener component'
            );
            window.removeEventListener('message', messageHandler);
        };
    }, [setResults]);

    return <></>;
};
