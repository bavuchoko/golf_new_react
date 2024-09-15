import React from 'react';
import {IndicatorDot} from "./style/StyleView";



function Indicator({arr, setArr, now}) {
    return (
        <div className={`absolute bottom-[30px] w-full h-[10px]`}>

            <div style={{width: `${20 * arr.length}px` }} className={`flex m-auto`}>
                {arr.map(e=>
                    <IndicatorDot now={e===now? true : undefined}/>
                )}
            </div>
        </div>
    );
}

export default Indicator;