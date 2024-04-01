import React from 'react';
import {Outlet} from "react-router-dom";
import BeforLoginHeader from "./header/BeforLoginHeader";
import {useSelector} from "react-redux";
import MainHeader from "./header/MainHeader";

function Test(props) {

    return (
        <>
            <BeforLoginHeader />
            <div className="containers">
                <button onClick={()=>localStorage.setItem('accessToken', 'eyJhbGciOiJIUzUxMiJ9.eyJnZW5kZXIiOiJNQUxFIiwiYXV0aCI6IlJPTEVfVVNFUiIsIm5hbWUiOiLrsJXsooXsiJgiLCJiaXJ0aCI6Ijg1MDEwNSIsImlkIjoxLCJ1c2VybmFtZSI6IjAxMDI3MTMyODE2IiwiaWF0IjoxNzExOTY2Nzc4LCJleHAiOjE3MTE5Njc2Nzh9.BYeqYiEkMh-8E_dXx5M9U6Za3lsa1hx5opo0lE1Aqze0_2HFxdr0xcftYthbneOS8T7m7JGmDJ10OgD5TRLciw')}>login</button>
            </div>
        </>
    );
}

export default Test;