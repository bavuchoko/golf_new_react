import React from 'react';
import {useSelector} from "react-redux";
import CloseRY from '../../../resources/icons/close-ry.png'
import Empty from '../../../resources/icons/emptyuser.png'
import SliderShowButton from "../../../components/slide/SliderShowButton";
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

    const expelPlayer =async (id, player)=>{

        if(window.confirm("경기에서 퇴장합니다.")){
            // const response = await expelWarmupGame(id, loginUser, player);
            const response =""
            if(response.status==200){
                alert('경기에서 퇴장하였습니다.');
            }else{
                const message = response.response.data.message;
                console.log(message)
                if(message=='selfExpelAllowedException'){
                    alert('본인만 퇴장할 수 있습니다.')
                }else if (message == 'hostExpelException') {
                    alert('호스트는 퇴장할 수 없습니다.')
                }else if (message == 'hostExpelException') {
                    alert('경기 시작 전에만 퇴장할 수 있습니다.')
                }
            }
        }
    }

    const joinGame =async (id) => {
        if(window.confirm("경기에 참가합니다.")){
            // data.players.filter(player =>{player.id === user.id})
            // const response = await joinWarmupGame(id, loginUser);
            const response =""
            if(response.status==200){
                alert('참가하였습니다.');
                window.location.reload();
            }else{
                const message = response.response.data.message;
                if(message=='Already Enrolled'){
                    alert('이미 참가중입니다.')
                }
            }
        }
    }

    const additionalTagsCount = Math.max(0, maxPlayers - data.players.length);
    return (
        <>
            <div className=" m-auto h-[200px] " style={gridStyle}>
                {data.players.map((player, index) => (
                    <div className={`m-auto`} style={{width: width + 'px', height: width + 'px'}}
                         key={player.id}>
                        {user && parseInt(user.id) === data.host.id ?
                            player.id !== data.host.id &&
                            <img className="expel-player" onClick={() => expelPlayer(data.id, player)} src={CloseRY}/>
                            :
                            user && parseInt(user.id, 10) === player.id &&
                            <img className="expel-player" onClick={() => expelPlayer(data.id, player)} src={CloseRY}/>
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
                                     className="m-auto empty-user cursor" onClick={() => joinGame(data.id)}
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
            <div className={`absolute bottom-4 w-full p-5`}>
                <SliderShowButton expose={0}/>
            </div>
        </>
    );
}

export default ParticipateGame;