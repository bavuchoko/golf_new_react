import React, {useState} from 'react';
import {useHeaderContext} from "../../../layout/context/HeaderContext";
import LoadingModal from "../../../components/modal/LoadingModal";
import {userJoin} from "../../../api/auth/AuthService";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../../redux/slice/authSlice";

function StepPass({setStep, data, fnc, target}) {
    const [passConfirm, setPassConfirm]=useState("");
    const [pass, setPass] =useState(false);
    const [message, setMessage]= useState();
    const [alertMessage, setAlertMessage]= useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {apiLoading, setApiLoading  } = useHeaderContext();

    const onchangeInputHandler = (value) =>{
        fnc((prev)=>({
            ...prev,
            [target]:value
        }));
        if(passConfirm && value !== passConfirm){
            setMessage("비밀번호가 일치하지 않습니다.")
            setPass(false);
        }else if(passConfirm && value === passConfirm){
            setMessage(null)
            setPass(true);
        }
    }

    const comparePass =(value)=>{
        setPassConfirm(value)
        if(value !== data[target]){
            setMessage("비밀번호가 일치하지 않습니다.")
            setPass(false);
        }else{
            setMessage(null)
            setPass(true)
        }
    }

    const handleUserJoin  = async ()=>{
        setApiLoading(true)
        try {
            const response = await userJoin(data);
            if(response.status===200){
                alert("회원가입에 성공하여\n메인페이지로 돌아갑니다.");
                setApiLoading(false);
                localStorage.setItem('accessToken', response.data);
                dispatch(login(true));
                navigate("/")
                return;
            }
            if(response.status===202){
                setApiLoading(false);
                setAlertMessage(response.data)
                return;
            }
        } catch (error) {
            console.log(error)
            setApiLoading(false);
            alert("아이디와 비밀번호를 확인하세요")
        } finally {
            setApiLoading(false);
        }
    };

    return (
        <div className={"px-[30px]"}>
            {apiLoading &&
                <LoadingModal />
            }
            <div className="w-full  line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={()=>setStep("성별")}>뒤로</p>
                    <div className={"ml-auto w-[96px]"}>
                        <span className={"mr-2"}>5/5</span>
                        <span className={" text-[#354db0]"} onClick={() => {
                            if(pass){
                                if(window.confirm("제출하시겠습니까?")){
                                    handleUserJoin()
                                }
                            }
                            else{
                                alert("비밀번호를 확인하세요.")
                            }
                        }}>제출하기</span>
                    </div>
                </div>
            </div>
            <div className={"mt-[3rem]"}>
                <p className={" slide-left text-[34px] mb-1"}>비밀번호를 설정합니다.</p>


                <p className={"keyFix text-[red] text-[13px] pt-[70px]"}>{alertMessage}</p>

                <input value={data[target] ?data[target] : ""}
                       onChange={(e)=>onchangeInputHandler(e.target.value)}
                       type={"password"}
                       placeholder={"비밀번호"}
                       className={"border-b indent-3 w-[90%] h-[55px] mt-[1.5rem] no-outline"}
                       autoFocus={true}
                />
                <input value={passConfirm}
                       onChange={(e)=>comparePass(e.target.value)}
                       type={"password"}
                       placeholder={"비밀번호 확인"}
                       className={"border-b indent-3 w-[90%] h-[55px] mt-[1rem] no-outline"}
                />

                {message &&
                <div className={"mt-1 text-[gray]"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className={`w-5 h-5 inline-block mr-1 text-[red] `}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                    </svg>
                    <span className={`align-middle text-[14px] ${!pass? 'text-[red]':''} `}> {message}</span>
                </div>
                }
            </div>
        </div>
    );
}

export default StepPass;