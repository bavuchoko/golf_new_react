import React, {useEffect, useState} from 'react';
import {getFieldList} from "../../../../api/field/FieldService";
import {SimpleEachField, SimpleFieldListContainer} from "../../../field/style/style";
import Nocontent from "../../../../components/exception/Nocontent";

function StepField({field, setField, setStep}) {
    const initSearch={searchTxt:""}
    const [search, setSearch] =useState(initSearch);
    const [fieldHidden, setFieldHidden] =useState(true)
    const [pageable, setPageable] =useState({
        sort:"name",
        desc:true,
        size:10,
        totalElements:0,
        totalPages:0,
        page:0
    });
    const [option , setOption] = useState('near' );

    const [fields, setFields] = useState();
    useEffect(() => {
        getFieldList(search, pageable).then(_ => {
            setFields(_.data);
        })
    }, []);

    const clickHandler =(id)=>{
        if (id===field?.id) {
            setField(null)
        }
        else {
            setField({id:id})
        }
    }


    const fieldHiddenHandler =(value)=>{
        setField(null)
        setFieldHidden(value)
    }

    return (
        <div className={""}>
            <div className={`flex px-[30px] ${field && field.id ? 'hidden' :''}`}>
                <p className={`text-left my-[10px] w-[80px] active:bg-amber-300`} onClick={()=>fieldHiddenHandler(false)}>경기장선택</p>
                <p className={`text-right my-[10px] w-[80px] ml-auto active:bg-amber-300`} onClick={()=>fieldHiddenHandler(true)}>선택안함</p>
                {/*<p>선택암함</p>*/}
            </div>
            <SimpleFieldListContainer >
                {fields && fields._embedded && fields._embedded.fieldsResponseDtoList.map(each=>(
                    <SimpleEachField
                        selected={(!fieldHidden  && (field == null || (field !==null && field.id ==each.id))) ? true : undefined}  onClick={()=>clickHandler(each.id)}>
                        <div className={`w-full`}>
                            <div className={`flex w-full`}>
                                <p className={`text-[16px] shrink-word`}>[{each.city}] {each.name ? each.name : '경기장 명'}</p>
                                <p className={`ml-auto text-center `}>{each.holes} 홀</p>
                            </div>
                        </div>
                    </SimpleEachField>
                ))}


                {(!fields || !fields._embedded) &&
                    <Nocontent />
                }
            </SimpleFieldListContainer>
        </div>
    );
}

export default StepField;