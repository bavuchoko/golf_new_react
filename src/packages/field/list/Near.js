import React from 'react';
import {FieldListContainer} from "../style/style";
import EachFiledComponent from "./sub/EachFiledComponent";
import Nocontent from "../../../components/exception/Nocontent";
import {useState} from "react";

function Near(props) {

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

export default Near;