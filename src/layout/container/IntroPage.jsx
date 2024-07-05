import React from 'react';
import {IntroActions, IntroBlueRoundButton, IntroContainer, IntroContents, IntroSection} from "./style/StyleView";
import {isLoggedIn} from "../../api/common/CommonMethod";

function IntroPage(props) {
    return (
        <>
            <IntroContainer isLoggedIn={isLoggedIn}>
                {/*섹션1*/}
                <IntroSection isLoggedIn={isLoggedIn}>
                    {/*섹션1-헤더*/}
                    <IntroContents isLoggedIn={isLoggedIn}>
                        <p>간편하게 타수를 </p>
                        <p>기록할 수 있습니다.</p>
                    </IntroContents>

                    {/*섹션1-액션*/}
                    <IntroActions>
                        <div className={`w-[320px] m-auto`}>
                            <IntroBlueRoundButton to={"/game/quick"} className={` mr-[20px] `}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="inline w-5 h-5 mr-2 rounded-full text-[red]"> <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd"/></svg>
                                빠른시작
                            </IntroBlueRoundButton>
                            <IntroBlueRoundButton to={"/game/create"} className={``}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline w-5 h-5 mr-2 rounded-full text-[red] verti-top"> <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/></svg>
                                연습경기
                            </IntroBlueRoundButton>
                        </div>
                    </IntroActions>

                </IntroSection>

            </IntroContainer>
        </>
    );
}

export default IntroPage;