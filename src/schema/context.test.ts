import { expect, test } from 'vitest';
import { parseContext, transformContext } from './context.ts';
import sampleContext from './samples/sampleContext.json';

test('parsing fails if required properties not included', () => {
    expect(parseContext({ client: null })).toMatchObject({ success: false });
});

test('parsing succeeds with valid context info', () => {
    // expect(parseContext(sampleContext)).toMatchObject({ success: true });
    expect(parseContext(sampleContext)).toMatchObject({
        success: true,
        data: {
            amplitudeDeviceId: 'random-ad5ef97d-b429-4c8a-8877-51e860f755e6',
        },
    });
});

test('parsing flattens context', () => {
    expect(parseContext(sampleContext).data).toMatchObject({
        query: '/jobs/q-customer-service-jobs?so=p.h.p',
    });
});

test('transform fails if required properties not included', () => {
    expect(transformContext({ client: null })).toMatchObject({
        error: 'there are errors processing the request. see logs',
    });
});

test('transform returns a flattened object for a valid context', () => {
    expect(transformContext(sampleContext)).toMatchObject({
        query: '/jobs/q-customer-service-jobs?so=p.h.p',
    });
});
