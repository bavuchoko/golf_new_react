import React, {useEffect, useRef, useState} from 'react';
import {animated, useSpring} from 'react-spring';
import {useDrag} from 'react-use-gesture';
import {useHeaderContext} from "../../layout/context/HeaderContext";
import LoadingModal from "../modal/LoadingModal";

/**
 * expose : 슬라이드시 버튼이 보일 영역넓이
 * */

const SliderShowButton = ({expose}) => {
    const {apiLoading, setApiLoading  } = useHeaderContext();
    const [unlocked, setUnlocked] = useState(false);
    const containerRef = useRef(null);
    const [{ pos }, set] = useSpring(() => ({
        pos: [0, 0],
        config: { tension: 300, friction: 20 }
    }));



    const bind = useDrag(
        ({ down, movement: [mx, my], cancel, event }) => {
            // 슬라이드를 수평으로만 제한
            if (Math.abs(mx) < Math.abs(my)) {
                return;
            }

            if (down) {
                // 슬라이드 방향
                // Math.max : 왼->오 / Math.min : 오->왼
                const limitedX = Math.max(0, mx);
                set({ pos: [limitedX, 0] });
            } else {
                // 슬라이드가 충분히 되었는지 확인

                if (mx > 220) {
                    if(window.confirm("경기를 시작합니다.")){
                        setApiLoading(true)

                    }else{
                        set({ pos: [-expose, 0] });
                    }
                    // setUnlocked(true);
                }else if (mx < 250) {
                    setUnlocked(false);
                    set({ pos: [0, 0] }); // 슬라이더 위치를 0으로 초기화
                }
                else{
                    set({ pos: [0, 0] });
                }


            }
        });


    return (
        <div className={`w-full  h-[60px] line-h-60 text-center`}
             style={{
                 position:"relative",
                 height: "60px",
                 overflow:"hidden",
                 borderRadius:"15px",
                 background: "#d3d3d3",
                 lineHeight: '60px',
                 boxShadow: 'inset 5px 5px 11px #2f2f2f, inset -2px -5px 8px #ffffff'
             }}
        >
            <p className={` animate-pulse font-bold text-[white]`}>밀어서 시작하기</p>
            <animated.div
                {...bind()}
                style={{
                    lineHeight: "33px",
                    padding: "0.5rem",
                    position: 'absolute',
                    top: 0,
                    border:"1px solid gray",
                    zIndex: "20",
                    borderRadius: "14px",
                    fontSize: "15px",
                    left: "0px",
                    height: '100%',
                    width: '70px',
                    background: 'white',
                    cursor: 'pointer',
                    touchAction: 'pan-y',
                    transform: pos.to((x) => `translateX(${x}px)`), // 슬라이더 위치 업데이트
                }}

                onClick={() => {
                    set({pos: [0, 0]});
                    setUnlocked(false)
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" >
                    <path
                        fill="gray"
                        d="M24 12l-8.991 6.228v-2.722c2.54-1.757 5.053-3.506 5.053-3.506s-2.513-1.718-5.053-3.474v-2.722l8.991 6.196zm-6.96 0l-9.04-6.118v3.118h-8v6h8v3.118l9.04-6.118z"/>
                </svg>
            </animated.div>
            {apiLoading &&
                <LoadingModal />
            }
        </div>
    );
};

export default SliderShowButton;