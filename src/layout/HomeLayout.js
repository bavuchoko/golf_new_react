import React from 'react';
import {Outlet} from "react-router-dom";
import HomeHeader from "./header/HomeHeader";
import {useSelector} from "react-redux";
import LoadingModal from "../components/modal/LoadingModal";

function HomeLayout() {



    return (
        <>
            <HomeHeader />
            <div className="containers">
                <Outlet/>
            </div>
        </>
    );
}

export default HomeLayout;