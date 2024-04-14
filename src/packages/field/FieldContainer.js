import React, {useEffect, useState} from 'react';
import {ActionButton, CategorySection} from "./style/style";
import Create from "./Create";
import List from "./List";
import {useParams} from "react-router-dom";
import Private from "./Private";
import Exp from "./Exp";

function FieldContainer(props) {
    const { action } = useParams();
    const [menu , setMenu] = useState('create' );

    useEffect(()=>{
        if(action)  setMenu(action)
    },[action])

    return (
        <div>
            { menu  === "create" && <Create  />}
            { menu  === "list" && <List  />}
            { menu  === "private" && <Private  />}
            { menu  === "exp" && <Exp  />}
            <CategorySection className={``} >

                <ActionButton clicked={menu==="create"? "true":undefined } onClick={()=>setMenu('create')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="m-auto w-5 h-5 mt-2  mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                    </svg>

                    <p className={`text-[13px] font-light`}>등록</p>
                </ActionButton>
                
                <ActionButton clicked={menu==="list"? "true":undefined } onClick={()=>setMenu('list')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="m-auto w-5 h-5 mt-2  mb-1">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
                    </svg>


                    <p className={`text-[13px] font-light`}>목록</p>
                </ActionButton>
               
                <ActionButton clicked={menu==="private"? "true":undefined} onClick={()=>setMenu('private')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor"  className="m-auto w-4 h-4 mt-2 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                    </svg>

                    <p className={`text-[13px] font-light`}>기록</p>
                </ActionButton>

                <ActionButton clicked={menu==="exp"? "true":undefined} onClick={()=>setMenu('exp')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="m-auto w-4 h-4 mt-2 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/>
                    </svg>

                    <p className={`text-[13px] font-light`}>실험실</p>
                </ActionButton>


            </CategorySection>
        </div>
    );
}

export default FieldContainer;