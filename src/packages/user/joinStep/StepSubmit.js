import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {all} from "axios";

function StepName({setStep, data}) {



    return (
        <>
            <div className={"px-[30px]"}>


                {/*<p>아래 정보를 확인하세요</p>*/}
                {/*<div>*/}
                {/*    <span>이름 : </span>*/}
                {/*    <span>{data.name}</span>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <span>아이디 : </span>*/}
                {/*    <span>{data.username}</span>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <span>성별 : </span>*/}
                {/*    <span>{data.gender==='MALE' ? '남':'여'}</span>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <span>비밀번호 : </span>*/}
                {/*    <span>{data.password}</span>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <span>생년월일 : </span>*/}
                {/*    <span>{data.birth}</span>*/}
                {/*</div>*/}
            </div>

            <div>

            </div>
        </>
    );
}

export default StepName;