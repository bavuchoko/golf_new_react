import React from 'react';
import '../../intro.css';
import {
    IntroBlueRoundButton,
    IntroButtonContainer,
    IntroContainer,
    IntroContents,
    IntroMessageContainer
} from "./style/StyleView";
import {isLoggedIn} from "../../api/common/CommonMethod";

const MyComponent = () => {

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
                    {/*<IntroBlueRoundButton href={"/game/quick"} className={``}>*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"*/}
                    {/*         className="inline w-5 h-5 mr-2 rounded-full text-[red]">*/}
                    {/*        <path fillRule="evenodd"*/}
                    {/*              d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"*/}
                    {/*              clipRule="evenodd"/>*/}
                    {/*    </svg>*/}
                    {/*    간편시작*/}
                    {/*</IntroBlueRoundButton>*/}
                    <IntroBlueRoundButton href={"/game/create"} className={``}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24"
                             strokeWidth="1.5" stroke="currentColor"
                             className="inline w-5 h-5 mr-2 rounded-full text-[red] verti-top">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                        </svg>
                        연습경기
                    </IntroBlueRoundButton>
                </IntroButtonContainer>
            </IntroContents>
</IntroContainer>
)
    ;
};

export default MyComponent;
