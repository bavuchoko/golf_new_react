import React, {useState} from 'react';
import Close from '../../resources/icons/close.png'
import {useNavigate} from "react-router-dom";
import NumberSelector from "../../components/selectbox/NumberSelector";
import Growth from "../../resources/icons/growth.png"
import ToggleSwitch from "../../components/toggle/ToggleSwitch";
import {quickStart} from "../../api/game/GameService";
import toast from "react-hot-toast";

function Quick() {

    const [number, setNumber] =useState(1)
    const navigate = useNavigate();


    const quickStartHandler = async ()=>{
        try {
            const response = await quickStart(number);
            if (response.status === 200) {
                toast.success('등록되었습니다.')
            } else if (response.status === 202) {

            }
        } catch (error){
            toast.error("에러가 발생했습니다.")
        }

    }

    return (
        <div className={`right-slider`}>

            <div className={`w-full  px-[30px] py-[5px] line-h-50 nav-bar h-[45px]`}>
                <div className={`inline-block  line-h-35 w-[100%] flex h-[35px]`}>
                    <span className={"Headland font-bold text-[20px]"}>퀵 스타트</span>
                    <button
                        onClick={()=>navigate(-1)}
                        className={`ml-auto`}><img  src={Close} className={`className="w-7 h-7 "`}/> </button>
                </div>
            </div>

            <div className={'px-[30px] mt-[5rem]'}>
                <div className={`direct-toggle flex`}>
                    <span className={`inline-block mr-3 mt-[5px]`}>바로 시작하기 </span> <ToggleSwitch />
                </div>
                <div className={"pt-20 mb-4 text-[gray]"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className={`w-5 h-5 inline-block mr-1 `}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                    </svg>
                    <span className={`align-middle text-[14px] `}>본인 포함 동반자 수를 선택하면 </span><p className={` text-[14px] `}> 나머지는 자동 입력되어 빠르게 시작할 수 있습니다.</p>
                </div>


                <div >
                    <p className={"slide-left text-[34px] mb-1"}>모두 몇 명 인가요?</p>

                    <div className={`w-[150px] m-auto pt-20`}>
                        <NumberSelector limit={{upper:4, under:1}} number={number} setNumber={setNumber}/>
                    </div>

                    <div className={`create-game-btn`} onClick={()=>quickStartHandler()}>
                        <p>시작하기</p>
                        <img src={Growth} className={'create-game-btn-arrow'}/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Quick;
