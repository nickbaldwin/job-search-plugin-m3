import { z, ZodError } from 'zod';

const Context = z
    .object({
        client: z.optional(
            z.object({
                ipAddress: z.string(),
                fingerprintId: z.string(),
                amplitudeDeviceId: z.string(),
            })
        ),
        software: z.optional(
            z.object({
                environment: z.string(),
                country: z.string(),
                language: z.string(),
                siteId: z.string(),
                tenant: z.string(),
                pageSize: z.number(),
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
            amplitudeDeviceId: item.client?.amplitudeDeviceId || '',
            environment: item.software?.environment || '',
            country: item.software?.country || '',
            language: item.software?.language || '',
            pageSize: '' + item.software?.pageSize || '',
            host: item.software?.environment || '',
            query: item.location?.currentLocation || '',
            //data: item,
        };
    });

// export type Context = z.infer<typeof Context>;
export type Context = {
    [key: string]: string;
};

export type ParsedContext = {
    success: boolean;
    error?: ZodError;
    data?: Context;
};

export const parseContext = (ctx: object): ParsedContext => {
    return Context.safeParse(ctx);
};

export const transformContext = (ctx: object): Context => {
    const parsed = parseContext(ctx);
    if (!parsed) {
        return { error: 'no request info available' };
    }
    if (parsed.error) {
        return { error: 'there are errors processing the request. see logs' };
    }
    return parsed.data || { message: 'no request info' };
};
