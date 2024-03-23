import React from 'react';

function StepName({setStep, data, fnc, target}) {

    const onchangeInputHandler = (value) =>{
        fnc((prev)=>({
            ...prev,
            [target]:value
        }));
    }
    return (
        <div className={"px-[30px]"}>
            <div className="w-full line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={()=>setStep("전화번호")}>뒤로</p>
                    <div className={"ml-auto w-[64px]"}>
                        <span className={"mr-2"}>3/5</span>
                        <span className={"ml-auto text-[#354db0]"} onClick={()=>setStep("성별")}>다음</span>
                    </div>
                </div>
            </div>
            <div >
                <div className={" mt-[5rem]"}>
                    <p className={"keyFix slide-left text-[34px] mb-1"}>생일을 입력하세요</p>
                    <input value={data[target] ?data[target] : ""}
                           onChange={(e)=>onchangeInputHandler(e.target.value)}
                           type={"number"}
                           placeholder={"ex) 19700101 "}
                           className={"border-b indent-3 w-[90%] h-[55px] mt-[7rem] no-outline"}
                           autoFocus={true}/>
                </div>
            </div>
        </div>
    );
}

export default StepName;