import React, {useState} from 'react';
import {FieldListContainer} from "../style/style";
import EachFiledComponent from "./sub/EachFiledComponent";
import Nocontent from "../../../components/exception/Nocontent";

function All({data}) {


    return (
        <>
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

export default All;