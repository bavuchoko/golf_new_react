import React, {useState} from 'react';
import {FieldListContainer} from "../style/style";
import EachFiledComponent from "./sub/EachFiledComponent";
import Nocontent from "../../../components/exception/Nocontent";

function Near({data, list, clicked, setClicked}) {

    return (
        <>
            <FieldListContainer >
                {data && data._embedded.fieldsResponseDtoList.map(each=>(
                    <EachFiledComponent key={'near_'+each.id} list={list} data={each}  clicked={clicked} setClicked={setClicked}/>
                ))}
                {!data &&
                    <Nocontent />
                }
            </FieldListContainer>
        </>
    );
}

export default Near;