import { expect, test } from 'vitest';
import { parseRequest, transformRequest } from './request.ts';
import sampleRequest from './samples/sampleRequest.json';

test('parsing fails if required properties not included', () => {
    expect(parseRequest({ jobId: '1234' })).toMatchObject({
        success: false,
        error: expect.any(Object),
    });
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

test('transform fails if required properties not included', () => {
    expect(transformRequest({ jobId: '1234' })).toMatchObject({
        error: 'there are errors processing the request. see logs',
    });
});

test('transform returns a flattened object for a valid request', () => {
    expect(transformRequest(sampleRequest)).toMatchObject({
        jobQueryLocations: 'Ashburn, VA, us',
        jobAdsRequestType: 'JOB_SEARCH',
    });
});
