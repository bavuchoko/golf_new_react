import React, {useState} from 'react';
import menu from '../../resources/icons/menu.png'
import SlideMenu from "../menu/SlideMenu";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {tokenValidate} from "../../api/auth/AuthService";

import {logout} from "../../redux/slice/authSlice";
import {useDispatch} from "react-redux";
import {finish} from "../../redux/slice/apiSlice";


function InnerHeader() {

    const [open, setOpen]=useState(false)
    const dp = useDispatch();
    const openHandler = () =>{
        if(open) document.body.style.removeProperty('overflow');
        else document.body.style.overflow = 'hidden';
        setOpen(!open)
    }
    const navigate =useNavigate();
    const { isLoading, error, data } = useQuery('authentication', tokenValidate,{
        staleTime: 10000,
        refetchOnWindowFocus: false,
        onError: (error) => {
            alert("세션이 종료되어 로그아웃되었습니다.")
            dp(logout());
            dp(finish());
        },
        onSuccess: (data) => {
            if (!data) {
            }else{}
        },
    });
    const location = useLocation();
    const firstSlashIndex = location.pathname.indexOf('/');
    const lastSlashIndex = location.pathname.lastIndexOf('/');
    const result = location.pathname.substring(firstSlashIndex ,lastSlashIndex+ 1);
    return (
        <>
            <div className="w-full  px-[30px] py-[5px] line-h-50 nav-bar h-[45px]">

                <div className="inline-block  line-h-35 w-[100%] flex h-[35px]">
                    <p onClick={() => {
                        navigate(result)
                    }}>뒤로</p>
                    <button onClick={openHandler} className={"ml-auto"}>
                        <img className="w-7 h-7 " alt="menu" src={menu}/>
                    </button>
                </div>
            </div>
            <SlideMenu open={open} setOpen={setOpen}/>
            {open  && <div className={"fixed top-0 left-0 w-full h-full bg-[rgba(31,48,60,.9)] z-999"} onClick={()=>setOpen(false)}></div>  }
        </>
    );
}

export default InnerHeader;