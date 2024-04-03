import React from 'react';
import {Link} from "react-router-dom";
import {Child, Parent} from "./style/MenuStyle";


function SlideMenuSub({each, setOpen, openParent, setOpenParent}) {


    const openHandler = (id) => {
        setOpenParent(openParent === id ? null : id)
    };

    return (
        <>
            <Parent key={each.id}  onClick={() => openHandler(each.id)} ><Link to={each.link ? each.link: '#'}  className={``} onClick={()=>openHandler()} > {each.title}</Link>
                {each.children.length>1 &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="absolute right font-bold top-10 inline-block ml-auto w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                    </svg>
                }
            </Parent>


            {openParent  === each.id && each.children.map((child) => (
                <Child isopen={openParent === each.id ?'true':'false'} className={'sub-list'} key={child.id}>
                    <Link to={child.link} onClick={() => setOpen(false)}>
                        {child.title}
                    </Link>
                </Child>
            ))}
        </>
    );
}

export default SlideMenuSub;