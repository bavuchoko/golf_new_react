import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";
import NumberSelector from "../../../components/selectbox/NumberSelector";



function NowPlaying({data}) {
    let vh = 0;

    useEffect(() => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);
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

    const ScoreList = styled.div`
        text-align: center;
        border: 1px solid #d5d5d5;
        margin-bottom: 5px;
        height: calc(var(--vh, 1vh) * 100 - 280px);
    `;

    const ScoreListContainer = styled.div`
        text-align: center;
        border: 1px solid #d5d5d5;
        margin-bottom: 5px;
        background: #5c5c88;
        overflow-y: auto;
        height: calc(var(--vh, 1vh) * 100 - 330px);
    `;

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

    }

    return (
        <>

            {/*점수목록*/}
            <ScoreList>
                <div className={`flex h-[50px] line-h-50 justify-center w-full`}>
                    <div className={`w-[120px] text-left`}>현재 라운드</div>
                    <div className={`splicer h-[30px] mt-[10px]`}/>
                    <div className={`w-[120px] text-right`}>점수보기</div>
                </div>
                <ScoreListContainer>목록컨테이너</ScoreListContainer>
            </ScoreList>

            {/*점수 입력 카운터 */}
            <Counter>
                <LefterBtn >좌버튼</LefterBtn>
                <NumberSelector limit={10} number={3} setNumber={()=>console.log()}/>
                <RighterBtn >우버튼</RighterBtn>
            </Counter>

            {/*선수선택창*/}
            <div className={`grid grid-cols-4 gap-1`}>
                {playerHitsArray.map(player => (
                    <PlayerDiv key={player.name} onClick={playerClickHandler}>
                        <p className={`font-bold h-[40px] line-h-40`} > {player.totalHits}</p>
                        <p className={`small-font-size  h-[30px]`} > {player.name}</p>
                    </PlayerDiv>
                ))}
            </div>
        </>
    );
}

export default NowPlaying;