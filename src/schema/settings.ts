import { formatDate } from './jobHelpers.ts';

export const currentVersion = {
    version: '4.0.0',
};

// note: this interface came from an earlier version of the extension
// some of the properties were required for the table component to work
// others were required for transforming the data - but this is now handled by zod
// can be streamlined
export interface DataProperty {
    field: string; // identifier used in code
    title: string; // name displayed in UI
    width: string; // default width of field if shown in table
    sensitive: boolean;
    locked: boolean; // locks field in table
    // if locked, reorderable should be false
    reorderable: boolean; // stops field from being moved, if shown in table
    orderIndex?: number; // 0 indicates it should always be displayed before reorderable fields
    visible: boolean; // default visibility of field in table
    jobProperty: boolean; // is it derived from job info
    additionalProperty: boolean; // is it derived outside of job info
    tableField: boolean; // shown in table ui
    setting: boolean; // should appear as a setting
    disabled: boolean; // should setting be able to be changed
    sourceProperty: string | null; // if jobProperty, which base field does the value get derived from
    transformProperty: { (object: object): string } | null; // if the base field need to be computed, use this fn
    augmentedProperty: string | null; // if derived from aug info, which base field does the value get derived from
    className?: string; // pass in a classname to the field in the table view
    headerClassName?: string; // pass in a classname to the field header in the table view
}

export const Settings: Record<string, DataProperty> = {
    position: {
        field: 'position',
        title: 'Position',
        width: '50px',
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: false,
        additionalProperty: true,
        tableField: true,
        setting: true,
        disabled: true,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: null,
    },
    adRank: {
        field: 'adRank',
        title: 'AdRank',
        width: '70px',
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'decisionIndex',
    },
    remainder: {
        field: 'remainder',
        title: 'Remainder?',
        width: '80px',
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'remainder',
    },
    relevanceScore: {
        field: 'relevanceScore',
        title: 'Relevance',
        width: '70px',
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'relevanceScore',
    },
    ecpm: {
        field: 'ecpm',
        title: 'eCPM',
        width: '80px',
        sensitive: false,
        locked: true,
        reorderable: true,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true, // temp
        setting: true, // temp
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'ecpm',
    },
    price: {
        field: 'price',
        title: 'Clearing price',
        width: '90px',
        sensitive: false,
        locked: true,
        reorderable: true,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'price',
    },
    campaignId: {
        field: 'campaignId',
        title: 'Campaign ID',
        width: '90px',
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'campaignId',
    },
    adProvider: {
        field: 'adProvider',
        title: 'Ad Provider',
        width: '120px',
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobAd',
        transformProperty: (object: { provider?: string }) => {
            return object?.provider || '';
        },
        augmentedProperty: null,
    },
    searchEngine: {
        field: 'searchEngine',
        title: 'Search Engine',
        width: '120px',
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'searchEngine',
        transformProperty: null,
        augmentedProperty: null,
    },
    company: {
        field: 'company',
        title: 'Company',
        width: '100px',
        sensitive: false,
        locked: true,
        reorderable: false,
        orderIndex: 0,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty: (object: {
            hiringOrganization?: { name: string };
        }) => {
            return object?.hiringOrganization?.name || '';
        },
        className: 'gridBorder',
        headerClassName: 'gridBorder',
        augmentedProperty: null,
    },
    title: {
        field: 'title',
        title: 'Title',
        width: '150px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty: (object: { title?: string }) => {
            return object?.title || '';
        },
        augmentedProperty: null,
    },
    description: {
        field: 'description',
        title: 'Description',
        width: '200px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty: (object: { description?: string }) => {
            return object?.description || '';
        },
        augmentedProperty: null,
    },
    location: {
        field: 'location',
        title: 'Location',
        width: '120px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty: (object: { jobLocation?: string }) => {
            return object.jobLocation || '';
        },
        augmentedProperty: 'location',
    },
    formattedDate: {
        field: 'formattedDate',
        title: 'Date',
        width: '70px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'formattedDate',
        transformProperty: (object?: { something?: string }) => {
            return object?.something || ''; //formatDate(object);
        },
        augmentedProperty: null,
    },
    dateRecency: {
        field: 'dateRecency',
        title: 'Recency',
        width: '80px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'dateRecency',
        transformProperty: null,
        augmentedProperty: null,
    },
    nowId: {
        field: 'nowId',
        title: 'nowId',
        width: '80px',
        sensitive: false,
        locked: false,
        reorderable: true,
        // orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'externalIdentifiers',
        transformProperty: (object: { something?: string }) => {
            return object?.something || '';
        },
        augmentedProperty: null,
    },
    jobId: {
        field: 'jobId',
        title: 'jobId',
        width: '80px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobId',
        transformProperty: null,
        augmentedProperty: null,
    },
    template: {
        field: 'template',
        title: 'templateId',
        width: '80px',
        sensitive: false,
        locked: false,
        reorderable: true,
        // orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'now',
        transformProperty: (object: { templateId?: string }) => {
            return '' + (object?.templateId || '');
        },
        augmentedProperty: null,
    },
    xCode: {
        field: 'xCode',
        title: 'xCode',
        width: '80px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'enrichments',
        transformProperty: (object: { companyKb?: { code: string } }) => {
            return object?.companyKb?.code || '';
        },
        augmentedProperty: null,
    },
    applyType: {
        field: 'applyType',
        title: 'Apply type',
        width: '70px',
        sensitive: false,
        locked: false,
        reorderable: true,
        // orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'apply',
        transformProperty: (object: { applyType?: string }) => {
            return object?.applyType?.toLowerCase() || '';
        },
        augmentedProperty: null,
    },
    mesco: {
        field: 'mesco',
        title: 'MescoId',
        width: '100px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'enrichments',
        transformProperty: (object: {
            mescos?: { name?: string; id: string }[];
        }) => {
            return (
                object?.mescos
                    ?.map((mesco) => mesco.name || mesco.id || '')
                    .join(', ') || ''
            );
        },
        augmentedProperty: null,
    },
    provider: {
        field: 'provider',
        title: 'Provider',
        width: '70px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'provider',
        transformProperty: (object: { name?: string }) => {
            return object?.name || '';
        },
        augmentedProperty: null,
    },
    providerCode: {
        field: 'providerCode',
        title: 'Provider Code',
        width: '80px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'provider',
        transformProperty: (object: { code?: string }) => {
            return object?.code || '';
        },
        augmentedProperty: null,
    },
    providerJobId: {
        field: 'providerJobId',
        title: 'Provider Job id',
        width: '80px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'externalIdentifiers',
        transformProperty: null,
        augmentedProperty: null,
    },
    ingestionMethod: {
        field: 'ingestionMethod',
        title: 'Ingestion',
        width: '70px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'ingestionMethod',
        transformProperty: null,
        augmentedProperty: null,
    },
    jobType: {
        field: 'jobType',
        title: 'Job type',
        width: '80px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobType',
        transformProperty: null,
        augmentedProperty: null,
    },
    pricingType: {
        field: 'pricingType',
        title: 'Pricing type',
        width: '50px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'now',
        transformProperty: (object: { jobAdPricingTypeId?: string }) => {
            return object.jobAdPricingTypeId || '';
        },
        augmentedProperty: null,
    },
    // todo
    seoJobId: {
        field: 'seoJobId',
        title: 'seoJobId',
        width: '60px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'seoJobId',
        transformProperty: null,
        augmentedProperty: null,
    },
    refCode: {
        field: 'refCode',
        title: 'refCode',
        width: '60px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty: (object: { identifier?: { value?: string } }) => {
            return object?.identifier?.value || '';
        },
        augmentedProperty: null,
    },
    validThrough: {
        field: 'validThrough',
        title: 'validThrough',
        width: '80px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty: (object: { validThrough?: string }) => {
            return formatDate(object?.validThrough || '');
        },
        augmentedProperty: null,
    },
    remote: {
        field: 'remote',
        title: 'Remote?',
        width: '100px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: true,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'enrichments',
        transformProperty: (object: { jobLocationType?: string }) => {
            return object?.jobLocationType || '';
        },
        augmentedProperty: null,
    },
    url: {
        field: 'url',
        title: 'url',
        width: '100px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: true,
        setting: true,
        disabled: false,
        sourceProperty: 'jobPosting',
        transformProperty: (object: { url?: string }) => {
            return object?.url || '';
        },
        augmentedProperty: null,
    },
    selected: {
        field: 'selected',
        title: '',
        width: '',
        sensitive: false,
        locked: true,
        reorderable: false,
        //orderIndex: 0,
        visible: false,
        jobProperty: false,
        additionalProperty: true,
        tableField: false,
        setting: false,
        disabled: true,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: null,
    },
    data: {
        field: 'data',
        title: '',
        width: '',
        sensitive: false,
        locked: true,
        reorderable: false,
        //orderIndex: 0,
        visible: false,
        jobProperty: false,
        additionalProperty: true,
        tableField: false,
        setting: false,
        disabled: true,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: null,
    },
    kevelData: {
        field: 'kevelData',
        title: '',
        width: '',
        sensitive: false,
        locked: true,
        reorderable: false,
        //orderIndex: 0,
        visible: false,
        jobProperty: false,
        additionalProperty: true,
        tableField: false,
        setting: false,
        disabled: true,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: null,
    },
    decisionId: {
        field: 'decisionId',
        title: 'Decision ID',
        width: '140px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: false,
        setting: false,
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'decisionId',
    },
    auctionBids: {
        field: 'auctionBids',
        title: 'Auction bids',
        width: '140px',
        sensitive: false,
        locked: false,
        reorderable: true,
        //orderIndex: 1,
        visible: false,
        jobProperty: true,
        additionalProperty: false,
        tableField: false,
        setting: false,
        disabled: false,
        sourceProperty: null,
        transformProperty: null,
        augmentedProperty: 'auctionBids',
    },
};

