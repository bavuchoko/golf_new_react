import React from 'react';
import {Outlet} from "react-router-dom";
import BeforLoginHeader from "./header/BeforLoginHeader";
import {useSelector} from "react-redux";
import AfterLoginHeader from "./header/AfterLoginHeader";

function Layout(props) {

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <>
            {/*{isLoggedIn ?*/}
                <AfterLoginHeader />
                {/*:*/}
                {/*<BeforLoginHeader />*/}
            {/*}*/}
            <div className="containers">
                <Outlet/>
            </div>
        </>
    );
}

export default Layout;