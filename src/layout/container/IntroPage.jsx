import React, {useState} from 'react';
import '../../intro.css';
import {
    IntroBlueRoundButton,
    IntroButtonContainer,
    IntroContainer,
    IntroContents,
    IntroMessageContainer
} from "./style/StyleView";
import {isLoggedIn} from "../../api/common/CommonMethod";
import Indicator from "./Indicator";


const MyComponent = () => {

    const [page, setPage] =useState([1,2,3])

    return (
        <IntroContainer  isLoggedIn={isLoggedIn} className="main sticky-container" id="sticky-container">


            <IntroContents isLoggedIn={isLoggedIn} className="slide-container">
                <IntroMessageContainer>
                    <div className="big-text">
                        <p>간편하게 타수를 </p>
                        <p>기록할 수 있습니다.</p>
                    </div>
                </IntroMessageContainer>
                <IntroButtonContainer className={`justify-center`}>
                    <IntroBlueRoundButton href={"/game/create"} className={``}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24"
                             strokeWidth="1.5" stroke="currentColor"
                             className="inline w-5 h-5 mr-2 rounded-full text-[red] verti-top">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                        </svg>
                        연습매치
                    </IntroBlueRoundButton>
                </IntroButtonContainer>
            </IntroContents>


            <Indicator arr={page} setArr={setPage}></Indicator>
</IntroContainer>
)
    ;
};

export default MyComponent;
