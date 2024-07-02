import React, {useState} from 'react';
import NumberSelector from "../../../components/selectbox/NumberSelector";
import {useSelector} from "react-redux";
import ViewScoreList from "./components/ViewScoreList";
import {Counter, LefterBtn, PlayerDiv, RighterBtn} from "./style/StyleView";
import {nextRound, putScore} from "../../../api/score/ScoreService";
import MemoOnGame from "./components/MemoOnGame";
import {endGame} from "../../../api/game/GameService";


function NowPlaying({data}) {

    const user = useSelector((state) => state.user.user);
    const isHost = user.id===data.host.id
    const [showCurrentRound, setShowCurrentRound] = useState(true);
    const [clickedHole, setClickedHole] = useState({
        course:1,
        hole:1
    });

    function findMaxRoundInfo() {
        const maxRound = Math.max(...data.sheets.map(sheet => sheet.round));
        const maxRoundSheets = data.sheets.filter(sheet => sheet.round === maxRound);
        return {maxRound, maxRoundSheets};
    }

    const initialClickedPlayer = () => {
        if (!data.sheets || data.sheets.length === 0) {
            return {};
        }

        // 가장 큰 round 값 찾기
        const {maxRound, maxRoundSheets} = findMaxRoundInfo();

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
            playerHits[playerId].sheet = record;
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

    function isZeroHitPlayerExist() {
        // 가장 큰 round 값 찾기
        const {maxRound, maxRoundSheets} = findMaxRoundInfo();
        const playerWithZeroHit = maxRoundSheets.some(e=> e.hit<=0 )
        return playerWithZeroHit;
    }

    function progressRound(id) {
        nextRound(id).then(_ => {

        })
    }
    function endThisGame(id) {
        endGame(id).then(_ => {

        })
    }

    const nextRoundHandler =()=>{
        if(isZeroHitPlayerExist()) {
            if (isHost) {
                if (window.confirm("입력되지 않은 사람이 있습니다. 진행하시겠습니까")) {
                    progressRound(data.id);
                }
            }
        }else{
            if (window.confirm("다음 홀 진행하시겠습니까")) {
                progressRound(data.id);
            }
        }
    }


    const endGameHandler =()=>{

        if(isZeroHitPlayerExist()) {
            if (isHost) {
                if (window.confirm("입력되지 않은 사람이 있습니다. 종료하시겠습니까")) {
                    endThisGame(data.id);
                }
            }
        }else{
            if (window.confirm("종료합니다")) {
                endThisGame(data.id);
            }
        }
    }




    return (
        <>

            {/*점수목록*/}
            <ViewScoreList sheets={data.sheets} players={data.players} isHost={isHost} showCurrentRound={showCurrentRound} setShowCurrentRound={setShowCurrentRound} setClickedHole={setClickedHole}/>


            {/*메모관리*/}
            <MemoOnGame isHost={isHost} field={data.field ?? undefined} selected={clickedHole} />

            {isHost &&
                <Counter>
                    <LefterBtn onClick={putScoreHandler}>입력</LefterBtn>
                    <NumberSelector limit={{upper:10, under:0}} number={clickedPlayer.hit} setNumber={scoreChangeHandler}/>
                    <RighterBtn onClick={nextRoundHandler}>다음</RighterBtn>
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