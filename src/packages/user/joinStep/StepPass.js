import React, {useState} from 'react';
import {Link} from "react-router-dom";

function StepName({setStep, data, fnc, target}) {

    const [passConfirm, setPassConfirm]=useState("");

    const onchangeInputHandler = (value) =>{
        fnc((prev)=>({
            ...prev,
            [target]:value
        }));
    }

    const comparePass =(value)=>{
        setPassConfirm(value)
    }

    return (
        <>
            <div className="w-full  px-[30px] line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={()=>setStep("성별")}>뒤로</p>
                    <div className={"ml-auto w-[64px]"}>
                        <span className={"mr-2"}>5/5</span>
                        <span className={"ml-auto text-[#354db0]"} onClick={()=>setStep("완료")}>제출하기</span>
                    </div>
                </div>
            </div>
            <div className={"px-[30px]"}>
                <div className={"text-center mt-[3rem]"}>
                    <p className={"keyFix slide-left text-[34px] mb-1"}>비밀번호를 설정합니다.</p>

                    <input value={passConfirm}
                           onChange={(e)=>onchangeInputHandler(e.target.value)}
                           type={"text"}
                           placeholder={"비밀번호 "}
                           className={"border-b indent-3 w-[90%] h-[55px] mt-[3rem] no-outline"}
                           autoFocus={true}/>

                    <input value={data[target] ?data[target] : ""}
                           onChange={(e)=>comparePass(e.target.value)}
                           type={"text"}
                           placeholder={"비밀번호 확인"}
                           className={"border-b indent-3 w-[90%] h-[55px] mt-[3rem] no-outline"}
                           autoFocus={true}/>
                </div>
            </div>
        </>
    );
}

export default StepName;