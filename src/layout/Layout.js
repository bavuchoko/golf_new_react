import React from 'react';
import {Outlet} from "react-router-dom";
import MainHeader from "./header/MainHeader";

function Layout(props) {

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