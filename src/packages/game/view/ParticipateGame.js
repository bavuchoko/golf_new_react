import React, {useState} from 'react';
import {useSelector} from "react-redux";
import CloseRY from '../../../resources/icons/close-ry.png'
import Empty from '../../../resources/icons/emptyuser.png'
import SliderShowButton from "../../../components/slide/SliderShowButton";
import {enrollGame, expelPlayer, startGame} from "../../../api/game/GameService";
import {BackPressButton} from "./style/StyleView";
import {Link, useNavigate} from "react-router-dom";
import HomeHeader from "../../../layout/header/HomeHeader";
import menu from "../../../resources/icons/menu.png";
import SlideMenu from "../../../layout/menu/SlideMenu";


function ParticipateGame({data, width, user}) {
    const isHost = user.id===data.host.id
    const maxPlayers = 4;
    const navigate =useNavigate();
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${maxPlayers}, minmax(0, 1fr))`,
        textAlign: 'center',
        justifyContent: 'center',
        width:'calc(100% - 20px)',
        paddingTop: '5rem',
    };

    const startHandler =()=>{
        if(window.confirm("경기를 시작합니다.")){
            startGame(data.id, 1).then(_ =>{
            })
        }
    }

    const expelPlayerHandler =(gameId, playerId, playerName)=>{
        let message =playerId===user.id?  '퇴장하시겠습니까 ?' : `${playerName} 을 퇴장시키겠습니까?`
        if(window.confirm(` ${message}`))
            expelPlayer(gameId,playerId).then(_=>{
                if(_.status ===200){

                }
            })
    }

    const additionalTagsCount = Math.max(0, maxPlayers - data.players.length);
    return (
        <>
            {isHost &&
                <div className="px-[30px] w-full line-h-40 py-[5px] line-h-50 h-[55px] z-999 fixed top-0 bg-white">
                    <div className="inline-block w-[100%] flex h-[50px]">
                        <p onClick={() => {
                            navigate(-1)
                        }}>뒤로</p>
                        <div className={"ml-auto w-[72px]"}>
                            <span className={" text-[#354db0]"} onClick={startHandler}>시작하기</span>
                        </div>
                    </div>
                </div>
            }
            <div className=" m-auto h-[200px] " style={gridStyle}>
                {data.players.map((player, index) => (
                    <div className={`m-auto`} style={{width: width + 'px', height: width + 'px'}}
                         key={player.id}>
                        {user && parseInt(user.id) === data.host.id ?
                            player.id !== data.host.id &&
                            <img className="expel-player bg-gray-each"
                                 onClick={() => expelPlayerHandler(data.id, player.id, player.name)} src={CloseRY}/>
                            :
                            user && parseInt(user.id, 10) === player.id &&
                            <img className="expel-player" onClick={() => expelPlayerHandler(data.id, player.id, player.name)} src={CloseRY}/>
                        }
                        <div style={{width: width + 'px', height: width + 'px', lineHeight: width + 'px'}}
                             className='box-shadow each-player'>
                            {player.name.length >2 ? player.name.substring(1, 3) : player.name}
                        </div>
                    </div>
                ))}

                {/* 부족한 플레이어 수만큼 추가 태그 생성 */}
                {data.status === 'OPEN' && user &&
                    Array.from({length: additionalTagsCount}).map((_, index) => {
                        const isUserInGame = data.players.some(player => player.id === parseInt(user.id, 10));
                        if (!isUserInGame) {
                            return (
                                <div style={{width: width + 'px', height: width + 'px'}}
                                     className="m-auto empty-user cursor" onClick={() => enrollGame(data.id)}
                                     key={`empty-${index}`}>
                                    <img style={{width: width + 'px'}} className="box-shadow m-auto inline-block"
                                         src={Empty}/>
                                </div>
                            );
                        }
                        return null;
                    })
                }
            </div>
        </>
    );
}

export default ParticipateGame;