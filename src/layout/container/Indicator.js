import React from 'react';
import {IndicatorDot} from "./style/StyleView";



function Indicator({arr, setArr}) {
    return (
        <div className={`absolute bottom-[30px] w-full h-[10px]`}>

            <div style={{width: `${20 * arr.length}px` }} className={`flex m-auto`}>
                {arr.map(e=>
                    <IndicatorDot />
                )}
            </div>
        </div>
    );
}

export default Indicator;