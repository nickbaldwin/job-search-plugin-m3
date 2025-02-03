import { expect, test } from 'vitest';
import { parseRequest } from './request.ts';
import sampleRequest from './samples/sampleRequest.json';

test('parsing fails if required properties not included', () => {
    expect(parseRequest({ jobId: '1234' })).toMatchObject({ success: false });
});

test('parsing succeeds with valid request info', () => {
    expect(parseRequest(sampleRequest)).toMatchObject({ success: true });
    expect(parseRequest(sampleRequest).data).toMatchObject({ offset: '0' });
});

test('parsing flattens request', () => {
    expect(parseRequest(sampleRequest).data).toMatchObject({
        jobQueryLocations: 'Ashburn, VA, us',
        jobAdsRequestType: 'JOB_SEARCH',
    });
});
