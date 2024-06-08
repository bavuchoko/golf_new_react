import React from 'react';
import {useSelector} from "react-redux";
import CloseRY from '../../../resources/icons/close-ry.png'
import Empty from '../../../resources/icons/emptyuser.png'
import SliderShowButton from "../../../components/slide/SliderShowButton";
import {enrollGame, expelPlayer} from "../../../api/game/GameService";
function ParticipateGame({data, width}) {

    const user = useSelector((state) => state.user.user);
    const maxPlayers = 4;
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${maxPlayers}, minmax(0, 1fr))`,
        textAlign: 'center',
        justifyContent: 'center',
        width:'calc(100% - 20px)',
        paddingTop: '5rem',
    };


    const additionalTagsCount = Math.max(0, maxPlayers - data.players.length);
    return (
        <>
            <div className=" m-auto h-[200px] " style={gridStyle}>
                {data.players.map((player, index) => (
                    <div className={`m-auto`} style={{width: width + 'px', height: width + 'px'}}
                         key={player.id}>
                        {user && parseInt(user.id) === data.host.id ?
                            player.id !== data.host.id &&
                            <img className="expel-player" onClick={() => expelPlayer(data.id, player.id)} src={CloseRY}/>
                            :
                            user && parseInt(user.id, 10) === player.id &&
                            <img className="expel-player" onClick={() => expelPlayer(data.id, player.id)} src={CloseRY}/>
                        }
                        <div style={{width: width + 'px', height: width + 'px', lineHeight: width + 'px'}}
                             className='box-shadow each-player'>
                            {player.name.substring(1, 3)}
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

            {user && parseInt(user.id) === data.host.id && data.status==="OPEN" &&
            <div className={`absolute bottom-0 w-full p-5 border`}
                 style={{
                     // background: 'linear-gradient(#e66465, #9198e5)',
                     lineHeight: '60px',
                     boxShadow: '2px 2px 10px #f4f4f4'
                 }}>
                <SliderShowButton expose={0}/>
            </div>
            }

        </>
    );
}

export default ParticipateGame;