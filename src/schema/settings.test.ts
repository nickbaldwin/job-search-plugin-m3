import { expect, test } from 'vitest';
import {
    getNamesOfAllProperties,
    getNamesOfFields,
    defaultUserSetting,
} from './settings.ts';

test('getNamesOfFields - all fields that can be displayed in table', () => {
    const fields = getNamesOfFields();
    expect(fields).toEqual(
        expect.arrayContaining([
            'position',
            'adRank',
            'remainder',
            'relevanceScore',
            'ecpm',
            'price',
            'campaignId',
            'adProvider',
            'searchEngine',
            'company',
            'title',
            'description',
            'location',
            'formattedDate',
            'dateRecency',
            'nowId',
            'jobId',
            'template',
            'xCode',
            'applyType',
            'mesco',
            'provider',
            'providerCode',
            'providerJobId',
            'ingestionMethod',
            'jobType',
            'pricingType',
            'seoJobId',
            'refCode',
            'validThrough',
            'remote',
            'url',

            // 'selected',
            // 'data',
            // 'kevelData',
            // 'decisionId',
            // 'auctionBids'
        ])
    );
});

test('getNamesOfAllProperties all properties passed into ui', () => {
    const fields = getNamesOfAllProperties();
    expect(fields).toEqual(
        expect.arrayContaining([
            'position',
            'adRank',
            'remainder',
            'relevanceScore',
            'ecpm',
            'price',
            'campaignId',
            'adProvider',
            'searchEngine',
            'company',
            'title',
            'description',
            'location',
            'formattedDate',
            'dateRecency',
            'nowId',
            'jobId',
            'template',
            'xCode',
            'applyType',
            'mesco',
            'provider',
            'providerCode',
            'providerJobId',
            'ingestionMethod',
            'jobType',
            'pricingType',
            'seoJobId',
            'refCode',
            'validThrough',
            'remote',
            'url',

            'selected',
            'data',
            'kevelData',
            'decisionId',
            'auctionBids',
        ])
    );
});

test('getNamesOfAllProperties all properties passed into ui', () => {
    const fields = defaultUserSetting();
    const arr = Object.keys(fields);
    expect(arr).toEqual(
        expect.arrayContaining([
            'position',
            'adRank',
            'remainder',
            'relevanceScore',
            'ecpm',
            'price',
            'campaignId',
            'adProvider',
            'searchEngine',
            'company',
            'title',
            'description',
            'location',
            'formattedDate',
            'dateRecency',
            'nowId',
            'jobId',
            'template',
            'xCode',
            'applyType',
            'mesco',
            'provider',
            'providerCode',
            'providerJobId',
            'ingestionMethod',
            'jobType',
            'pricingType',
            'seoJobId',
            'refCode',
            'validThrough',
            'remote',
            'url',

            // 'selected',
            // 'data',
            // 'kevelData',
            // 'decisionId',
            // 'auctionBids',
        ])
    );
    expect(fields.position).toEqual(
        expect.objectContaining({
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
        })
    );
});
