import React, {useState} from 'react';
import {FieldListContainer} from "../style/style";
import EachFiledComponent from "./sub/EachFiledComponent";
import Nocontent from "../../../components/exception/Nocontent";

function All({data, clicked, checker, setClicked}) {
    return (
        <>
            <FieldListContainer >
                {data && data._embedded && data._embedded.fieldsResponseDtoList.map(each=>(
                    <EachFiledComponent key={'near_'+each.id} checker={checker} data={each}  clicked={clicked} setClicked={setClicked}/>
                ))}
                {(!data || !data._embedded) &&
                    <Nocontent />
                }
            </FieldListContainer>
        </>
    );
}

export default All;