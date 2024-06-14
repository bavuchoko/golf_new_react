import React, {useState} from 'react';
import NumberSelector from "../../../components/selectbox/NumberSelector";
import {useSelector} from "react-redux";
import ViewScoreList from "./components/ViewScoreList";



function NowPlaying({data}) {

    const user = useSelector((state) => state.user.user);
    const isHost = user.id===data.host.id
    const [showCurrentRound, setShowCurrentRound] = useState(true);

    const playerHits = {};
    data.sheets.forEach(record => {
        const playerId = record.player.id;
        const playerName = record.player.name;
        const hit = record.hit;
        if (playerHits[playerId]) {
            playerHits[playerId].totalHits += hit;
        } else {
            playerHits[playerId] = {
                name: playerName,
                totalHits: hit
            };
        }
    });
    const playerHitsArray = Object.values(playerHits);


    const scoreChangeHandler =(value)=>{
        setClickedPlayer(prevState => ({
            ...prevState,
            hit: value
        }))
    }





    const playerClickHandler =()=>{
        if(isHost){

        }
    }

    return (
        <>

            {/*점수목록*/}
            <ViewScoreList data={data} isHost={isHost} showCurrentRound={showCurrentRound} setShowCurrentRound={setShowCurrentRound} />

            {isHost &&
            <Counter>
                <LefterBtn>입력</LefterBtn>
                <NumberSelector limit={10} number={clickedPlayer.hit} setNumber={scoreChangeHandler}/>
                <RighterBtn>다음</RighterBtn>
            </Counter>
            }

            <div className={`grid grid-cols-4 gap-1`}>
                {playerHitsArray.map(player => (
                    <PlayerDiv key={player.name} clicked={player.id===clickedPlayer.player.id} onClick={()=>playerClickHandler(player.sheet)}>
                        <p className={`font-bold ${player.id===clickedPlayer.player.id? 'text-[18px] h-[30px] line-h-30 ': 'text-[14px] h-[40px] line-h-40 '} `}> {player.totalHits}</p>
                        <p className={` ${player.id===clickedPlayer.player.id? 'text-[18px] h-[40px]': 'text-[14px] h-[30px]'}`}> {player.name}</p>
                    </PlayerDiv>
                ))}
            </div>
        </>
    );
}

export default NowPlaying;