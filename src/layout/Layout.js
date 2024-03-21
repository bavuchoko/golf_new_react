import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./HEADER";

function Layout(props) {
    return (
        <>
            <Header />
            <div className="containers">
                <Outlet/>
            </div>
        </>
    );
}

export default Layout;