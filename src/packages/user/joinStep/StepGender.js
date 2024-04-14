import React, {useEffect, useState} from 'react';

function StepGender({setStep, data, fnc, target}) {

    useEffect(()=>{
        fnc((prev)=>({
            ...prev,
            [target]:'MALE'
        }));
    },[])

    const genderHandler = (e) => {
        fnc((prev)=>({
            ...prev,
            [target]:e.target.value
        }));
    };

    return (
        <>
            <div className="w-full  px-[30px] line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={()=>setStep("생일")}>뒤로</p>
                    <div className={"ml-auto w-[71px]"}>
                        <span className={"mr-2"}>4/5</span>
                        <span className={"ml-auto text-[#354db0]"} onClick={()=>setStep("비밀번호")}>다음</span>
                    </div>

                </div>
            </div>
            <div className={"px-[30px]"}>
                <div className={"text-center mt-[3rem]"}>
                    <p className={"keyFix slide-right text-[34px] mb-1"}>성별을 선택하세요</p>

                        <ul className="grid w-full gap-6 grid-cols-2 pt-[7rem]">
                            <li>
                                <input type="radio" id="hosting-small" name="hosting"
                                       value={"MALE"}
                                       onChange={genderHandler}
                                       checked={data[target]? data[target]==='MALE':true}
                                       className="hidden peer" required/>
                                <label htmlFor="hosting-small"
                                       className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Male</div>
                                        <div className="w-full">남성</div>
                                    </div>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={"w-8 h-8 blue"}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M15 3C15 2.44772 15.4477 2 16 2H20C21.1046 2 22 2.89543 22 4V8C22 8.55229 21.5523 9 21 9C20.4477 9 20 8.55228 20 8V5.41288L15.4671 9.94579C15.4171 9.99582 15.363 10.0394 15.3061 10.0767C16.3674 11.4342 17 13.1432 17 15C17 19.4183 13.4183 23 9 23C4.58172 23 1 19.4183 1 15C1 10.5817 4.58172 7 9 7C10.8559 7 12.5642 7.63197 13.9214 8.69246C13.9587 8.63539 14.0024 8.58128 14.0525 8.53118L18.5836 4H16C15.4477 4 15 3.55228 15 3ZM9 20.9963C5.68831 20.9963 3.00365 18.3117 3.00365 15C3.00365 11.6883 5.68831 9.00365 9 9.00365C12.3117 9.00365 14.9963 11.6883 14.9963 15C14.9963 18.3117 12.3117 20.9963 9 20.9963Z" fill={`${(data[target] && data[target]==='MALE')? ' #3a4acb':'#6b7280' }`}></path> </g></svg>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="hosting-big"
                                       value={"FEMALE"}
                                       onChange={genderHandler}
                                       checked={data[target]? data[target]==='FEMALE':false}
                                       className="hidden peer"/>
                                    <label htmlFor="hosting-big"
                                           className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-red-500 peer-checked:border-red-600 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">Female</div>
                                            <div className="w-full">여성 </div>
                                        </div>
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={"w-8 h-8"}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z" fill={`${(data[target] && data[target]==='FEMALE')? ' #cb3a3a':'#6b7280' }`}></path> </g></svg>
                                    </label>
                            </li>
                        </ul>
                </div>
            </div>
        </>
    );
}

export default StepGender;