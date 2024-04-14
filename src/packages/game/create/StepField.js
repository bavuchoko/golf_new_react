import React from 'react';
import {useNavigate} from "react-router-dom";

function StepField({setStep, data, fnc}) {
    const startGameHandler =()=>{

    }

    return (
        <div className={"px-[30px]"}>
            <div className="w-full line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={() => {
                        setStep('이름')
                    }}>뒤로</p>
                    <div className={"ml-auto w-[72px]"}>
                        <span className={" text-[#354db0]"} onClick={startGameHandler}>시작하기</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default StepField;