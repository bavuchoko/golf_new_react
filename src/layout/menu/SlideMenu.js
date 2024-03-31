import React from 'react';
import close from "../../resources/icons/close.png";
import {userLogout} from "../../api/auth/AuthService";
import {Link, useNavigate} from "react-router-dom";

function MainMenu({open, setOpen, user }) {
    const navigate = useNavigate();

    const handleLogout =async ()=> {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLoggedIn");
        const response = await userLogout(user);
    }

    function ageCalc(birth) {
        const today = new Date();
        let year = '19';
        if(birth.substring(0,1)==='0'){
            year ='20';
        }
        year = year + birth.substring(0,2);
        let month = birth.substring(2,4);
        let day = birth.substring(4,6);
        const birthDate = new Date(year, month, day); // 2000년 8월 10일
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


    return (
        <div className={`slideMenu ${open ? 'slide-in' : ''}`}>
            <img className="w-5 h-5  " alt="menu" src={close} onClick={()=>{
                setOpen(false);
                document.body.style.removeProperty('overflow');
                }}/>
            <ul>
                <li>홈으로</li>
                <li>경기장 등록하기</li>
                <li>연습매치 등록하기</li>
                <li>문의하기</li>
            </ul>

            <div className={"menu-bottom-slide flex"}>
                <div>
                    <Link to={"/"} onClick={()=>{
                        handleLogout()
                        setOpen(false)
                        window.location.reload();
                    }}><button className={"font-bold text-[17px]"} >로그아웃</button></Link>
                    <p className={"text-[14px]"}>{user.name}</p>
                </div>
                <div className={"user-family-name"}>
                    {user.name}
                </div>
            </div>
        </div>
    );
}

export default MainMenu;
