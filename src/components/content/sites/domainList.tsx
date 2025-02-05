import React from 'react';

export const domainList = {
    atDE: {
        domain: "monster.at/",
        preprodDomain: "https://www.monster.at/",
        title: "at",
        icon: (
            <>
                <path fill="#fff" d="M640 480H0V0h640z"></path>
                <path fill="#ed2939" d="M640 480H0V320h640zm0-319.9H0V.1h640z"></path>
            </>
        ),
        label: "Austria (German)"
    },
    beNL: {
        domain: "monster.be/nl/",
        preprodDomain: "",
        title: "be",
        icon: (
            <>
                <path d="M0 0h213.3v480H0z"></path>
                <path fill="#ffd90c" d="M213.3 0h213.4v480H213.3z"></path>
                <path fill="#f31830" d="M426.7 0H640v480H426.7z"></path>
            </>
        ),
        label: "Belgium (Dutch)"
    },
    beEN: {
        domain: "monster.be/en/",
        preprodDomain: "",
        title: "be",
        icon: (
            <>
                <path d="M0 0h213.3v480H0z"></path>
                <path fill="#ffd90c" d="M213.3 0h213.4v480H213.3z"></path>
                <path fill="#f31830" d="M426.7 0H640v480H426.7z"></path>
            </>
        ),
        label: "Belgium (English)"
    },
    beFR: {
        domain: "monster.be/fr/",
        preprodDomain: "",
        title: "be",
        icon: (
            <>
                <path d="M0 0h213.3v480H0z"></path>
                <path fill="#ffd90c" d="M213.3 0h213.4v480H213.3z"></path>
                <path fill="#f31830" d="M426.7 0H640v480H426.7z"></path>
            </>
        ),
        label: "Belgium (French)"
    },
    caEN: {
        domain: "monster.ca/",
        preprodDomain: "",
        title: "ca",
        icon: (
            <>
                <path fill="#fff" d="M81.1 0h362.3v512H81.1z"
                      transform="translate(74.1) scale(.9375)"></path>
                <path fill="#d52b1e"
                      d="M-100 0H81.1v512H-100zm543.4 0h181.1v512h-181zm-308 247.4l-14.2 4.8 65.5 57.5c5 14.7-1.7 19-6 26.8l71-9L250 399l14.8-.4-3.3-71 71.2 8.5c-4.4-9.3-8.3-14.2-4.3-29l65.4-54.5-11.4-4.2c-9.4-7.2 4-34.7 6-52.1 0 0-38.1 13.1-40.6 6.2l-9.8-18.7-34.7 38.2c-3.8.9-5.4-.6-6.3-3.8l16-79.8-25.4 14.3c-2.1 1-4.2.2-5.6-2.3l-24.5-49-25.2 50.9c-1.9 1.8-3.8 2-5.4.8l-24.2-13.6 14.6 79.1c-1.2 3.2-4 4-7.2 2.3l-33.3-37.7c-4.3 7-7.2 18.3-13 20.9-5.7 2.4-25-4.8-37.9-7.6 4.4 15.9 18.2 42.3 9.5 51z"
                      transform="translate(74.1) scale(.9375)"></path>
            </>
        ),
        label: "Canada (English)"
    },
    caFR: {
        domain: "monster.ca/fr/",
        title: "ca",
        icon: (
            <>
                <path fill="#fff" d="M81.1 0h362.3v512H81.1z"
                      transform="translate(74.1) scale(.9375)"></path>
                <path fill="#d52b1e"
                      d="M-100 0H81.1v512H-100zm543.4 0h181.1v512h-181zm-308 247.4l-14.2 4.8 65.5 57.5c5 14.7-1.7 19-6 26.8l71-9L250 399l14.8-.4-3.3-71 71.2 8.5c-4.4-9.3-8.3-14.2-4.3-29l65.4-54.5-11.4-4.2c-9.4-7.2 4-34.7 6-52.1 0 0-38.1 13.1-40.6 6.2l-9.8-18.7-34.7 38.2c-3.8.9-5.4-.6-6.3-3.8l16-79.8-25.4 14.3c-2.1 1-4.2.2-5.6-2.3l-24.5-49-25.2 50.9c-1.9 1.8-3.8 2-5.4.8l-24.2-13.6 14.6 79.1c-1.2 3.2-4 4-7.2 2.3l-33.3-37.7c-4.3 7-7.2 18.3-13 20.9-5.7 2.4-25-4.8-37.9-7.6 4.4 15.9 18.2 42.3 9.5 51z"
                      transform="translate(74.1) scale(.9375)"></path>
            </>
        ),
        label: "Canada (French)"
    },
    frFR: {
        domain: "monster.fr/",
        title: "fr",
        icon: (
            <>
                <path fill="#fff" d="M0 0h640v480H0z"></path>
                <path fill="#00267f" d="M0 0h213.3v480H0z"></path>
                <path fill="#f31830" d="M426.7 0H640v480H426.7z"></path>
            </>
        ),
        label: "France (French)"
    },
    deDE: {
        domain: "monster.de/",
        title: "de",
        icon: (
            <>
                <path fill="#ffce00" d="M0 320h640v160H0z"></path>
                <path d="M0 0h640v160H0z"></path>
                <path fill="#d00" d="M0 160h640v160H0z"></path>
            </>
        ),
        label: "Germany (German)"
    },
    ieEN: {
        domain: "monster.ie/",
        title: "ie",
        icon: (
            <>
                <path fill="#fff" d="M0 0h640v480H0z"></path>
                <path fill="#009A49" d="M0 0h213.3v480H0z"></path>
                <path fill="#FF7900" d="M426.7 0H640v480H426.7z"></path>
            </>
        ),
        label: "Ireland (English)"
    },
    itIT: {
        domain: "monster.it/",
        title: "it",
        icon: (
            <>
                <path fill="#fff" d="M0 0h640v480H0z"></path>
                <path fill="#009246" d="M0 0h213.3v480H0z"></path>
                <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"></path>
            </>
        ),
        label: "Italy (Italian)"
    },
    luEN: {
        domain: "monster.lu/en/",
        title: "lu",
        icon: (
            <>
            <path fill="#00a1de" d="M0 240h640v240H0z"></path>,
            <path fill="#ed2939" d="M0 0h640v240H0z"></path>,
            <path fill="#fff" d="M0 160h640v160H0z"></path>
                </>
                ),
        label: "Luxembourg (English)"
    },
    luFR: {
        domain: "monster.lu/fr/",
        title: "lu",
        icon: (
            <>
                <path fill="#00a1de" d="M0 240h640v240H0z"></path>
                <path fill="#ed2939" d="M0 0h640v240H0z"></path>
                <path fill="#fff" d="M0 160h640v160H0z"></path>
            </>
        ),
        label: "Luxembourg (French)"
    },
    luDE: {
        domain: "monster.lu/de/",
        title: "lu",
        icon: (
            <>
                <path fill="#00a1de" d="M0 240h640v240H0z"></path>
                <path fill="#ed2939" d="M0 0h640v240H0z"></path>
                <path fill="#fff" d="M0 160h640v160H0z"></path>
            </>
        ),
        label: "Luxembourg (German)"
    },
    nlNL: {
        domain: "monsterboard.nl/",
        title: "nl",
        icon: (
            <>
                <path fill="#21468b" d="M0 0h640v480H0z"></path>
                <path fill="#fff" d="M0 0h640v320H0z"></path>
                <path fill="#ae1c28" d="M0 0h640v160H0z"></path>
            </>
        ),
        label: "Netherlands (Dutch)"
    },
    esES: {
        domain: "monster.es/",
        title: "es",
        icon: (
            <>
                <path fill="#c60b1e" d="M0 0h640v480H0z"></path>
                <path fill="#ffc400" d="M0 120h640v240H0z"></path>
            </>
        ),
        label: "Spain (Spanish)"
    },
    seSE: {
        domain: "monster.se/",
        title: "se",
        icon: (
            <>
                <defs>
                    <clipPath id="sweden">
                        <path fill-opacity=".7" d="M-53.4 0h682.6v512H-53.4z"></path>
                    </clipPath>
                </defs>
                <g clip-path="url(#sweden)" transform="translate(50) scale(.9375)">
                    <g fill-rule="evenodd" stroke-width="1pt">
                        <path fill="#006aa7" d="M-121.1.3h256v204.8h-256zm0 306.9h256V512h-256z"></path>
                        <path fill="#fecc00" d="M-121.1 205h256v102.4h-256z"></path>
                        <path fill="#fecc00" d="M133.8 0h102.4v512H133.8z"></path>
                        <path fill="#fecc00" d="M233 205h460.8v102.4H233z"></path>
                        <path fill="#006aa7"
                              d="M236.2 307.2H697V512H236.2zm0-306.9H697v204.8H236.2z"></path>
                    </g>
                </g>
            </>
        ),
        label: "Sweden (Swedish)"
    },
    chFR: {
        domain: "monster.ch/fr/",
        title: "ch",
        icon: (
            <>
                <g fill-rule="evenodd" stroke-width="1pt">
                    <path fill="#d52b1e" d="M0 0h640v480H0z"></path>
                    <g fill="#fff">
                        <path d="M170 195h300v90H170z"></path>
                        <path d="M275 90h90v300h-90z"></path>
                    </g>
                </g>
            </>
        ),
        label: "Switzerland (French)"
    },
    chDE: {
        domain: "monster.ch/de/",
        title: "ch",
        icon: (
            <>
                <g fill-rule="evenodd" stroke-width="1pt">
                    <path fill="#d52b1e" d="M0 0h640v480H0z"></path>
                    <g fill="#fff">
                        <path d="M170 195h300v90H170z"></path>
                        <path d="M275 90h90v300h-90z"></path>
                    </g>
                </g>
            </>
        ),
        label: "Switzerland (German)"
    },
    ukEN: {
        domain: "monster.co.uk/",
        title: "uk",
        icon: (
            <>
                <path fill="#012169" d="M0 0h640v480H0z"></path>
                <path fill="#FFF"
                      d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"></path>
                <path fill="#C8102E"
                      d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"></path>
                <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"></path>
                <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"></path>

            </>
        ),
        label: "United Kingdom (English)"
    },
    usEN: {
        domain: "monster.com/",
        title: "us",
        icon: (
            <>
                <g fill-rule="evenodd">
                    <g stroke-width="1pt">
                        <path fill="#bd3d44"
                              d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z"
                              transform="scale(.9375)"></path>
                        <path fill="#fff"
                              d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z"
                              transform="scale(.9375)"></path>
                    </g>
                    <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"></path>
                    <path fill="#fff"
                          d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 39.4l3.5 10.9h11.5L70.6 57 74 67.9l-9-6.7-9.3 6.7L59 57l-9-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7L124 57l-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5L330 57l3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 66.9L36 78h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7H29zm64.9 0l3.5 11h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zm64.8 0l3.6 11H177l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7h11.5zm64.9 0l3.5 11H242l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 11h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.2-6.7h11.4zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.5zM64.9 94.5l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 122.1L36 133h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 149.7l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zM32.4 177.2l3.6 11h11.4l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 11H177l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 11H242l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 11h11.4l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 204.8l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 232.4l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-11-9.3-6.7H29zm64.9 0l3.5 10.9h11.5L103 250l3.6 10.9-9.3-6.7-9.3 6.7 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 10.9H177l-9 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-11-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-11-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7 3.6-11-9.3-6.7h11.5z"
                          transform="scale(.9375)"></path>
                </g>
            </>
        ),
        label: "United States (English)"
    }
};