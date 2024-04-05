import React, {useState} from 'react';
import {CitySelector, EachCity, FieldListContainer} from "../style/style";
import EachFiledComponent from "./sub/EachFiledComponent";
import Nocontent from "../../../components/exception/Nocontent";

function City({data}) {

    const [city, setCity] = useState('서울' );
    const [open, setOpen] = useState(true );

    return (
        <>
            <CitySelector open={open} className={`type-selector`}>

                <div className={'float-right'}>
                    {open ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" onClick={()=>setOpen(false)}
                             stroke="currentColor" className="w-5 h-5 text-[white] mt-1 rounded-full bg-[black] p-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                        </svg>

                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"  onClick={()=>setOpen(true)}
                             stroke="currentColor" className="w-5 h-5 text-[white] mt-1 rounded-full bg-[black] p-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                        </svg>
                    }
                </div>
                <EachCity  city={city==='강원'?true:false} onClick={()=>setCity('강원')}>강원</EachCity>
                <EachCity  city={city==='경기'?true:false} onClick={()=>setCity('경기')}>경기</EachCity>
                <EachCity  city={city==='경남'?true:false} onClick={()=>setCity('경남')}>경상남도</EachCity>
                <EachCity  city={city==='경북'?true:false} onClick={()=>setCity('경북')}>경상북도</EachCity>
                <EachCity  city={city==='광주'?true:false} onClick={()=>setCity('광주')}>광주</EachCity>
                <EachCity  city={city==='대구'?true:false} onClick={()=>setCity('대구')}>대구</EachCity>
                <EachCity  city={city==='부산'?true:false} onClick={()=>setCity('부산')}>부산</EachCity>
                <EachCity  city={city==='서울'?true:false} onClick={()=>setCity('서울')}>서울</EachCity>
                <EachCity  city={city==='세종'?true:false} onClick={()=>setCity('세종')}>세종</EachCity>
                <EachCity  city={city==='울산'?true:false} onClick={()=>setCity('울산')}>울산</EachCity>
                <EachCity  city={city==='인천'?true:false} onClick={()=>setCity('인천')}>인천</EachCity>
                <EachCity  city={city==='전남'?true:false} onClick={()=>setCity('전남')}>전라남도</EachCity>
                <EachCity  city={city==='전북'?true:false} onClick={()=>setCity('전북')}>전라북도</EachCity>
                <EachCity  city={city==='제주'?true:false} onClick={()=>setCity('제주')}>제주</EachCity>
                <EachCity  city={city==='충남'?true:false} onClick={()=>setCity('충남')}>충청남도</EachCity>
                <EachCity  city={city==='충북'?true:false} onClick={()=>setCity('충북')}>충청북도</EachCity>
            </CitySelector>
            <FieldListContainer >
                {data && data._embedded.fieldsResponseDtoList.map(each=>(
                    <EachFiledComponent data={each}/>
                ))}
                {!data &&
                    <Nocontent />
                }
            </FieldListContainer>
        </>
    );
}

export default City;