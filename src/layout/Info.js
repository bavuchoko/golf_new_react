import React from 'react';
import {Link, Outlet} from "react-router-dom";
import BeforLoginHeader from "./header/BeforLoginHeader";
import {useSelector} from "react-redux";
import MainHeader from "./header/MainHeader";

function Info(props) {

    return (
        <>
            <BeforLoginHeader />
            <div className="containers">
                <div className={`section-init-container`}>

                </div>
                <div className={`section-init-btn-container`}>
                    <Link to={"/game/quick"} className={`mr-[20px]`} >빠른시작</Link>
                    <Link to={"/game/create"}>연습경기</Link>
                </div>
            </div>
        </>
    );
}

export default Info;