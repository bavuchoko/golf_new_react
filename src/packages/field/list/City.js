import React from 'react';
import {FieldListContainer} from "../style/style";
import EachFiledComponent from "./sub/EachFiledComponent";
import Nocontent from "../../../components/exception/Nocontent";
import TypeSelectBox from "../../../components/selectbox/TypeSelectBox";

function City({data, checker, clicked, setClicked, select, setSelect}) {

    const city=[
        {id:0, value:null, label:'전체'},
        {id:1, value:'경기', label:'경기'},
        {id:2, value:'경남', label:'경남'},
        {id:3, value:'경북', label:'경북'},
        {id:4, value:'광주', label:'광주'},
        {id:5, value:'대구', label:'대구'},
        {id:6, value:'부산', label:'부산'},
        {id:7, value:'서울', label:'서울'},
        {id:8, value:'세종특별자치시', label:'세종'},
        {id:9, value:'울산', label:'울산'},
        {id:10, value:'인천', label:'인천'},
        {id:11, value:'전남', label:'전남'},
        {id:12, value:'전북', label:'전북'},
        {id:13, value:'제주', label:'제주'},
        {id:14, value:'충남', label:'충남'},
        {id:15, value:'충북', label:'충북'},
    ]

    return (
        <>
            <div className={`px-[30px] bg-[#f1f1f1]`}>
            <TypeSelectBox  height={400} options={city} select={select} setSelect={setSelect}/>
            </div>
            <FieldListContainer >
                {data && data._embedded && data._embedded.fieldsResponseDtoList.map(each=>(
                    <EachFiledComponent key={'city_'+each.id} checker={checker} data={each}  clicked={clicked} setClicked={setClicked}/>
                ))}
                {(!data || !data._embedded) &&
                    <Nocontent />
                }
            </FieldListContainer>
        </>
    );
}

export default City;