import { parseJob } from './job.ts';

// todo - move interface or dynamically construct it
export interface DisplayJob {
    // all these properties from the job data
    title: string;
    description: string;
    location: string;
    remote: string;
    company: string;
    nowId: string;
    jobId: string;
    template: string;
    xCode: string;
    applyType: string;
    formattedDate: string;
    mesco: string;
    provider: string;
    providerCode: string;
    providerJobId: string;
    dateRecency: string;
    ingestionMethod: string;
    pricingType: string;
    seoJobId: string;
    refCode: string;
    validThrough: string;
    validThroughGoogle: string;
    url: string;
    jobType: string;
    adProvider: string;
    searchEngine: string;

    data: object | null; // holds the source data
    kevelData: object | null; // holds the unencoded data from impression url from kevel via jobAd property
    decisionId: string; // from kevel data
    adRank: string; // from kevel data
    remainder: string; // from kevel data
    auctionBids: string; // from kevel data
    relevanceScore: string; // from kevel data
    ecpm: string; // from kevel data
    price: string; // from kevel data
    campaignId: string; // from kevel data

    position: string; // derived directly from order in results
    selected: boolean; // updated by ui
}

// todo - remove or move into test data
export const blankJob: DisplayJob = {
    adProvider: '',
    adRank: '',
    applyType: '',
    campaignId: '',
    data: null,
    dateRecency: '',
    decisionId: '',
    ecpm: '0',
    formattedDate: '',
    ingestionMethod: '',
    kevelData: null,
    mesco: '',
    nowId: '',
    position: '',
    price: '0',
    pricingType: '',
    provider: '',
    providerCode: '',
    providerJobId: '',
    refCode: '',
    relevanceScore: '0',
    remainder: '',
    auctionBids: '',
    remote: '',
    searchEngine: '',
    selected: false,
    seoJobId: '',
    template: '',
    url: '',
    validThrough: '',
    validThroughGoogle: '',
    xCode: '',
    title: '',
    description: '',
    company: '',
    location: '',
    // datePosted: datePosted,
    jobId: '',
    jobType: '',
};

// todo - use Job type

// @ts-expect-error todo
export const transformJob = (job: object, position: number): DisplayJob => {
    const parsed = parseJob(job);
    console.log('parsed', parsed);
    if (parsed.success && parsed.data) {
        return {
            ...parsed.data,
            position: '' + position,
        };
    } else if (!parsed.success) {
        // todo deal with error
        /*
        parsed.error.issues.forEach((issue) => {
            console.log('\n\n\n', issue, '\n\n\n');
        });
         */
        return blankJob;
    }
};

export const transformJobs = (jobs: object[]): DisplayJob[] => {
    if (!jobs || jobs.length === 0) {
        return [];
    }
    return jobs.map(transformJob);
};
