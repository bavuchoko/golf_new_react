import React, {useState} from 'react';
import {animated, useSpring} from 'react-spring';
import {useDrag} from 'react-use-gesture';

/**
 * expose : 슬라이드시 버튼이 보일 영역넓이
 * children : 본문영역
 * buttons :  슬라이드 되면 나타날 버튼요소  주로 <jsx/>
 * */

const SliderShowButton = ({expose}) => {
    const [unlocked, setUnlocked] = useState(false);
    const [x, setX] = useState(0);
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
                // mx를 음수로 제한하여 오른쪽에서 왼쪽으로 슬라이드할 수 있도록 설정
                const limitedX = Math.min(0, mx);
                set({ pos: [limitedX, 0] });
            } else {
                // 슬라이드가 충분히 되었는지 확인 (예: -200px)
                if (mx < -80) {
                    setUnlocked(true);
                    set({ pos: [-expose, 0] });
                }else if (mx > 80) {
                    setUnlocked(false);
                    set({ pos: [0, 0] }); // 슬라이더 위치를 0으로 초기화
                }
                else{
                    set({ pos: [0, 0] });
                }


            }
        });

    // bg-[var(--main-bg-color)]

    return (
        <div className={`w-full border h-[50px] relative  bg-[var(--main-inner-color)] overflow-hidden`}>
            <animated.div
                {...bind()}
                style={{
                    lineHeight:"33px",
                    padding:"0.5rem",
                    position: 'absolute',
                    top: 0,
                    zIndex:"20",
                    fontSize:"15px",
                    right: 0,
                    height: '100%',
                    width: 'calc(100%)',
                    background: 'white',
                    cursor: 'pointer',
                    touchAction: 'pan-y',
                    transform: pos.to((x) => `translateX(${x}px)`), // 슬라이더 위치 업데이트
                }}
                onClick={()=>{
                    set({ pos: [0, 0] });
                    setUnlocked(false)}} >
                밀어서 시작하기
            </animated.div>
        </div>
    );
};

export default SliderShowButton;