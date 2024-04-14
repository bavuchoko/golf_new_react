import React from 'react';
import {useNavigate} from "react-router-dom";

function StepPlayers({setStep, data, fnc}) {
    const navigate = useNavigate();
    return (
        <div className={"px-[30px]"}>
            <div className="w-full line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={()=>navigate(-1)}>뒤로</p>
                    <div className={"ml-auto w-[36px]"}>
                        <span className={" text-[#354db0]"} onClick={() => {
                            setStep('경기장')
                        }}>다음</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default StepPlayers;