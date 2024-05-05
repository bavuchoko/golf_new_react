import React from 'react';
import {EachField, EachFieldFlag, EachFiledHistoryMode} from "../../style/style";
import {useSelector} from "react-redux";

function EachFiledComponent({data, modify, list, history, clicked, setClicked }) {
    const user = useSelector((state) => state.user.user);
    return (
        <EachField selected={clicked ===data.id ? true : undefined} onClick={()=>{
            if(clicked==data.id) setClicked(null)
            else setClicked(data.id)
        }}>
            <EachFieldFlag>
                {list ?

                    clicked == data.id ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                         viewBox="0 0 512 512">
                        <path fill="#3AB37C"
                              d="M424.3,180c-1-1.2-1.5-2.8-1.5-4.3c-14.8-26.1-15.7-58-30.5-84.1c-41.7,23.4-70.2,65.1-97.4,103.1c-16.4,22.9-31.1,46.4-44.6,71.1c-13.6,24.8-26.8,49.9-42,73.8c-2.2,3.4-7.9,5-10.3,0.7c-7.2-13.3-15.3-26.2-24.6-38.2c-8-10.3-17.1-19.5-25.3-29.6c-12.7-15.7-26.3-34.5-43.9-45.4c-6.4,21-13.9,41.8-17.2,63.6c24.6,15.9,43.4,38.9,61.5,61.6c21.2,26.6,43.1,52,66.9,76.3c15.4-20.1,26-43.5,38.8-65.3c15.1-25.7,32.7-49.4,51.4-72.6c18.7-23.2,40.3-43.7,62-63.9c10.2-9.5,22.2-17.3,33.1-26c8.2-6.6,16.2-13.4,23.7-20.7C424.4,180.2,424.4,180.1,424.3,180z"></path>
                        <path
                            d="M436.2,170.3h-2.8c-16.3-27.7-16.2-62.6-34-89.9c-1.9-3-5.4-3.1-8.3-1.6c-45.6,23.1-76.2,67.7-105.2,108.1c-16.6,23.2-31.6,47-45.4,72c-12.3,22.3-24.1,44.8-37.4,66.6c-6-10.4-12.6-20.4-19.9-29.9c-8.2-10.8-17.8-20.3-26.3-30.8c-15.2-18.7-31.4-40.9-53.7-51.5c-3.7-1.8-7.4,0.5-8.5,4.2c-6.8,23.7-15.8,47-19.5,71.4c0,0.1,0,0.2,0,0.4c-2,2.7-2.2,7.1,1.6,9.4c26.5,15.6,46,40.8,64.9,64.6c22,27.7,45.2,54.1,70.2,79.1c2.3,2.3,6.4,1.8,8.4-0.5c17.2-20.6,28.7-45,41.8-68.2c14.7-25.9,32-50.3,51.1-73.2c19.2-22.9,40-43.7,61.9-64c10.4-9.7,22.6-17.7,33.8-26.6c9-7.2,17.7-14.7,25.9-22.8c2.3-0.5,4.2-2.1,4.6-4.7c0.6-0.6,1.2-1.3,1.8-1.9C445,176.1,441.2,170.3,436.2,170.3z M400.7,201c-10.9,8.7-22.8,16.5-33.1,26c-21.8,20.2-43.4,40.7-62,63.9c-18.7,23.2-36.3,46.8-51.4,72.6c-12.8,21.8-23.4,45.2-38.8,65.3c-23.8-24.2-45.8-49.7-66.9-76.3c-18.1-22.7-37-45.8-61.5-61.6c3.3-21.8,10.8-42.6,17.2-63.6c17.7,10.9,31.2,29.7,43.9,45.4c8.2,10.1,17.3,19.3,25.3,29.6c9.3,12,17.4,24.9,24.6,38.2c2.4,4.4,8.1,2.7,10.3-0.7c15.3-23.9,28.4-49,42-73.8c13.5-24.7,28.2-48.2,44.6-71.1c27.2-38,55.8-79.8,97.4-103.1c14.8,26.1,15.7,58,30.5,84.1c0,1.5,0.5,3.1,1.5,4.3c0,0.1,0.1,0.2,0.1,0.2C416.9,187.6,408.9,194.4,400.7,201z"></path>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"/>
                    </svg>
                    :
                    clicked == data.id ?
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd"
                    d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z"
                    clipRule="evenodd"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"/>
                    </svg>

                }

            </EachFieldFlag>
            <div className={``}>
                <p className={`text-[13px] shrink-word`}>{data.name ? data.name : '경기장 명'}</p>
                <p className={`font-bold text-[14px] shrink-word`}>{data.address ? data.address : '경기장 주소'}</p>
                <p className={`text-[13px] shrink-word`}>{data.addressDetail ? data.addressDetail : '상세주소'}</p>
            </div>

            {modify &&
                <div className={`relative ml-auto overflow-hidden h-full py-[10px] flex`}
                     style={{width: clicked === data.id ? '81px' : '0px', transition: '0.35s ease'}}>
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
