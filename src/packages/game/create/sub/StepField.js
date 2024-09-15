import React, {useEffect, useState} from 'react';
import {getFieldList} from "../../../../api/field/FieldService";
import {SimpleEachField, SimpleFieldListContainer} from "../../../field/style/style";
import Nocontent from "../../../../components/exception/Nocontent";
import Check from '../../../../resources/icons/check-icon.png'

function StepField({field, setField, setHidden}) {
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
        <div className={"mt-[0px]"}>
            <div className={`flex px-[30px] my-[10px] ${field && field.id ? 'hidden' :''}`}>

                <p className={`text-left my-[10px] w-[88px] active:font-bold inline-block`} onClick={()=>{
                    fieldHiddenHandler(false)
                    setHidden(false)
                }}>
                    구장선택
                    {!fieldHidden &&
                        <img src={Check} className={`ml-[5px] inline-block w-[20px] mb-[3px]`}/>
                    }
                </p>

                <p className={`text-right my-[10px] w-[88px] ml-auto active:font-bold`} onClick={() => {
                    fieldHiddenHandler(true)
                    setHidden(true)
                }}
                    >
                    선택안함
                    {fieldHidden &&
                    <img src={Check} className={`ml-[5px] inline-block w-[20px] mb-[3px]`}/>
                    }
                </p>


            </div>
            <SimpleFieldListContainer>
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