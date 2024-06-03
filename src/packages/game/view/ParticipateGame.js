import React from 'react';
import {useSelector} from "react-redux";
import CloseRY from '../../../resources/icons/close-ry.png'
function ParticipateGame({data, colth}) {

    const user = useSelector((state) => state.user.user);
    const maxPlayers = 4;
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${maxPlayers}, minmax(0, 1fr))`,
        textAlign: 'center',
        justifyContent: 'center',
        width:colth+'%',
        paddingTop: 10+ colth+'px'
    };

    const expelPlayer =async (id, player)=>{

        if(window.confirm("경기에서 퇴장합니다.")){
            // const response = await expelWarmupGame(id, loginUser, player);
            const response =""
            console.log(player)
            if(response.status==200){
                alert('경기에서 퇴장하였습니다.');
                window.location.reload();
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


    const additionalTagsCount = Math.max(0, maxPlayers - data.players.length);
    return (
        <div className=" m-auto " style={gridStyle}>
            {data.players.map((player,index) => (
                <div  style={{width: colth+'px' , height:colth+'px'}}
                      key={player.id}  >
                    {user &&  parseInt(user.id) === data.host.id ?
                        player.id !== data.host.id &&
                        <img className="expel-player" onClick={()=>expelPlayer(data.id, player)} src={CloseRY}/>
                        :
                        user && parseInt(user.id, 10) === player.id &&
                        <img className="expel-player" onClick={()=>expelPlayer(data.id, player)} src={CloseRY}/>
                    }
                    <div style={{width: colth+'px' , height:colth+'px', lineHeight: colth+'px'}} className='box-shadow warmup-score-each-player-name2'>
                        {player.name.substring(1, 3)}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ParticipateGame;