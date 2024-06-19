import React, {useState} from 'react';
import NumberSelector from "../../../components/selectbox/NumberSelector";
import {useSelector} from "react-redux";
import ViewScoreList from "./components/ViewScoreList";
import {
    Counter,
    LefterBtn,
    MemoContainer, MemoContent,
    MemoController,
    MemoControllerPointer,
    PlayerDiv,
    RighterBtn
} from "./style/StyleView";
import {putScore} from "../../../api/score/ScoreService";
import MemoOnGame from "./components/MemoOnGame";


function NowPlaying({data}) {

    const user = useSelector((state) => state.user.user);
    const isHost = user.id===data.host.id
    const [up, setUp] =useState(false);
    const [showCurrentRound, setShowCurrentRound] = useState(true);
    const initialClickedPlayer = () => {
        if (!data.sheets || data.sheets.length === 0) {
            return {};
        }

        // 가장 큰 round 값 찾기
        const maxRound = Math.max(...data.sheets.map(sheet => sheet.round));
        const maxRoundSheets = data.sheets.filter(sheet => sheet.round === maxRound);

        // round-1의 요소 찾기
        const roundMinusOne = maxRound - 1;
        const roundMinusOneSheets = data.sheets.filter(sheet => sheet.round === roundMinusOne);

        // 조건에 맞는 요소 찾기
        let selectedSheet;
        if (roundMinusOneSheets.length > 0) {
            // 최저 hit 찾기
            const minHit = Math.min(...roundMinusOneSheets.map(sheet => sheet.hit));
            // 최저 hit를 가진 요소들 찾기
            const minHitSheets = roundMinusOneSheets.filter(sheet => sheet.hit === minHit);
            // id가 가장 작은 요소 선택
            selectedSheet = minHitSheets.reduce((prev, current) => (prev.player.id < current.player.id ? prev : current));
        } else {
            selectedSheet = maxRoundSheets.reduce((prev, current) => (prev.player.id < current.player.id ? prev : current));
        }

        return selectedSheet;
    };

    const [clickedPlayer, setClickedPlayer] = useState(initialClickedPlayer);

    const playerHits = {};
    data.sheets.forEach(record => {
        const playerId = record.player.id;
        const playerName = record.player.name;
        const hit = record.hit;
        if (playerHits[playerId]) {
            playerHits[playerId].totalHits += hit;
        } else {
            playerHits[playerId] = {
                id:playerId,
                name: playerName,
                totalHits: hit,
                sheet :record
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




    const playerClickHandler =(sheet)=>{
        if(isHost){
            setClickedPlayer(sheet)
        }
    }

    const putScoreHandler =()=>{
        if(isHost){
            putScore(data.id, clickedPlayer).then(_=>{
                console.log(_)
            })
        }
    }

    return (
        <>

            {/*점수목록*/}
            <ViewScoreList data={data} isHost={isHost} showCurrentRound={showCurrentRound} setShowCurrentRound={setShowCurrentRound} />

            <MemoOnGame up={up} setUp={setUp} isHost={isHost}/>

            {isHost &&
                <Counter>
                    <LefterBtn onClick={putScoreHandler}>입력</LefterBtn>
                    <NumberSelector limit={10} number={clickedPlayer.hit} setNumber={scoreChangeHandler}/>
                <RighterBtn>다음</RighterBtn>
            </Counter>
            }

            <div className={`grid grid-cols-4 gap-1`}>
                {playerHitsArray.map(player => (
                    <PlayerDiv key={player.name} clicked={isHost && player.id===clickedPlayer.player.id} onClick={()=>playerClickHandler(player.sheet)}>
                        <p className={`font-bold ${isHost && player.id===clickedPlayer.player.id? 'text-[18px] h-[30px] line-h-30 ': 'text-[14px] h-[40px] line-h-40 '} `}> {player.totalHits}</p>
                        <p className={` ${isHost && player.id===clickedPlayer.player.id? 'text-[18px] h-[40px]': 'text-[14px] h-[30px]'}`}> {player.name}</p>
                    </PlayerDiv>
                ))}
            </div>
        </>
    );
}

export default NowPlaying;