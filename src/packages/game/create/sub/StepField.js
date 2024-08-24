import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Near from "../../../field/list/Near";
import {getFieldList} from "../../../../api/field/FieldService";
import {EachType, TypeSelector} from "../../../field/style/style";
import {gameCreate} from "../../../../api/game/GameService";

function StepField({setStep, data}) {
    const [clicked, setClicked] =useState({id:0})
    const navigate = useNavigate();

    function startGameHandler (){
        let newData;
        if(clicked.id==0){
            newData = { ...data, field: null };
        }else{
            newData = { ...data, field: {id:clicked.id} };
        }

        gameCreate(newData).then(_=> {
            navigate('/game/' + _.data.id)
        }).finally(()=> {
        });

    }

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
    const [option , setOption] = useState('near' );
    const [field, setField] = useState();
    useEffect(() => {
        getFieldList(search, pageable).then(_ => {
            setField(_.data);
        })
    }, []);

    return (
        <div className={""}>
            <div className="px-[30px] w-full line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={() => {
                        setStep('이름')
                    }}>뒤로</p>
                    <div className={"ml-auto w-[72px]"}>
                        <span className={" text-[#354db0]"} onClick={startGameHandler}>시작하기</span>
                    </div>

                </div>
            </div>

            <>
                <TypeSelector className={`type-selector`}>
                    <EachType  option={option==='all' ? "true":undefined} onClick={()=>setOption('all')}>전체보기</EachType>
                    <EachType  option={option==='near' ? "true":undefined} onClick={()=>setOption('near')}>가까운 곳</EachType>
                    <EachType  option={option==='city' ? "true":undefined} onClick={()=>setOption('city')}>지역별</EachType>
                </TypeSelector>
                <Near data={field} list={true} clicked={clicked} setClicked={setClicked} />
            </>
        </div>
    );
}

export default StepField;