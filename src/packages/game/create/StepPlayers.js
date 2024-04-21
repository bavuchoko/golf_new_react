import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import ToggleSwitch from "../../../components/toggle/ToggleSwitch";

function StepPlayers({setStep, data, fnc, user}) {
    const [playerCnt, setPlayerCnt] =useState(3);
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


            <p className={"keyFix slide-left-delay-1s text-[34px] mb-1 mt-10"}>이름을 입력하세요</p>

            <div className={`mt-[8rem]`}></div>
            <div className={`w-full`}>

                <input type={``} className={"border-bottom-black indent-3 w-full h-[55px] no-outline"}/>
            </div>

                {/*{Array.from({length: playerCnt}).map((_, index) =>(*/}
                {/*    <div className={`each-player`} key={index}>*/}
                {/*        <label className={`text-[14px]`}>{index+2}번</label>*/}
                {/*        <input type={`text`} className={``} placeholder={ ``}/>*/}
                {/*    </div>*/}
                {/*))}*/}



        </div>
    );
}

export default StepPlayers;