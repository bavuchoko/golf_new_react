import React from 'react';
import BeforLoginHeader from "../header/BeforLoginHeader";
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