import React, {useState} from 'react';
import useGeolocation from "react-hook-geolocation";
import {EachType, TypeSelector} from "./style/style";
import Near from "./list/Near";
import City from "./list/City";
import All from "./list/All";

function List(props) {
    const geolocation = useGeolocation();
    const latitude = geolocation.latitude
    const longitude = geolocation.longitude

    const [option , setOption] = useState('near' );

    return (
        <div className={``}>
            <TypeSelector className={`type-selector`}>
                <EachType  option={option==='all'?true:false} onClick={()=>setOption('all')}>전체보기</EachType>
                <EachType  option={option==='near'?true:false} onClick={()=>setOption('near')}>가까운 곳</EachType>
                <EachType  option={option==='city'?true:false} onClick={()=>setOption('city')}>지역별</EachType>
            </TypeSelector>

            <>
                { option  === "all" && <All  />}
                { option  === "near" && <Near  />}
                { option  === "city" && <City  />}
            </>
        </div>
    );
}

export default List;