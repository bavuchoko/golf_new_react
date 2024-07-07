import React, { useEffect, useState } from 'react';
import bezierEasing from "https://cdn.skypack.dev/bezier-easing@2.1.0";
import '../../scroll.css';
import {IntroActions, IntroBlueRoundButton, IntroContainer, IntroContents} from "./style/StyleView";
import {isLoggedIn} from "../../api/common/CommonMethod";

const MyComponent = () => {
    const ease = bezierEasing(0.25, 0.1, 0.25, 1.0);
    const easeIn = bezierEasing(0.38, 0.01, 0.78, 0.13);
    const midSlow = bezierEasing(0, 0.7, 1, 0.3);
    const def = new Map([
        [
            "slide1Btn",
            {
                id: "slide1-btn",
                top: 0,
                bottom: 1900,
                topStyle: {
                    opacity: 100,
                    translateY: 100,
                },
                bottomStyle: {
                    opacity: 100,
                },
                animations: [
                    {
                        enabled: false,
                        top: 0,
                        bottom: 1900,
                        easing: midSlow,
                        styles: [
                            {
                                name: "translateY",
                                topValue: 100,
                                bottomValue: 180,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 500,
                        bottom: 800,
                        easing: ease,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 1,
                                bottomValue: 1,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 1400,
                        bottom: 1900,
                        easing: easeIn,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 1,
                                bottomValue: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        [
            "slide1",
            {
                id: "slide1",
                top: 0,
                bottom: 1900,
                topStyle: {
                    opacity: 0,
                    translateY: -100,
                },
                bottomStyle: {
                    opacity: 0,
                    translateY: -50,
                },
                animations: [
                    {
                        enabled: false,
                        top: 0,
                        bottom: 1900,
                        easing: midSlow,
                        styles: [
                            {
                                name: "translateY",
                                topValue: -50,
                                bottomValue: -100,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 0,
                        bottom: 800,
                        easing: ease,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 0,
                                bottomValue: 1,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 1400,
                        bottom: 1900,
                        easing: easeIn,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 1,
                                bottomValue: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        [
            "scroll-down",
            {
                id: "scroll-down",
                top: 0,
                bottom: 1000,
                topStyle: {
                    opacity: 1,
                },
                bottomStyle: {
                    opacity: 0,
                },
                animations: [
                    {
                        enabled: false,
                        top: 600,
                        bottom: 1000,
                        easing: easeIn,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 1,
                                bottomValue: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        [
            "slide2",
            {
                id: "slide2",
                top: 1900,
                bottom: 3200,
                topStyle: {
                    opacity: 0,
                    translateY: -100,
                },
                bottomStyle: {
                    opacity: 0,
                    translateY: -50,
                },
                animations: [
                    {
                        enabled: false,
                        top: 1900,
                        bottom: 3200,
                        easing: midSlow,
                        styles: [
                            {
                                name: "translateY",
                                topValue: -50,
                                bottomValue: -100,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 1900,
                        bottom: 2500,
                        easing: ease,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 0,
                                bottomValue: 1,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 2600,
                        bottom: 3200,
                        easing: easeIn,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 1,
                                bottomValue: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        [
            "slide3",
            {
                id: "slide3",
                top: 3300,
                bottom: 4600,
                topStyle: {
                    opacity: 0,
                },
                bottomStyle: {
                    opacity: 0,
                },
                animations: [
                    {
                        enabled: false,
                        top: 3300,
                        bottom: 4600,
                        easing: midSlow,
                        styles: [
                            {
                                name: "translateY",
                                topValue: -50,
                                bottomValue: -100,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 3300,
                        bottom: 3900,
                        easing: ease,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 0,
                                bottomValue: 1,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 4000,
                        bottom: 4600,
                        easing: easeIn,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 1,
                                bottomValue: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        [
            "moving-background",
            {
                id: "moving-background",
                top: 4500,
                bottom: 5900,
                topStyle: {
                    opacity: 0,
                    translateY: 300,
                },
                bottomStyle: {
                    opacity: 0,
                    translateY: 0,
                },
                animations: [
                    {
                        enabled: false,
                        top: 4500,
                        bottom: 5300,
                        easing: ease,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 0,
                                bottomValue: 1,
                            },
                            {
                                name: "translateY",
                                topValue: 200,
                                bottomValue: 0,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 5300,
                        bottom: 5900,
                        easing: easeIn,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 1,
                                bottomValue: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        [
            "slide4",
            {
                id: "slide4",
                top: 4700,
                bottom: 6000,
                topStyle: {
                    opacity: 0,
                },
                bottomStyle: {
                    opacity: 0,
                },
                animations: [
                    {
                        enabled: false,
                        top: 4700,
                        bottom: 6000,
                        easing: midSlow,
                        styles: [
                            {
                                name: "translateY",
                                topValue: -50,
                                bottomValue: -100,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 4700,
                        bottom: 5300,
                        easing: ease,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 0,
                                bottomValue: 1,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 5400,
                        bottom: 6000,
                        easing: easeIn,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 1,
                                bottomValue: 0,
                            },
                        ],
                    },
                ],
            },
        ],
        [
            "slide5",
            {
                id: "slide5",
                top: 6100,
                bottom: 9000,
                topStyle: {
                    opacity: 0,
                },
                bottomStyle: {
                    opacity: 0,
                },
                animations: [
                    {
                        enabled: false,
                        top: 6100,
                        bottom: 7100,
                        easing: midSlow,
                        styles: [
                            {
                                name: "translateY",
                                topValue: -50,
                                bottomValue: -100,
                            },
                        ],
                    },
                    {
                        enabled: false,
                        top: 6100,
                        bottom: 6700,
                        easing: ease,
                        styles: [
                            {
                                name: "opacity",
                                topValue: 0,
                                bottomValue: 1,
                            },
                        ],
                    },
                ],
            },
        ],
    ]);
    const [enabled, setEnabled] = useState(new Map());
    const [disabled, setDisabled] = useState(new Map(def));


    useEffect(() => {




        const elements = {
            "sticky-container": document.getElementById("sticky-container"),
            "scroll-down": document.getElementById("scroll-down"),
            slide1: document.getElementById("slide1"),
            slide1Btn: document.getElementById("slide1-btn"),
            slide2: document.getElementById("slide2"),
            slide3: document.getElementById("slide3"),
            "moving-background": document.getElementById("moving-background"),
            slide4: document.getElementById("slide4"),
            slide5: document.getElementById("slide5"),
        };


        const isAmong = (num, top, bottom) => {
            return num >= top && num <= bottom;
        };

        const getPoint = (top, bottom, rate) => {
            return top + (bottom - top) * rate;
        };

        const applyStyle = (element, styleName, value) => {
            if (styleName === "translateY") {
                element.style.transform = `translateY(${value}px)`;
            } else if (styleName === "translateX") {
                element.style.transform = `translateX(${value}px)`;
            } else {
                element.style[styleName] = `${value}`;
            }
        };

        function onScroll() {
            // 현재 스크롤 위치 파악
            console.log(disabled)
            const scrollTop = window.scrollY || window.pageYOffset;
            const currentPos = scrollTop + window.innerHeight / 2;
            // disabled 순회하며 활성화할 요소 찾기.
            disabled.forEach((obj, id) => {
                // 만약 칸에 있다면 해당 요소 활성화
                if (isAmong(currentPos, obj.top, obj.bottom)) {
                    enabled.set(id, obj);
                    elements[id].classList.remove("disabled");
                    elements[id].classList.add("enabled");
                    disabled.delete(id);
                }
            });
            // enabled 순회하면서 헤제할 요소를 체크
            enabled.forEach((obj, id) => {
                const { top, bottom, topStyle, bottomStyle } = obj;

                // 범위 밖에 있다면
                if (!isAmong(currentPos, top, bottom)) {
                    // 위로 나갔다면 시작하는 스타일 적용
                    if (currentPos <= top) {
                        Object.entries(topStyle).forEach(([styleName, value]) => {
                            applyStyle(elements[id], styleName, value);
                        });
                    }
                    // 아래로 나갔다면 끝나는 스타일적용
                    else if (currentPos >= bottom) {
                        Object.entries(bottomStyle).forEach(([styleName, value]) => {
                            applyStyle(elements[id], styleName, value);
                        });
                    }

                    // 리스트에서 삭제하고 disabled로 옮김.
                    disabled.set(id, obj);
                    elements[id].classList.remove("enabled");
                    elements[id].classList.add("disabled");
                    enabled.delete(id);
                }

                // enable 순회중, 범위 내부에 제대로 있다면 각 애니메이션 적용시키기.
                else {
                    applyAnimations(currentPos, id);
                }
            });
        }



        const applyStyles = (id, styles, rate) => {
            styles.forEach((style) => {
                const { name, topValue, bottomValue } = style;
                const value = getPoint(topValue, bottomValue, rate);
                applyStyle(elements[id], name, value);
            });
        };

        const applyAnimations = (currentPos, id) => {
            const animations = def.get(id)?.animations;
            if (!animations) {
                return;
            }

            animations.forEach((animation) => {
                const { top: a_top, bottom: a_bottom, easing, styles } = animation;
                const isIn = isAmong(currentPos, a_top, a_bottom);

                if (isIn && !animation.enabled) {
                    animation.enabled = true;
                } else if (!isIn && animation.enabled) {
                    if (currentPos <= a_top) {
                        applyStyles(id, styles, 0);
                    } else if (currentPos >= a_bottom) {
                        applyStyles(id, styles, 1);
                    }
                    animation.enabled = false;
                }

                if (animation.enabled) {
                    const rate = easing((currentPos - a_top) / (a_bottom - a_top));
                    applyStyles(id, styles, rate);
                }
            });
        };
        function initAnimation() {
            // Sticky Conainer 의 높이를 설정함.
            elements["sticky-container"].style.height = `7100px`;

            // 모든 요소를 disabled 에 넣음.
            def.forEach((obj, id) => {
                disabled.set(id, obj);
            });
            // 초기 스타일 적용
            disabled.forEach((obj, id) => {
                Object.keys(obj.topStyle).forEach((styleName) => {
                    const pushValue = obj.topStyle[styleName];
                    console.log(elements[id])
                    applyStyle(elements[id], styleName, pushValue);
                });
            });

            // 이미 요소의 범위 및 애니메이션의 범위에 있는 것들을 렌더링하기 위해
            // 임의로 스크롤 이벤트 핸들러를 한 번 실행시킴.
            onScroll();
        }

        initAnimation();

        window.addEventListener("scroll", onScroll);



        return () => {
            window.removeEventListener("scroll", onScroll);
        };

    }, []); // useEffect 의 dependency 배열은 빈 배열로 설정하여 한 번만 실행되도록 합니다.

    return (
        <IntroContainer  isLoggedIn={isLoggedIn} className="main sticky-container" id="sticky-container">
            <div className="sticky">
                <IntroContents  isLoggedIn={isLoggedIn} className="slide-container">
                    <div className={`slide W-[320px] m-auto`} id="slide1-btn">
                        <IntroBlueRoundButton href={"/game/quick"} className={` mr-[20px] `}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="inline w-5 h-5 mr-2 rounded-full text-[red]">
                                <path fillRule="evenodd"
                                      d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                                      clipRule="evenodd"/>
                            </svg>
                            빠른시작
                        </IntroBlueRoundButton>
                        <IntroBlueRoundButton href={"/game/create"} className={``}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24"
                                 strokeWidth="1.5" stroke="currentColor"
                                 className="inline w-5 h-5 mr-2 rounded-full text-[red] verti-top">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                            </svg>
                            연습경기
                        </IntroBlueRoundButton>
                    </div>

                    <div className="slide" id="slide1">
                        <div className="slide-big-text">
                            <p>간편하게 타수를 </p>
                            <p>기록할 수 있습니다.</p>
                        </div>
                    </div>

                    <div id="scroll-down">
                        <div className="scroll-down-text">아래로 스크롤하세요.</div>
                    </div>

                    <div className="slide" id="slide2">
                        <div className="slide-big-text">
                            <p>자신만의 노하우를</p>
                        </div>
                    </div>

                    <div className="slide" id="slide3">
                        <div className="slide-big-text">
                            <p>관리하세요.</p>
                        </div>
                    </div>

                    <div className="slide slide-left" id="slide4">
                        <div className="slide4-content">
                            <div className="slide-big-text">
                                <p>실시간으로</p>
                                <p>확인하세요</p>
                            </div>
                            <div className="slide-small-text">
                                <p>some message</p>
                            </div>
                        </div>
                    </div>

                    <div id="moving-background">이미지</div>

                    <div className="slide slide-left" id="slide5">
                        <div className="slide-big-text">
                            <p>당신의</p>
                            <p>즐거운 라운딩을</p>
                            <p>응원합니다.</p>
                        </div>
                        <div className="go-surf-wrapper">
                            <a href="#" target="_blank"
                            >bavuchoko@naver.com</a
                            >
                        </div>
                    </div>

                </IntroContents>
            </div>
        </IntroContainer>
    );
};

export default MyComponent;
