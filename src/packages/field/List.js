import React, {useEffect, useState} from 'react';
import useGeolocation from "react-hook-geolocation";
import {EachType, TypeSelector} from "./style/style";
import Near from "./list/Near";
import City from "./list/City";
import All from "./list/All";
import {getFieldList, getNearFieldList} from "../../api/field/FieldService";

function List(props) {
    const [data, setData] = useState();
    const [clicked, setClicked] =useState({id:0})
    const [option , setOption] = useState('near' );
    const [select, setSelect] = useState({
        value:null,
        label:'전체'
    });

    const initSearch={searchTxt:""}
    const [search, setSearch] =useState(initSearch);
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
            if (option === 'near' && navigator.geolocation) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 10000, // 10초 대기
                        maximumAge: 300000 // 최근 5분 이내의 위치 정보 사용
                    });
                }).catch(error => {
                    console.error("Geolocation error: ", error);
                    alert('위치서비스 권한설정이 필요합니다.')
                });

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                response = await getNearFieldList(search, pageable, latitude, longitude);
            } else {
                console.log(`search : ${search.city}`)
                // 일반 검색 함수 호출
                response = await getFieldList(search, pageable);
            }
            if(response.status===200){
                response.data.option = option;
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
    }, [pageable.page, search]);

    useEffect(() => {
        setSearch((prev) => {
            if (select.value === null) {
                const {city, ...rest} = prev;
                return rest;
            } else {
                return {
                    ...prev,
                    city: select.value
                };
            }
            getList();
        })
    }, [select]);

    useEffect(() => {
        setSearch(initSearch)
    }, [option]);


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
                { option  === "city" && <City data={data} clicked={clicked} setClicked={setClicked} select={select} setSelect={setSelect}/>}
            </>
        </div>
    );
}

export default List;