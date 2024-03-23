import React, {useState} from 'react';
import {userJoin} from "../../api/auth/AuthService";
import {useDispatch} from "react-redux";
import {login} from "../../redux/slice/authSlice";
import StepName from "./joinStep/StepName";
import StepBirth from "./joinStep/StepBirth";
import StepGender from "./joinStep/StepGender";
import StepPass from "./joinStep/StepPass";
import StepUserName from "./joinStep/StepUserName";

function Join() {

    const [userData, setUserData] =useState({})
    const [step, setStep] = useState("이름");

    const dispatch = useDispatch();



    async function handleJoin(user) {
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const response = await userJoin(user);
            if(response.status===200){
                localStorage.setItem('accessToken',response.data.accessToken);
                dispatch(login(response.user));
            }
        } catch (error) {
            if(error.message==='Network Error') alert('서버가 응답하지 않습니다. \n관리자에게 문의하세요');
            else{
                alert('가입에 실패하였습니다.');
            }

        }
    }
    return (
        <>
            {step === "이름" && <StepName setStep={setStep} data={userData} fnc={setUserData} target={"name"}/>}
            {step === "전화번호" && <StepUserName setStep={setStep} data={userData} fnc={setUserData} target={"username"}/>}
            {step ==="생일" && <StepBirth  setStep={setStep} data={userData} fnc={setUserData} target={"birth"}/>}
            {step ==="성별" && <StepGender  setStep={setStep} data={userData} fnc={setUserData} target={"gender"}/>}
            {step ==="비밀번호" && <StepPass  setStep={setStep} data={userData} fnc={setUserData} target={"password"}/>}

        </>
    );
}

export default Join;