// returns all fields that can be displayed in the table
export const getNamesOfFields: () => string[] = (): string[] => {
    return Object.values(Settings)
        .filter((field: DataProperty) => field.tableField)
        .map((field: DataProperty) => field.field);
};

const fields = getNamesOfFields() as const;
export type Field = (typeof fields)[number]; // i.e. 'position' | 'adRank' ...
export type UserSettings = Record<Field, DataProperty>;

export const defaultUserSetting = (): Record<Field, DataProperty> => {
    const settings: Record<Field, DataProperty> = {};
    for (const key in Settings) {
        if (Settings[key].tableField) {
            settings[key] = Settings[key];
        }
    }
    return settings;
};

// all fields that are used in the ui (including expanded details, export etc)
export const getNamesOfAllProperties = () => {
    return Object.keys(Settings);
};

// todo - are these needed?
/*
// return all properties that are derived from job item (incl from impression url)
export const getNamesOfJobProperties = () => {
    return Object.values(Settings)
        .filter((field: DataProperty) => field.jobProperty)
        .map((field: DataProperty) => field.field);
};

// should be same now as getNamesOfJobFields, but could change in future?
export const getNamesOfDataSettings = () => {
    return Object.values(Settings)
        .filter((field: DataProperty) => field.setting)
        .map((field: DataProperty) => field.field);
};

export const getAllProperties = () => {
    let o = {};
    for (const key in Settings) {
        // @ts-ignore
        o[key] = true
    }
    return o;
};

 */
