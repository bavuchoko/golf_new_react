import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/slice/authSlice";

function DropMenu({closeMenu,open}) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    function handleLogout() {
        closeMenu()
        // Redux store의 상태를 초기화한다
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loginUser");
        dispatch(logout());
    }

    function ageCalc(birth) {
        const today = new Date();
        let year = '19';
        if(birth.substring(0,1)==='0'){
            year ='20';
        }
        year = year + birth.substring(0,2);
        let month = birth.substring(2,4);
        let day = birth.substring(4,6);
        const birthDate = new Date(year, month, day); // 2000년 8월 10일
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    return (
        <div className={`dropMenu ${open ? 'drop-in' : ''}`}>
            <ul>
                <li>홈으로</li>
                <li>경기장 등록하기</li>
                <li>연습매치 등록하기</li>
                <li>문의하기</li>
            </ul>

            <div className={"menu-bottom"}>
                <button className={"loginbtn_Y"}>로그인</button>
            </div>
        </div>
    );
}

export default DropMenu;
