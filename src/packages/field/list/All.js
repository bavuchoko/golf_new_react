import React, {useState} from 'react';
import {FieldListContainer} from "../style/style";
import EachFiledComponent from "./sub/EachFiledComponent";
import Nocontent from "../../../components/exception/Nocontent";

function All({data}) {
    const [clicked, setClicked] =useState(0)

    return (
        <>
            <FieldListContainer >
                {data && data._embedded.fieldsResponseDtoList.map(each=>(
                    <EachFiledComponent key={'near_'+each.id} modify={true} data={each}  clicked={clicked} setClicked={setClicked}/>
                ))}
                {!data &&
                    <Nocontent />
                }
            </FieldListContainer>
        </>
    );
}

export default All;