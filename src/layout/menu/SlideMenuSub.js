import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";


const Parent = styled.li`
  font-size: 18px;
  margin-top: 30px;
  font-weight: bold;
  height: 30px;
  width: 100%;
  cursor: pointer;
  position: relative;
  
`;
const Child = styled.li`
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0px')};
  width: 100%;
  font-size: 15px;
  text-indent: 7px;
  margin-bottom:${({ isOpen }) => (isOpen ? '15px' : '0px')};
  margin-top:${({ isOpen }) => (isOpen ? '15px' : '0px')};
  overflow: hidden;
  transition: 0.35s ease;
  cursor: pointer
`;

function SlideMenuSub({each, setOpen, openParent, setOpenParent}) {


    const openHandler = (id) => {
        setOpenParent(openParent === id ? null : id)
    };

    return (
        <>
            <Parent key={each.id}  onClick={() => openHandler(each.id)} ><Link to={each.link ? each.link: '#'}  className={``} onClick={()=>openHandler()} > {each.title}</Link>
                {each.children.length>1 &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="absolute right font-bold top-10 inline-block ml-auto w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                    </svg>
                }
            </Parent>


            {openParent  === each.id && each.children.map((child) => (
                <Child isOpen={openParent === each.id} parent={each.id} className={'sub-list'} key={child.id}>
                    <Link to={child.link} onClick={() => setOpen(false)}>
                        {child.title}
                    </Link>
                </Child>
            ))}
        </>
    );
}

export default SlideMenuSub;