import React, {useState} from 'react';
import menu from '../../resources/icons/menu.png'
import close from '../../resources/icons/close.png'
import DropMenu from "../menu/DropMenu";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "react-query";
import {tokenVaildation} from "../../api/auth/AuthService";
import {logout} from "../../redux/slice/authSlice";
import LoadingModal from "../../components/modal/LoadingModal";
import {useHeaderContext} from "../context/HeaderContext";
import SlideMenu from "../menu/SlideMenu";


function AfterLoginHeader() {

    const dispatch = useDispatch();
    const { isLoading, error, data } = useQuery('auth', tokenVaildation,{
        onError: (error) => {
            alert("세션이 종료되어 로그아웃되었습니다.")
            dispatch(logout());
        },
        onSuccess: (data) => {
            if (!data) {
            }else{}
        },
    });

    const [open, setOpen]=useState(false)

    const openHandler = () =>{
        if(open) document.body.style.removeProperty('overflow');
        else document.body.style.overflow = 'hidden';
        setOpen(!open)
    }

    return (
        <>
        <div className="w-full  px-[30px] line-h-40 py-[5px]  nav-bar h-[55px] ">
            <div className="inline-block w-[100%] flex h-[50px]" >
                <p>
                    <span className={"Headland font-bold text-[20px]"}>P</span>arkGolf
                </p>
                <button onClick={openHandler} className={"ml-auto"}>
                    <img className="w-7 h-7 " alt="menu" src={menu}/>
                </button>
            </div>
        </div>
        <SlideMenu open={open} setOpen={setOpen}/>
            {open  && <div className={"fixed top-0 left-0 w-full h-full bg-[rgba(31,48,60,.9)] z-999"}></div>  }
        </>
    );
}

export default AfterLoginHeader;