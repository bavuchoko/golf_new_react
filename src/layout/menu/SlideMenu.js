import React from 'react';
import close from "../../resources/icons/close.png";
import {userLogout} from "../../api/auth/AuthService";
import {Link, useNavigate} from "react-router-dom";
import SlideMenuSub from "./SlideMenuSub";
import {useState} from "react";
import {useSelector} from "react-redux";

function SlideMenu({open, setOpen }) {
    const [openParent, setOpenParent] = useState(null)
    const user = useSelector((state) => state.user.user);
    const handleLogout =async ()=> {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("isLoggedIn");
        const response = await userLogout(user);
    }

    const MENU_LIST = [
        { id:2, title: '홈으로', link : '/', children: [] },
        { id:3, title: '경기장', link : undefined, children: [
            {id:6, title:'경기장 조회하기', link : '/field/list' },
            {id:7, title:'경기장 등록하기', link : '/field/create' },
            {id:8, title:'경기장 기록관리', link : '/field/private' },
            ]},
        { id:4, title: '연습매치', link : undefined, children: [
            {id:9, title:'연습경기 목록', link : '/game'},
            {id:10, title:'간편시작', link : '/game/quick'},
            {id:12, title:'연습경기', link : '/game/create'}
            ] },
        { id:5, title: '문의하기', link : undefined, children: [{id:7, title:'자주하는 질문', link : '/contact'}] },
    ];

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
                {MENU_LIST.map(each =>(
                    <SlideMenuSub key={each.id} each={each} setOpen={setOpen} openParent={openParent} setOpenParent={setOpenParent}/>
                ))}
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
                    {user.name.substring(user.name.length - 2)}
                </div>
            </div>
        </div>
    );
}

export default SlideMenu;
