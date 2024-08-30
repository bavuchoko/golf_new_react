import React, { useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';

function SlideComponent({id, expose, children, buttons }) {
    const [{ pos }, set] = useSpring(() => ({
        pos: [0, 0],
        config: { tension: 300, friction: 20 },
    }));

    useEffect(() => {
            set({ pos: [0, 0], immediate: true});
    }, [id]);

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        if (Math.abs(mx) < Math.abs(my)) {
            return;
        }

        if (down) {
            const limitedX = Math.min(0, mx);
            set({ pos: [limitedX, 0] });
        } else {
            if (mx < -80) {
                set({ pos: [-expose, 0] });
            } else if (mx > 80) {
                set({ pos: [0, 0] });
            } else {
                set({ pos: [0, 0] });
            }
        }
    });

    return (
        <div className="w-full border p-1 mb-3 h-[120px] relative overflow-hidden sliderBox">
            <animated.div
                {...bind()}
                style={{
                    padding: "0.5rem",
                    position: 'absolute',
                    top: 0,
                    zIndex: 10,
                    right: 0,
                    height: '100%',
                    width: 'calc(100%)',
                    background: 'white',
                    cursor: 'pointer',
                    touchAction: 'pan-y',
                    transform: pos.to((x) => `translateX(${x}px)`),
                }}
            >
                {children}
            </animated.div>
            {buttons && buttons.map((button, index) => (
                <div key={index}>
                    {button}
                </div>
            ))}
        </div>
    );
}

export default SlideComponent;
