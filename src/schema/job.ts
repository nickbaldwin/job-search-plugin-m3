import { z } from 'zod';
import { DisplayJob } from './displayJob.ts';
import {
    formatDate,
    formatLocation,
    formatMescos,
    formatNowId,
    formatProviderJobId,
    getDataFromUrl,
    KevelData,
} from './jobHelpers.ts';

const Job = z
    .object({
        jobId: z.string(),
        externalIdentifiers: z.optional(
            z.array(
                z.object({
                    identifierName: z.string(),
                    identifierValue: z.string(),
                })
            )
        ),
        provider: z.optional(
            z.object({
                code: z.optional(z.string()),
                name: z.optional(z.string()),
            })
        ),
        status: z.string(),
        jobStatus: z.object({
            status: z.string(),
        }),
        ingestionMethod: z.string(),
        createdDate: z.string(),
        modifiedDate: z.string(),
        apply: z.object({
            applyType: z.string(),
            applyUrl: z.optional(z.string()),
        }),
        jobPosting: z.object({
            description: z.string(),
            url: z.string(),
            datePosted: z.string(),
            hiringOrganization: z.object({
                name: z.string(),
            }),
            identifier: z.optional(
                z.object({
                    name: z.string(),
                    value: z.string(),
                })
            ),
            title: z.string(),
            jobLocation: z.array(
                z.object({
                    address: z.optional(
                        z.object({
                            addressLocality: z.optional(z.string()),
                            addressRegion: z.optional(z.string()),
                            addressCountry: z.optional(z.string()),
                        })
                    ),
                    geo: z.optional(
                        z.object({
                            latitude: z.string(),
                            longitude: z.string(),
                        })
                    ),
                })
            ),
        }),
        attributeValuePairs: z.optional(
            z.array(
                z.object({
                    name: z.string(),
                    value: z.string(),
                })
            )
        ),
        normalizedJobPosting: z.object({
            description: z.string(),
            url: z.string(),
            datePosted: z.string(),
            employmentType: z.array(z.string()),
            hiringOrganization: z.object({
                name: z.string(),
            }),
            identifier: z.optional(
                z.object({
                    name: z.string(),
                    value: z.string(),
                })
            ),
            jobLocation: z.optional(
                z.array(
                    z.object({
                        address: z.optional(
                            z.object({
                                addressLocality: z.optional(z.string()),
                                addressRegion: z.optional(z.string()),
                                addressCountry: z.optional(z.string()),
                            })
                        ),
                        geo: z.optional(
                            z.object({
                                latitude: z.string(),
                                longitude: z.string(),
                            })
                        ),
                    })
                )
            ),
            jobLocationType: z.string(),
            occupationalCategory: z.optional(z.string()),
            salaryCurrency: z.string(),
            title: z.string(),
            validThrough: z.string(),
        }),
        now: z.optional(
            z.object({
                jobAdPricingTypeId: z.optional(z.number()),
                trackingUrl: z.optional(z.string()),
                activationDate: z.optional(z.string()),
                attributeValuePairs: z.optional(
                    z.array(
                        z.object({
                            name: z.string(),
                            value: z.string(),
                        })
                    )
                ),
                templateId: z.optional(z.number()),
            })
        ),
        policyDecisions: z.object({
            jobLocationTypeDecision: z.object({
                type: z.string(),
                explanation: z.string(),
                result: z.string(),
            }),
        }),
        enrichments: z.object({
            language: z.object({
                languageCode: z.string(),
            }),
            mescos: z.optional(
                z.array(
                    z.object({
                        id: z.string(),
                    })
                )
            ),
            normalizedJobLocations: z.array(
                z.object({
                    postalAddress: z.optional(
                        z.object({
                            '@context': z.string(),
                            '@type': z.string(),
                            address: z.optional(
                                z.object({
                                    '@type': z.string(),
                                    addressLocality: z.optional(z.string()),
                                    addressRegion: z.optional(z.string()),
                                    addressCountry: z.optional(z.string()),
                                    postalCode: z.optional(z.string()),
                                })
                            ),
                            geo: z.optional(
                                z.object({
                                    '@type': z.string(),
                                    latitude: z.string(),
                                    longitude: z.string(),
                                })
                            ),
                        })
                    ),
                    locationId: z.string(),
                    countryCode: z.string(),
                })
            ),
            companyKb: z.optional(
                z.object({
                    normalizedCompanyName: z.optional(z.string()),
                    normalizedCompanyGuid: z.optional(z.string()),
                    code: z.optional(z.string()),
                })
            ),
            normalizedTitles: z.array(
                z.object({
                    title: z.string(),
                })
            ),
            normalizedSalary: z.optional(
                z.object({
                    currencyCode: z.object({
                        name: z.string(),
                        id: z.number(),
                    }),
                    salaryBaseType: z.object({
                        name: z.string(),
                        id: z.number(),
                    }),
                })
            ),
            jobLocationType: z.object({
                name: z.string(),
                id: z.number(),
            }),
            employmentTypes: z.array(
                z.object({
                    name: z.string(),
                    id: z.number(),
                })
            ),
            status: z.object({
                name: z.string(),
                id: z.number(),
            }),
            applyType: z.object({
                name: z.string(),
                id: z.number(),
            }),
            ingestionMethod: z.object({
                name: z.string(),
                id: z.number(),
            }),
            localizedMonsterUrls: z.array(
                z.object({
                    locationId: z.string(),
                    url: z.string(),
                })
            ),
            qualifiedForG4J: z.optional(z.boolean()),
            isPublicJob: z.optional(z.boolean()),
            googleSyntheticValidThrough: z.string(),
            processedDescriptions: z.object({
                shortDescription: z.string(),
            }),
            normalizedDatePosted: z.string(),
            soc: z.optional(
                z.array(
                    z.object({
                        id: z.string(),
                        usen: z.string(),
                    })
                )
            ),
            hashes: z.array(
                z.object({
                    sourcePath: z.string(),
                    description: z.string(),
                    hashAlgorithm: z.string(),
                    value: z.string(),
                })
            ),
        }),
        seoJobId: z.string(),
        formattedDate: z.string(),
        dateRecency: z.string(),
        jobAd: z.optional(
            z.object({
                type: z.string(),
                provider: z.string(),
                tracking: z.object({
                    clickUrl: z.string(),
                    impressionUrl: z.string(),
                }),
            })
        ),
        brandingExt: z.optional(
            z.object({
                companyBannerUrl: z.nullable(z.string()),
                companyPhotos: z.nullable(
                    z.array(
                        z.object({
                            caption: z.string(),
                            url: z.string(),
                        })
                    )
                ),
                companyBenefits: z.nullable(
                    z.array(
                        z.object({
                            name: z.string(),
                            iconClass: z.string(),
                        })
                    )
                ),
            })
        ),
        canonicalUrl: z.string(),
        searchEngine: z.string(),
        bespokeJob: z.boolean(),
        ldJsonEligible: z.boolean(),
        promoted: z.boolean(),
        // todo - optional?
        jobType: z.optional(z.string()),
    })
    .transform((item) => {
        let kevelData: KevelData = {};
        if (item.jobAd) {
            kevelData = getDataFromUrl(item.jobAd.tracking.impressionUrl || '');
        }
        return {
            title:
                item.normalizedJobPosting.title || item.jobPosting.title || '',
            description:
                item.normalizedJobPosting.description ||
                item.jobPosting.description ||
                '',
            location: formatLocation(item.enrichments.normalizedJobLocations),
            remote:
                item.policyDecisions.jobLocationTypeDecision.result ||
                item.normalizedJobPosting.jobLocationType ||
                '',
            company:
                item.normalizedJobPosting.hiringOrganization.name ||
                item.jobPosting.hiringOrganization.name ||
                '',
            nowId: formatNowId(item.externalIdentifiers),
            jobId: item.jobId || '',
            template: item.now?.templateId ? '' + item.now?.templateId : '',
            xCode: item.enrichments.companyKb?.code || '',
            applyType: item.apply.applyType || '',
            formattedDate: formatDate(item.formattedDate),
            mesco: formatMescos(item.enrichments?.mescos),
            provider: item.provider?.name || '',
            providerCode: item.provider?.code || '',
            providerJobId: formatProviderJobId(item.externalIdentifiers),
            dateRecency: item.dateRecency || '',
            ingestionMethod: item.ingestionMethod || '',
            pricingType: '' + item.now?.jobAdPricingTypeId || '',
            seoJobId: item.seoJobId || '',
            refCode: item.jobPosting.identifier?.value || '',
            validThrough: item.normalizedJobPosting.validThrough || '',
            validThroughGoogle:
                item.enrichments.googleSyntheticValidThrough || '',
            url: item.canonicalUrl || item.jobPosting.url || '',
            jobType: item.jobType || '',

            adProvider: item.jobAd?.provider || '',
            searchEngine: item.searchEngine || '',

            data: { ...item },
            kevelData,

            decisionId: kevelData?.decisionId || '',
            adRank: kevelData?.adRank || '',
            auctionBids: kevelData?.auctionBids || '',
            remainder: kevelData?.remainder || '',
            relevanceScore: kevelData?.relevanceScore || '',
            ecpm: kevelData?.ecpm || '',
            price: kevelData?.price || '',
            campaignId: kevelData?.campaignId || '',

            // todo - add here or pass in later?
            position: 'y',
            selected: false,
        };
    });

export const parseJob = (job: object): ParsedJob => {
    return Job.safeParse(job);
};

// extract the inferred type
// todo - does this include the transform? can be used for DisplayJob then
export type Job = z.infer<typeof Job>;
// { jobId: string }

export type ParsedJob = {
    success: boolean;
    data?: DisplayJob;
};
