import React, {useEffect, useState} from 'react';
import useGeolocation from "react-hook-geolocation";
import {EachType, TypeSelector} from "./style/style";
import Near from "./list/Near";
import City from "./list/City";
import All from "./list/All";
import {getFieldList, getNearFieldList} from "../../api/field/FieldService";

function List(props) {
    const geolocation = useGeolocation();
    const latitude = geolocation.latitude
    const longitude = geolocation.longitude
    const [data, setData] = useState();
    const [clicked, setClicked] =useState({id:0})
    const [option , setOption] = useState('near' );

    const [search, setSearch] =useState({
        searchTxt:"",
        city:"전체",
        option:option
    });
    const [pageable, setPageable] =useState({
        sort:"name",
        desc:true,
        size:10,
        totalElements:0,
        totalPages:0,
        page:0
    });

    async function getList() {

        try {
            let response = null;
                console.log(option)
            if (option === 'near' && navigator.geolocation) {
                console.log("aaaaaa")
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 10000, // 10초 대기
                        maximumAge: 300000 // 최근 5분 이내의 위치 정보 사용
                    });
                }).catch(error => {
                    console.error("Geolocation error: ", error);
                });
                console.log(position)

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                response = await getNearFieldList(search, pageable, latitude, longitude);
            } else {
                console.log("ccc")
                // 일반 검색 함수 호출
                response = await getFieldList(search, pageable);
            }
            console.log(response)
            if(response.status===200){
                response.data.option = option;
                console.log(response)
                setData(response.data);
                setPageable((prevState) => ({
                    ...prevState,
                    totalElements: response.data.totalElements,
                    totalPages: response.data.totalPages,
                }));
            }
        } catch (error) {
            console.log(error)
        }finally {
        }
    }
    useEffect(() => {
        getList();
    }, [pageable.page, option]);


    return (
        <div className={``}>
            <TypeSelector className={`type-selector`}>
                <EachType  option={option==='all' ? "true":undefined} onClick={()=>setOption('all')}>전체보기</EachType>
                <EachType  option={option==='near' ? "true":undefined} onClick={()=>setOption('near')}>가까운 곳</EachType>
                <EachType  option={option==='city' ? "true":undefined} onClick={()=>setOption('city')}>지역별</EachType>
            </TypeSelector>
            <>
                { option  === "all" && <All data={data} clicked={clicked} setClicked={setClicked}/>}
                { option  === "near" && <Near data={data} clicked={clicked} setClicked={setClicked} />}
                { option  === "city" && <City data={data} clicked={clicked} setClicked={setClicked} select={search.city} setSelect={setSearch}/>}
            </>
        </div>
    );
}

export default List;