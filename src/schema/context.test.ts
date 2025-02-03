import { expect, test } from 'vitest';
import { parseContext } from './context.ts';
import sampleContext from './samples/sampleContext.json';

test('parsing fails if required properties not included', () => {
    expect(parseContext({ client: null })).toMatchObject({ success: false });
});

test('parsing succeeds with valid request info', () => {
    // expect(parseContext(sampleContext)).toMatchObject({ success: true });
    expect(parseContext(sampleContext)).toMatchObject({
        success: true,
        data: {
            amplitudeDeviceId: 'random-ad5ef97d-b429-4c8a-8877-51e860f755e6',
        },
    });
});

test('parsing flattens request', () => {
    expect(parseContext(sampleContext).data).toMatchObject({
        query: '/jobs/q-customer-service-jobs?so=p.h.p',
    });
});
