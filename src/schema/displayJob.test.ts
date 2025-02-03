import { expect, test } from 'vitest';
import { transformJob } from './displayJob.ts';
import job from './samples/sampleJob.json';

test('transformed job has correct properties', () => {
    expect(transformJob(job, 15)).toMatchObject({
        jobId: '2f12116d-328f-4d06-811a-adfc6fafede4',
        title: 'Software Engineer',
        company: 'Kforce Inc.',
        position: '15',
    });
});
