import React from 'react';
import {Link} from "react-router-dom";

function DropMenu({open}) {
    return (
        <div className={`dropMenu ${open ? 'drop-in' : ''}`}>
            <ul>
                <li>홈으로</li>
                <li>경기장 등록하기</li>
                <li>연습매치 등록하기</li>
                <li>문의하기</li>
            </ul>

            <div className={"menu-bottom"}>
                <Link to="/login" className={"loginbtn_Y m-0 m-auto"}>로그인</Link>
            </div>
        </div>
    );
}

export default DropMenu;
