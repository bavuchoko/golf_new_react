import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import ToggleSwitch from "../../../components/toggle/ToggleSwitch";

function StepPlayers({setStep, data, fnc, user}) {
    const [names, setNames] =useState([]);
    const [tempName, setTempName] =useState();
    const [idx, setIdx] =useState(0);
    const navigate = useNavigate();
    console.log(idx)
    console.log(names)
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
                <input type={``} value={tempName} onChange={
                    (e)=>setTempName(e.target.value)} className={"border-bottom-black indent-3 w-full h-[55px] no-outline "} placeholder={'이름을 입력하세요'} autoFocus={true}/>
                <button  className={"mt-5 nextBtn" }  onClick={()=>{
                    if(idx < 2) setIdx(()=>idx+1)
                    if(names.length<3){
                    const newNames = [...names];
                    newNames[idx] =tempName;
                    setNames([...names, tempName])
                    }
                    setTempName('')

                }}>동반자 추가</button>
            </div>

            <div>
                <div className={`each-player flex h-[30px] mt-[20px] mb-[5px]` } >
                    <svg width="800px" height="800px" viewBox="0 0 1024 1024" className="mr-[15px]  h-[24px] w-[24px] mt-[3px]" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z m0 85.333333c66.133333 0 128 23.466667 179.2 59.733334L273.066667 691.2C236.8 640 213.333333 578.133333 213.333333 512c0-164.266667 134.4-298.666667 298.666667-298.666667z m0 597.333334c-66.133333 0-128-23.466667-179.2-59.733334l418.133333-418.133333C787.2 384 810.666667 445.866667 810.666667 512c0 164.266667-134.4 298.666667-298.666667 298.666667z"
                            fill="#D50000"/>
                    </svg>
                    <span className={``}>1 번</span>
                    <p className={``} placeholder={ ``}>{user.name}</p>
                </div>
            {names.map((_, index) =>(
                <div className={`each-player flex h-[30px] mb-[5px]`} key={index}>
                    <svg width="800px" height="800px" viewBox="0 0 1024 1024" className="mr-[15px]  h-[24px] w-[24px] mt-[3px]" version="1.1"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128z m0 85.333333c66.133333 0 128 23.466667 179.2 59.733334L273.066667 691.2C236.8 640 213.333333 578.133333 213.333333 512c0-164.266667 134.4-298.666667 298.666667-298.666667z m0 597.333334c-66.133333 0-128-23.466667-179.2-59.733334l418.133333-418.133333C787.2 384 810.666667 445.866667 810.666667 512c0 164.266667-134.4 298.666667-298.666667 298.666667z"
                            fill="#D50000"/>
                    </svg>
                    <span className={``}>{index+2}번</span>
                    <p className={``} placeholder={ ``}>{names[index]}</p>
                </div>
            ))}
            </div>




        </div>
    );
}

export default StepPlayers;