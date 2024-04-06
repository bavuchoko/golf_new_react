import React from 'react';
import {EachField, EachFieldFlag, EachFiledCourses} from "../../style/style";

function EachFiledComponent({data}) {
    return (
        <EachField>
            <EachFieldFlag>

                {1 == 1 ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z"
                              clipRule="evenodd"/>
                    </svg>
                }

            </EachFieldFlag>
            <div className={``}>
                <p className={`text-[13px] shrink-word`}>{data.name? data.name:'경기장 명'}</p>
                <p className={`font-bold text-[14px] shrink-word`}>{data.address? data.address:'경기장 주소'}</p>
                <p className={`text-[13px] shrink-word`}>{data.addressDetail? data.addressDetail:'상세주소'}</p>
                {/*<p>{data.register? data.register.name:'등록자'}</p>*/}
                {/*<p>{data.create_date? data.create_date:'등록일'}</p>*/}
            </div>
            <EachFiledCourses>
                {data.courses?data.courses : '?'}
            </EachFiledCourses>
        </EachField>
    );
}

export default EachFiledComponent;
