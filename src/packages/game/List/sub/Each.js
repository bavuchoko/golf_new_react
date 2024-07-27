import React from 'react';
import {useNavigate} from "react-router-dom";



function Each({each}) {

    const navigate = useNavigate();


    return (
        <div className={`game-each`} key={each.id}
             onClick={() => {
                 if (each.status === 'END') navigate(`score/${each.id}`)
                 else navigate(`${each.id}`)
             }}>
            <div className={"flex"}>
                <div className={`h-[30px] text-[14px]`}>
                    {each.status === 'OPEN' &&
                        <span className={`game-each-status open`}>참가중</span>}
                    {each.status === 'PLAYING' &&
                        <span className={`game-each-status playing`}>경기중</span>}
                    {each.status === 'END' &&
                        <span className={`game-each-status end`}>종료됨</span>}

                    <span>{each.field ? each.field.name : '정보 없음'}</span>
                    <span className={'vertical-slicer'}/>
                    <span className={``}>{each.field ? each.field.address : ''}</span>
                </div>

            </div>
            <div className={`w-full flex`}>
                <div>
                    <span>{each.host.name}</span>
                </div>
                <div className={`flex ml-auto game-each-users`}
                     style={{width: `${each.players.length * 40}px`}}>
                    {each.players.map(user => (
                        <div key={user.id}
                             className={`game-each-user-each`}>{user.name.substring(user.name.length - 2, user.name.length)}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Each;