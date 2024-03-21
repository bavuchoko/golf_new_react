import React, {useState} from 'react';
import menu from '../resources/icons/menu.png'
import close from '../resources/icons/close.png'
import MainMenu from "./sidmenu/MainMenu";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "react-query";
import {tokenVaildation} from "../api/auth/AuthService";

import {Link} from "react-router-dom";
import {logout} from "../redux/slice/authSlice";
import LoadingModal from "../components/modal/LoadingModal";
import {useHeaderContext} from "./context/HeaderContext";


function Header() {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const { isLoading, error, data } = useQuery('menus', tokenVaildation,{
        onError: (error) => {
            alert("세션이 종료되어 로그아웃되었습니다.")
            dispatch(logout());
        },
        onSuccess: (data) => {
            if (!data) {
            }else{}
        },
    });
    ///////////////////////////////////////////////////////////////////////////
    const [open, setOpen]=useState(false)
    const { apiLoading } = useHeaderContext();

    const openHandler = () =>{
        if(open) document.body.style.removeProperty('overflow');
        else document.body.style.overflow = 'hidden';
        setOpen(!open)
    }
    const closeMenu = () =>{
        setOpen(false)
        document.body.style.removeProperty('overflow');
    }

    return (
        <>
        <div className="w-full nav-bar border-b">
            {apiLoading &&
                <LoadingModal />
            }
            <div className="inline-block w-[100%] flex inde" >
                <p>
                    <fp className={"font-bold text-[38px]"}>P</fp>arkGolf
                </p>
                <button onClick={openHandler} className={"ml-auto"}>
                    {open ?
                    <img className="w-8 h-8  " alt="menu" src={close}/>
                        :
                    <img className="w-8 h-8 " alt="menu" src={menu}/>
                    }
                </button>
            </div>
        </div>
        <MainMenu closeMenu={closeMenu} open={open}/>
        </>
    );
}

export default Header;