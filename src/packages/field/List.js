import React, {useEffect, useState} from 'react';
import useGeolocation from "react-hook-geolocation";
import {EachType, TypeSelector} from "./style/style";
import Near from "./list/Near";
import City from "./list/City";
import All from "./list/All";
import {getFieldList} from "../../api/field/FieldService";

function List(props) {
    const geolocation = useGeolocation();
    const latitude = geolocation.latitude
    const longitude = geolocation.longitude
    const [data, setData] = useState();
    const [clicked, setClicked] =useState({id:0})
    const [search, setSearch] =useState({
        searchTxt:"",
        city:"전체"
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
            const response = await getFieldList(search, pageable);
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
        }finally {
        }
    }
    useEffect(() => {
        getList();
    }, [pageable.page]);
    const [option , setOption] = useState('near' );

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