import { z } from 'zod';

const Context = z
    .object({
        client: z.optional(
            z.object({
                ipAddress: z.string(),
                fingerprintId: z.string(),
                amplitudeDeviceIdz: z.string(),
            })
        ),
        software: z.optional(
            z.object({
                environment: z.string(),
                country: z.string(),
                language: z.string(),
                siteId: z.string(),
                tenant: z.string(),
                pageSize: z.string(),
                host: z.string(),
                originHost: z.string(),
            })
        ),
        location: z.optional(
            z.object({
                currentLocation: z.string(),
                urlParams: z.object({
                    distributor: z.array(z.optional(z.string())),
                }),
            })
        ),
    })
    .transform((item) => {
        return {
            ipAddress: item.client?.ipAddress || '',
            fingerprintId: item.client?.fingerprintId || '',
            amplitudeDeviceIdz: item.client?.amplitudeDeviceIdz || '',
            environment: item.software?.environment || '',
            country: item.software?.environment || '',
            language: item.software?.environment || '',
            pageSize: item.software?.environment || '',
            host: item.software?.environment || '',
            query: item.location?.currentLocation || '',
            data: item,
        };
    });

export type Context = {
    ipAddress: string;
    fingerprintId: string;
    amplitudeDeviceIdz: string;
    environment: string;
    country: string;
    language: string;
    pageSize: string;
    host: string;
    query: string;
    data: object;
};
export type ParsedContext = {
    success: boolean;
    // error? string;
    data?: Context;
};

export const parseJob = (ctx: object): ParsedContext => {
    return Context.safeParse(ctx);
};
