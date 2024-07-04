import React from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <div className={`main-img`}></div>
            <div className={`section-init-container`}>

            </div>
            <div className={`section-init-btn-container`}>
                <Link to={"/game/quick"} className={`mr-[20px]`}>빠른시작</Link>
                <Link to={"/game/create"}>연습경기</Link>
            </div>
        </div>
    );
}

export default Home;