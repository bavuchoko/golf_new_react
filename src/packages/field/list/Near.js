import React, {useState} from 'react';
import {FieldListContainer} from "../style/style";
import EachFiledComponent from "./sub/EachFiledComponent";
import Nocontent from "../../../components/exception/Nocontent";

function Near({data, list, clicked, setClicked}) {
    return (
        <>
            <FieldListContainer >
                {data && data._embedded && data._embedded.fieldsResponseDtoList.map(each=>(
                    <EachFiledComponent key={'near_'+each.id} list={list} data={each}  clicked={clicked} setClicked={setClicked}/>
                ))}
                {(!data || !data._embedded) &&
                    <Nocontent message={'반경 10km 이내에 등록된 경기장이 없습니다.'} />
                }
            </FieldListContainer>
        </>
    );
}

export default Near;