const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    // Regular expression to check formal correctness of base64 encoded strings
    // @ts-expect-error todo
    b64re =
        /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

const atobPollyfill = function (string: string) {
    // atob can work with strings with whitespaces, even inside the encoded part,
    // but only \t, \n, \f, \r and ' ', which can be stripped.
    string = String(string).replace(/[\t\n\f\r ]+/g, '');

    if (!b64re.test(string))
        throw new TypeError(
            "Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."
        );

    // Adding the padding if missing, for semplicity
    string += '=='.slice(2 - (string.length & 3));
    let bitmap,
        result = '',
        r1,
        r2,
        i = 0;
    for (; i < string.length; ) {
        bitmap =
            (b64.indexOf(string.charAt(i++)) << 18) |
            (b64.indexOf(string.charAt(i++)) << 12) |
            ((r1 = b64.indexOf(string.charAt(i++))) << 6) |
            (r2 = b64.indexOf(string.charAt(i++)));

        result +=
            r1 === 64
                ? String.fromCharCode((bitmap >> 16) & 255)
                : r2 === 64
                  ? String.fromCharCode(
                        (bitmap >> 16) & 255,
                        (bitmap >> 8) & 255
                    )
                  : String.fromCharCode(
                        (bitmap >> 16) & 255,
                        (bitmap >> 8) & 255,
                        bitmap & 255
                    );
    }
    return result;
};

export type KevelData = {
    adRank?: string;
    auctionBids?: string;
    campaignId?: string;
    data?: object;
    decisionId?: string;
    decisionIndex?: string;
    ecpm?: string;
    price?: string;
    relevanceScore?: string;
    remainder?: string;
    error?: string;
};

export const getDataFromUrl = (url: string): KevelData => {
    if (!url) {
        return { error: 'no url' };
    }
    const match = url.match(
        /(?:http(?:s)?):\/\/(?:www\.)?(?:prod|preprod|dev)?.monsterview.com\/i.gif\?e=([-a-zA-Z0-9]*)&s=([\s\S]*)/
    );
    if (match && match[1]) {
        try {
            const d = atobPollyfill(match[1]);
            const u = JSON.parse(d);
            const { ba, di, dj, pc, ec, rr, rs, cm } = u;

            return {
                decisionId: '' + di,
                decisionIndex: '' + dj,
                adRank: '' + dj, // same
                price: '' + pc,
                ecpm: '' + ec,
                remainder: rr ? 'Y' : '',
                campaignId: '' + cm,
                relevanceScore: '' + rs,
                auctionBids: '' + ba,
                data: u,
            };
        } catch {
            console.log('problem with impression url', url);
            return { error: 'cannot decode url' };
        }
    } else return { error: 'unknown' };
};

type PostalAddress = {
    postalAddress?: {
        '@context'?: string;
        '@type'?: string;
        address?: {
            '@type'?: string;
            addressLocality?: string;
            addressRegion?: string;
            addressCountry?: string;
            postalCode?: string;
        };
        geo?: {
            '@type': string;
            latitude?: string;
            longitude?: string;
        };
    };
    locationId?: string;
    countryCode?: string;
};

// todo - geocode too?
export const formatLocation = (locations: PostalAddress[]): string => {
    if (!locations || locations.length === 0) {
        return '';
    }
    let loc = '';
    locations.forEach((address: PostalAddress) => {
        const add = address?.postalAddress?.address;
        if (add) {
            const thisLoc = [
                add.addressLocality,
                add.addressRegion,
                add.postalCode,
                add.addressCountry,
            ]
                .filter(Boolean)
                .join(', ');
            if (thisLoc) {
                if (loc) {
                    loc += '\n';
                }
                loc += thisLoc + '.';
            }
        }
    });
    return loc;
};

// todo
export const formatDate = (date: string) => {
    if (!date || date === '') {
        return '';
    }
    const d = date.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!d || !d[0]) {
        return '';
    }
    return d[3] + ' ' + d[2] + ' ' + d[1];
};

type Identifier = {
    identifierName?: string;
    identifierValue?: string;
};

export const formatNowId = (identifiers: Identifier[] | undefined): string => {
    if (!identifiers || identifiers.length === 0) {
        return '';
    }
    return (
        identifiers
            .filter(
                (identity: Identifier) =>
                    identity?.identifierName === 'POSITION_AD_ID' ||
                    identity?.identifierName === 'NOW_POSTING_ID'
            )
            .map((identity: Identifier) => identity?.identifierValue)
            .join(', ') || ''
    );
};

export const formatProviderJobId = (
    identifiers: Identifier[] | undefined
): string => {
    if (!identifiers || identifiers.length === 0) {
        return '';
    }
    return (
        identifiers
            .filter(
                (identity: Identifier) =>
                    identity?.identifierName === 'PROVIDER_JOB_ID'
            )
            .map((identity: Identifier) => identity?.identifierValue)
            .join(', ') || ''
    );
};

// todo
export const formatMescos = (ids: { id: string }[] | undefined): string => {
    if (!ids || ids.length === 0) {
        return '';
    }
    return (
        ids.map((item: { id: string }): string => item.id || '').join(', ') ||
        ''
    );
};

// todo
// providerJobId: item.provider?.name || 'y',
