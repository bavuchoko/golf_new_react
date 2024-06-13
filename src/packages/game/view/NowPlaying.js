import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styled, {keyframes } from "styled-components";
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


    const Counter = styled.div`
        display: flex;
        border: 1px solid #d5d5d5;
        margin-bottom: 5px;
        width: 100%;
        height: 140px;
    `;

    const PlayerDiv = styled.div`
        text-align: center;
        border: 1px solid #d5d5d5;
        height: 70px;
    `;
    const LefterBtn = styled.button`
        padding: 0 10px;
        background: #37af29;
        text-align: center;
        border: 1px solid #d5d5d5;
        height: 140px;
        width: calc(50% - 75px);
    `;
    const RighterBtn = styled.button`
        padding: 0 10px;
        background: #37af29;
        text-align: center;
        border: 1px solid #d5d5d5;
        height: 140px;
        width: calc(50% - 75px);
    `;




    const playerClickHandler =()=>{
        if(isHost){

        }
    }

    console.log(showCurrentRound)
    return (
        <>

            {/*점수목록*/}
            <ViewScoreList data={data} isHost={isHost} showCurrentRound={showCurrentRound} setShowCurrentRound={setShowCurrentRound} />

            {isHost &&
            <Counter>
                <LefterBtn>좌버튼</LefterBtn>
                <NumberSelector limit={10} number={3} setNumber={() => console.log()}/>
                <RighterBtn>우버튼</RighterBtn>
            </Counter>
            }

            <div className={`grid grid-cols-4 gap-1`}>
                {playerHitsArray.map(player => (
                    <PlayerDiv key={player.name} onClick={playerClickHandler}>
                        <p className={`font-bold h-[40px] line-h-40`}> {player.totalHits}</p>
                        <p className={`small-font-size  h-[30px]`}> {player.name}</p>
                    </PlayerDiv>
                ))}
            </div>
        </>
    );
}

export default NowPlaying;