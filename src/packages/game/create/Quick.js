import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import NumberSelector from "../../../components/selectbox/NumberSelector";
import ToggleSwitch from "../../../components/toggle/ToggleSwitch";
import {quickStart} from "../../../api/game/GameService";
import toast from "react-hot-toast";

function Quick() {
    const [number, setNumber] =useState(1)
    const [direct, setDirect] =useState(false)
    const navigate = useNavigate();

    const names = ["1번", "2번", "3번"];

    const quickStartHandler = async ()=>{

        try {
            const response = await quickStart(
                {
                    status : 'OPEN',
                    names : names.slice(0,number-1)
                }
            );
            if (response.status === 200) {
                toast.success('등록되었습니다.')
                navigate(`/game/${response.data.id}`)
            } else if (response.status === 202) {

            }
        } catch (error){
            toast.error("에러가 발생했습니다.")
        }finally {
        }
    }


    return (
        <div className={`right-slider`}>
            <div className="w-full line-h-40 py-[5px] line-h-50 h-[55px] px-[30px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <Link to={"/login"}
                          onClick={()=>navigate(-1)}
                    >뒤로</Link>
                    <div className={"ml-auto w-[72px]"}>
                        <span className={" text-[#354db0]"}
                              onClick={()=>quickStartHandler()}
                        >시작하기</span>
                    </div>

                </div>
            </div>

            <div className={"px-[30px] pt-10 mb-4 text-[gray]"}>
                {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"*/}
                {/*     stroke="currentColor" className={`w-5 h-5 inline-block mr-1 `}>*/}
                {/*    <path strokeLinecap="round" strokeLinejoin="round"*/}
                {/*          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>*/}
                {/*</svg>*/}
                {/*<span className={`align-middle text-[14px] `}>본인 포함 동반자 수를 선택하면 </span><p className={` text-[14px] `}> 나머지는 자동 입력되어 빠르게 시작할 수 있습니다.</p>*/}
            </div>


            <div className={'mt-[2rem] fl line-h-30 mb-5' }>
               <div className={`quick-top flex`}>
                   <div className={`quick-left`}>
                       {/*<span className={`inline-block mr-3 text-[16px]`}>바로시작</span>*/}
                   </div>

                   {/* <div className={`quick-right w-[90px]`}>*/}
                   {/*    <ToggleSwitch on={direct} setOn={setDirect} />*/}
                   {/*</div>*/}
               </div>
            </div>

            <div >
                <p className={"slide-left text-[34px]"}>모두 몇 명 인가요?</p>
                <div className={`w-[150px] m-auto pt-16`}>
                    <NumberSelector theme={'light'} limit={{upper:4, under:1}} number={number} setNumber={setNumber}/>
                </div>
            </div>

            <p className={`text-[#354db0] fixed bottom-[100px] left-50-160 w-[160px] text-center text-[22px] scape-2`}
               onClick={()=>quickStartHandler()}
            >시작하기</p>
        </div>
    );
}

export default Quick;
