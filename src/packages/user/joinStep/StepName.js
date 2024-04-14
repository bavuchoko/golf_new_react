import React from 'react';
import {Link} from "react-router-dom";
import {useState} from "react";

function StepName({setStep, data, fnc, target}) {
    const [pass, setPass] =useState(data[target] && data[target].trim().length>1? true:false);

    const onchangeInputHandler = (value) =>{
        fnc((prev)=>({
            ...prev,
            [target]:value
        }));

        if(value && value.trim().length>1){
            setPass(true);
        }else {
            setPass(false);
        }
    }


    return (
        <div className={"px-[30px]"}>
            <div className="w-full line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <Link to={"/login"} onClick={()=>setStep("이름")}>뒤로</Link>
                    <div className={"ml-auto w-[71px]"}>
                        <span className={"mr-2"}>1/5</span>
                            <span className={" text-[#354db0]"} onClick={() => {
                                if(pass)setStep("전화번호")
                                else{
                                    alert("이름을 입력하세요")
                                }
                            }}>다음</span>
                    </div>

                </div>
            </div>
            <div className={"mt-[5rem]"}>
                <p className={"keyFix slide-left text-[34px] mb-1"}>이름을 입력하세요</p>
                <input value={data[target] ?data[target] : ""}
                       onChange={(e)=>onchangeInputHandler(e.target.value)}
                       type={"text"}
                       placeholder={"이름"}
                       className={" border-bottom indent-3 w-[90%] h-[55px] mt-[7rem] no-outline"}
                       autoFocus={true}/>
            </div>
        </div>
    );
}

export default StepName;