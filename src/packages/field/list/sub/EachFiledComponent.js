import React from 'react';
import {EachField, EachFieldFlag, EachFiledHistoryMode} from "../../style/style";
import {useSelector} from "react-redux";

function EachFiledComponent({data, modify, history, clicked, setClicked }) {
    const user = useSelector((state) => state.auth.user);
    return (
        <EachField onClick={()=>{
            if(clicked==data.id) setClicked(null)
            else setClicked(data.id)
        }}>
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
            </div>

            {modify &&
                <div className={`relative ml-auto overflow-hidden h-full py-[10px] flex`} style={{ width: clicked===data.id ? '81px':'0px', transition: '0.35s ease'}} >
                    <div className={`absolute right-[40px] h-[40px] w-[40px] mr-[1px] ${data.register.id ===user.id ?'bg-[#166aea]':'bg-[#cbcbcb]'} text-[white]`} style={{ width: clicked===data.id ? '40px':'0px', transition: '0.35s ease'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor"  className="w-5 h-5 m-auto mt-[8px] font-light">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"/>
                        </svg>
                    </div>
                    <div className={`absolute right-[0px] h-[40px] w-[40px]  ${data.register.id ===user.id ?'bg-[#ff2121]':'bg-[#cbcbcb]'} text-[white]`} style={{ width: clicked===data.id ? '40px':'0px', transition: '0.35s ease'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-5 h-5 m-auto mt-[8px] font-light">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                        </svg>
                    </div>
                </div>
            }

            {history &&
                <EachFiledHistoryMode>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                    </svg>

                </EachFiledHistoryMode>
            }
        </EachField>
    );
}

export default EachFiledComponent;
