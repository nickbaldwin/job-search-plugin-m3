import { z, ZodError } from 'zod';

// todo - identify optional properties
const Request = z
    .object({
        offset: z.number(),
        pageSize: z.number(),
        jobQuery: z.object({
            query: z.string(),
            locations: z.array(
                z.object({
                    address: z.string(),
                    country: z.string(),
                    radius: z.object({
                        unit: z.string(),
                        value: z.number(),
                    }),
                })
            ),
            disableSpellCheck: z.boolean(),
            queryLanguageCode: z.string(),
        }),
        orderBy: z.string(),
        debug: z.boolean(),
        overrideOptions: z.boolean(),
        enableDiversification: z.boolean(),
        disableKeywordMatch: z.boolean(),
        enableBroadening: z.boolean(),
        freeJobsOnly: z.boolean(),
        paidJobsOnly: z.boolean(),
        gctsJobCount: z.number(),
        jobAdsRequest: z.object({
            placement: z.object({
                channel: z.string(),
                location: z.string(),
                property: z.string(),
                type: z.string(),
                view: z.string(),
            }),
            position: z.array(z.number()),
        }),
        searchId: z.string(),
        includeJobs: z.array(z.string()),
        fingerprintId: z.string(),
    })
    .transform((item) => {
        return {
            offset: '' + item.offset || '',
            pageSize: '' + item.pageSize || '',
            jobQuery: item.jobQuery.query || '',
            jobQueryLocations:
                item.jobQuery.locations
                    .map((loc) => loc.address + ', ' + loc.country)
                    .join('. ') || '',
            jobQueryRadius:
                item.jobQuery.locations
                    .map((loc) => loc.radius.unit + ' ' + loc.radius.value)
                    .join('. ') || '',
            disableSpellCheck: item.jobQuery.disableSpellCheck
                ? 'true'
                : 'false',
            queryLanguageCode: item.jobQuery.queryLanguageCode || '',
            orderBy: item.orderBy || '',

            overrideOptions: item.overrideOptions ? 'true' : 'false',
            enableDiversification: item.enableDiversification
                ? 'true'
                : 'false',
            disableKeywordMatch: item.disableKeywordMatch ? 'true' : 'false',
            enableBroadening: item.enableBroadening ? 'true' : 'false',
            freeJobsOnly: item.freeJobsOnly ? 'true' : 'false',
            paidJobsOnly: item.paidJobsOnly ? 'true' : 'false',
            jobAdsRequest: item.jobAdsRequest.placement.channel || '',
            jobAdsRequestLocation: item.jobAdsRequest.placement.location || '',
            jobAdsRequestProperty: item.jobAdsRequest.placement.property || '',
            jobAdsRequestType: item.jobAdsRequest.placement.type || '',
            jobAdsRequestView: item.jobAdsRequest.placement.view || '',
            jobAdsRequestPosition: item.jobAdsRequest.position.join(', ') || '',
            searchId: item.searchId || '',
            fingerprintId: item.fingerprintId || '',
            // data: item,
        };
    });

// export type Request = z.infer<typeof Request>;
export type Request = {
    [key: string]: string;
};
export type ParsedRequest = {
    success: boolean;
    error?: ZodError;
    data?: Request;
};

export const parseRequest = (req: object): ParsedRequest => {
    return Request.safeParse(req);
};

export const transformRequest = (req: object): Request => {
    const parsed = parseRequest(req);
    console.log('parsed request', parsed);
    if (!parsed) {
        return { error: 'no request info available' };
    }
    if (parsed.error) {
        return { error: 'there are errors processing the request. see logs' };
    }
    return parsed.data || { message: 'no request info' };
};
