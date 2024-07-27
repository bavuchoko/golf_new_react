import React, {useState} from 'react';
import Trash from '../../resources/icons/trash_can.png'

function Delete_Slide_Btn({listener, auth}) {
    return (
        <button
            style={{
                position: 'absolute',
                zIndex: "5",
                width: "70px",
                height: 'calc(100% - 2px)',
                background : `${auth? 'red':'gray'}`,
                top: '50%',
                right: "-35px",
                transform: 'translate(-50%, -50%)',
                color: 'white',
                cursor: 'pointer',
            }}
            onClick={()=>{if(auth)listener()}}
        >
            <img src={Trash} className={'m-auto w-[30px] h-[30px]'}/>
        </button>
    );
}

export default Delete_Slide_Btn;