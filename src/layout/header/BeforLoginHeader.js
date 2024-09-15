import React, {useState} from 'react';
import menu from '../../resources/icons/menu.png'
import close from '../../resources/icons/close.png'
import DropMenu from "../menu/DropMenu";
import BrandName from "../BrandName";


function BeforLoginHeader() {
    const [open, setOpen]=useState(false)

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
        <div className="w-full px-[30px] py-[10px] nav-bar line-h-45 h-[65px] border-b shadow-wix">
            <div className="inline-block w-[100%] flex h-[45px]" >
                <p>
                    <BrandName />
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
        <DropMenu closeMenu={closeMenu} open={open}/>
        </>
    );
}

export default BeforLoginHeader;