import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import ToggleSwitch from "../../../components/toggle/ToggleSwitch";

function StepPlayers({setStep, data, fnc, user}) {
    const [playerCnt, setPlayerCnt] =useState(3);
    const [names, setNames] =useState([]);
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


            <div className={``}></div>
            <div className={`w-full`}>
                <input type={``} className={"border-bottom-black indent-3 w-full h-[55px] no-outline "} placeholder={'이름을 입력하세요'} autoFocus={true}/>
                <button  className={"mt-5 nextBtn" } >동반자 추가</button>
            </div>

            <div>
                <div className={`each-player`} >
                    <label className={`text-[14px]`}>1 번</label>
                    <p className={``} placeholder={ ``}>{user.name}</p>
                </div>
            {Array.from({length: playerCnt}).map((_, index) =>(
                <div className={`each-player`} key={index}>
                    <label className={`text-[14px]`}>{index+2}번</label>
                    <p className={``} placeholder={ ``}>{names[index]}</p>
                </div>
            ))}
            </div>




        </div>
    );
}

export default StepPlayers;