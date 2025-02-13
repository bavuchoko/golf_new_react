import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useLogin} from "../../api/auth/AuthService";
import {useHeaderContext} from "../../layout/context/HeaderContext";
import BrandName from "../../layout/BrandName";

function Login() {
    const location = useLocation();
    const [id, setId] =useState("010");
    const [pass, setPass] =useState("");
    const isNumber = /^-?\d*\.?\d+$/;
    const navigate = useNavigate();
    const idInputHandler=(e)=>{
        if (isNumber.test(e.target.value)) {
            setId(e.target.value)
        }
    }
    const passInputHandler=(e)=>{
        setPass(e.target.value)
    }

    const passwordEnter = (e) => {
        if (e.key === "Enter") {
            handleLogin({
                "username": id,
                "password": pass
            });
        }
    }
    console.log(location.pathname)
    async function handleLogin() {
        const user ={
            username:id,
            password:pass
        }
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const response = await useLogin(user);
            if(response.status===200){
                localStorage.setItem('accessToken', response.data);
                navigate(location.pathname && location.pathname ==='/login'? '/' : location.pathname)
                window.location.reload();
            }
        } catch (error) {
            if(error.message==='Network Error') alert('서버가 응답하지 않습니다. \n관리자에게 문의하세요');
            else{
                alert('아이디와 비밀번호를 확인하세요');
                setPass("");
            }

        }finally {
        }
    }
    return (
        <>
            <div className="w-full  px-[30px] line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <Link to={"/"}>
                       <BrandName />
                    </Link>
                    <p className={`ml-auto text-[15px] text-[blue] hover:cursor-pointer`} onClick={()=>navigate(-1)}>뒤로가기</p>
                </div>
            </div>
            
            <div className={"px-[30px]"}>
                <div className={"text-center mt-[3rem]"}>
                    <p className={"text-[34px] mb-1"}>로그인</p>
                    <span className={"keyFix text-[18px]"}>아직 계정이 없으신가요?</span> <Link to="/join"  className={"text-[blue] text-[16px]"}> 가입하기</Link>
                    <input value={id}
                           onChange={(e)=>idInputHandler(e)}
                           type={"number"}
                           pattern={"[0-9]*"}
                           inputMode={"numeric"}
                           placeholder={"전화번호"}
                           className={"border-b indent-3 w-[90%] h-[55px] mt-[3rem] no-outline"}
                           autoFocus={true}/>
                    <input
                        value={pass}
                        onChange={(e)=>passInputHandler(e)}
                        onKeyPress={passwordEnter}
                        className={"border-b indent-3 w-[90%] h-[55px] mt-[1rem] no-outline"}
                        type={"password"} placeholder={"비밀번호"}/>
                </div>

                <button onClick={handleLogin} className={"mt-10 loginbtn_Y" }>로그인</button>


            </div>
        </>
    );
}

export default Login;