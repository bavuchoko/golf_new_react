import React from 'react';

function StepName({setStep, data, fnc, target}) {
    return (
        <>
            <div className="w-full  px-[30px] line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={()=>setStep("생일")}>뒤로</p>
                    <div className={"ml-auto w-[64px]"}>
                        <span className={"mr-2"}>4/5</span>
                        <span className={"ml-auto text-[#354db0]"} onClick={()=>setStep("비밀번호")}>다음</span>
                    </div>

                </div>
            </div>
            <div className={"px-[30px]"}>
                <div className={"text-center mt-[3rem]"}>
                    <p className={"keyFix slide-right text-[34px] mb-1"}>성별을 선택하세요</p>

                </div>
            </div>
        </>
    );
}

export default StepName;