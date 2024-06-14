import React from 'react';
import {Outlet} from "react-router-dom";
import MainHeader from "./header/MainHeader";
import {useSelector} from "react-redux";
import LoadingModal from "../components/modal/LoadingModal";

function Layout() {



    return (
        <>
            <MainHeader />
            <div className="containers">
                <Outlet/>
            </div>
        </>
    );
}

export default Layout;