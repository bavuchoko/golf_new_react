import React, {useEffect, useState} from 'react';

function StepName({setStep, data, fnc, target}) {
    const phoneRegEx = /^(010|011|016|018)[0-9]{8}$/;
    const [message, setMessage]= useState("로그인 아이디로 사용됩니다.");
    const [pass, setPass] =useState(data[target] && phoneRegEx.test(data[target]) ? true : false);


    const isNumber =  /^\d+$/;
    const inputHandler=(value)=>{
        if (isNumber.test(value) || value==='') {
            fnc((prev)=>({
                ...prev,
                [target]:value
            }));
        }
        if(!phoneRegEx.test(value)) {
            setPass(false)
            setMessage("전화번호 형식과 다릅니다.")
        }else{
            setPass(true)
            setMessage("다음 단계로 넘어가세요")
        }
    }


    return (
        <div className={"px-[30px]"}>
            <div className="w-full line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={()=>setStep("이름")}>뒤로</p>
                    <div className={"ml-auto w-[71px]"}>
                        <span className={"mr-2"}>2/5</span>
                        <span className={" text-[#354db0]"} onClick={() => {
                            if(pass)setStep("생일")
                            else{
                                alert("전화번호를 입력하세요")
                            }
                        }}>다음</span>
                    </div>

                </div>
            </div>

            <div className={"mt-[5rem]"}>

                <p className={"slide-left text-[34px] mb-1"}>휴대용 전화번호를</p>
                <p className={"keyFix slide-right-delay text-[34px] top-[190px] mb-1"}>입력하세요</p>
                <input value={data[target] ? data[target] : '010'}
                       onChange={(e)=>inputHandler(e.target.value)}
                       type={"number"}
                       placeholder={"전화번호"}
                       className={"border-bottom indent-3 w-[90%] h-[55px] mt-[7rem]  no-outline"}
                       autoFocus={true}
                />
                    <div className={"mt-1 text-[gray]"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className={`w-5 h-5 inline-block mr-1 ${!pass? 'text-[red]':''} `}>
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                        </svg>
                        <span className={`align-middle text-[14px] ${!pass? 'text-[red]':''} `}> {message}</span>
                    </div>
            </div>

        </div>
    );
}

export default StepName;