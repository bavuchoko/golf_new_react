import React from 'react';
import {Outlet} from "react-router-dom";
import HomeHeader from "./header/HomeHeader";
import {useSelector} from "react-redux";
import LoadingModal from "../components/modal/LoadingModal";
import InnerHeader from "./header/InnerHeader";

function InnerLayout() {



    return (
        <>
            <InnerHeader/>
            <div className="containers">
                <Outlet/>
            </div>
        </>
    );
}

export default InnerLayout;