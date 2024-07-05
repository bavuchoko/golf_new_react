import React from 'react';
import {Link, Outlet} from "react-router-dom";
import BeforLoginHeader from "../header/BeforLoginHeader";
import {useSelector} from "react-redux";
import MainHeader from "../header/MainHeader";
import IntroPage from "./IntroPage";

function Info(props) {

    return (
        <>
            <BeforLoginHeader />
            <div className="pt-[65px]">
                <IntroPage />
            </div>
        </>
    );
}

export default Info;