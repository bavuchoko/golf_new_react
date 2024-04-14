import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import ToggleSwitch from "../../../components/toggle/ToggleSwitch";

function StepPlayers({setStep, data, fnc}) {

    const [playerCnt, setPlayerCnt] =useState(3);
    const navigate = useNavigate();
    return (
        <div className={"px-[10px]"}>
            <div className="px-[20px] w-full line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={()=>navigate(-1)}>뒤로</p>
                    <div className={"ml-auto w-[36px]"}>
                        <span className={" text-[#354db0]"} onClick={() => {
                            setStep('경기장')
                        }}>다음</span>
                    </div>
                </div>
            </div>


            <div className={'mt-[3rem] player-name-container w-full' }>
                <div className={`each-player`}>
                    <input type={`text`} className={``} readOnly={true} value={'박종수'}/>
                </div>
                {Array.from({length: playerCnt}).map((_, index) =>(
                    <div className={`each-player`}>
                        <input type={`text`} className={``} placeholder={ `${index+2} 번`}/>
                    </div>
                ))}


            </div>
        </div>
    );
}

export default StepPlayers;