import React, {useState} from 'react';
import menu from '../../resources/icons/menu.png'
import SlideMenu from "../menu/SlideMenu";
import {Link} from "react-router-dom";


function MainHeader() {
    const accessToken = localStorage.getItem("accessToken");
    let payload = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
    let userToken = decodeURIComponent(escape(window.atob(payload)));
    const user = JSON.parse(userToken);

    const [open, setOpen]=useState(false)

    const openHandler = () =>{
        if(open) document.body.style.removeProperty('overflow');
        else document.body.style.overflow = 'hidden';
        setOpen(!open)
    }

    return (
        <>
        <div className="w-full  px-[30px] py-[5px] line-h-50 nav-bar h-[45px]">

            <div className="inline-block  line-h-35 w-[100%] flex h-[35px]" >
                <Link to={"/"}>
                    <span className={"Headland font-bold text-[20px]"}>P</span>arkGolf
                </Link>
                <button onClick={openHandler} className={"ml-auto"}>
                    <img className="w-7 h-7 " alt="menu" src={menu}/>
                </button>
            </div>
        </div>
        <SlideMenu open={open} setOpen={setOpen} user={user}/>
            {open  && <div className={"fixed top-0 left-0 w-full h-full bg-[rgba(31,48,60,.9)] z-999"} onClick={()=>setOpen(false)}></div>  }
        </>
    );
}

export default MainHeader;