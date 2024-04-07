import React from 'react';
import Close from '../../resources/icons/close.png'
import {useNavigate} from "react-router-dom";
function Quick(props) {

    const navigate = useNavigate();

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
        </div>
    );
}

export default Quick;
