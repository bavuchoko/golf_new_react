import React, {useState} from 'react';
import {FieldListContainer} from "../style/style";
import EachFiledComponent from "./sub/EachFiledComponent";
import Nocontent from "../../../components/exception/Nocontent";

function All(props) {

    const [data, setData] =useState();

    return (
        <>
            <FieldListContainer >
                {data && data.map(each=>{
                    <EachFiledComponent data={each}/>
                })}
                {!data &&
                    <Nocontent />
                }
            </FieldListContainer>

        </>
    );
}

export default All;