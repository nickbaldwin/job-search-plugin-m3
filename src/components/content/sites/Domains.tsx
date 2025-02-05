import React from 'react';

import {domainList} from "./domainList";

const prefixUrl = "https://www.";
const preprodUrl = "nxtpreprod.";
const devUrl = "mwwnxtdevus";

const startUrl = "https://www.";
const environments = {
    prod: "",
    dev: "nxtdev.",
    preprod: "nxtpreprod."
}

// todo - extract data and map over it
export const Domains = ({env = "prod"}) => {

    // @ts-ignore
    const prefix =  startUrl + environments[env]
    // const prefix = preprod ? prefixUrl + preprodUrl : prefixUrl;

    return (
            <ul className="">

                {Object.values(domainList).map((item, i)=> {
                    return (
                        <li className="" key={i}>
                            <a href={prefix  + item.domain} className="domain" >
                                <div className="monsterDomain">
                                    <svg width="20" height="100%" viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg"
                                         className="" xmlnsXlink="http://www.w3.org/1999/xlink" aria-label="at" role="img">
                                        <title>{item.title}</title>
                                        {item.icon}
                                    </svg>
                                    <span className='spacer' />
                                    <span>{item.label}</span>
                                </div>
                            </a>
                        </li>
                    )
                })
                }

            </ul>

    );
};