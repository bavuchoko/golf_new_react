import React, {useState} from 'react';
import NumberSelector from "../../../components/selectbox/NumberSelector";
import {useSelector} from "react-redux";
import ViewScoreList from "./components/ViewScoreList";
import {BackPressButton, Counter, EndBtn, LefterBtn, PlayerDiv, RighterBtn} from "./style/StyleView";
import {nextRound, putScore} from "../../../api/score/ScoreService";
import MemoOnGame from "./components/MemoOnGame";
import {endGame} from "../../../api/game/GameService";
import {useNavigate} from "react-router-dom";
import HomeHeader from "../../../layout/header/HomeHeader";


function NowPlaying({data, user}) {

    const navigate =useNavigate();
    const isHost = user.id===data.host.id
    const [showCurrentRound, setShowCurrentRound] = useState(true);
    const [clickedHole, setClickedHole] = useState({
        course:1,
        hole:1
    });

    function findMaxRoundInfo(game) {
        const currentRound = Math.max(...game.sheets.map(sheet => sheet.round));
        const currentSheets = game.sheets.filter(sheet => sheet.round === currentRound);
        return {currentRound, currentSheets};
    }

    const getHoleStarter = (game) => {
        if (!game.sheets || game.sheets.length === 0) {
            return {};
        }

        // 현재 라운드
        const {currentRound, currentSheets} = findMaxRoundInfo(game);
        // 이전 라운드
        const prevRound = currentRound - 1;
        const prevSheet = game.sheets.filter(sheet => sheet.round === prevRound);

        //이전 라운드에서 가장 적게 친 선수 : 최소 타수 동점자가 여러명이면 재귀를 돌며 찾음. 첫 라운드까지 못찾으면 host
        const playerId = getBestPlayerOfPrev(game.sheets, prevSheet);
        const playerSheet = currentSheets.find(sheet=>sheet.player.id === playerId)

        return playerSheet;
    };

    function getBestPlayerOfPrev(totalSheet, prevSheet) {
        if (prevSheet && prevSheet.length > 0) {
            const prevRound = prevSheet.round
            // 이전 라운드의 최저 hit 찾기
            const minHit = Math.min(...prevSheet.map(sheet => sheet.hit));
            // 지난 홀에서 최저 hit를 가진 요소들 찾기
            const minHitSheets = prevSheet.filter(sheet => sheet.hit === minHit);
            //최저 득점자가 여러명이면
            if(minHitSheets && minHitSheets.length > 1 ) {
                const prevPrevSheet = totalSheet.filter(sheet => sheet.round === (prevRound-1));
                return getBestPlayerOfPrev(totalSheet, prevPrevSheet);
            }else{
                return minHitSheets[0].player.id;
            }
        } else {
            //첫 라운드면
            return data.host.id;
        }
    }

    const [clickedPlayer, setClickedPlayer] = useState(getHoleStarter(data));

    const playerHitsArray = data.players.map(player => ({
        id: player.id,
        name: player.name,
        totalHits: 0, // totalHits를 0으로 초기화
        sheet: null // sheet를 null 또는 undefined로 초기화
    }));

// sheets 배열을 순회하면서 playerHitsArray 업데이트
    data.sheets.forEach(record => {
        const playerId = record.player.id;
        const hit = record.hit;

        // playerHitsArray에서 해당 player를 찾아 업데이트
        const playerIndex = data.players.findIndex(player => player.id === playerId);
        if (playerIndex !== -1) {
            playerHitsArray[playerIndex].totalHits += hit;
            playerHitsArray[playerIndex].sheet = record;
        } else {
            // 만약 해당 player가 playerHitsArray에 없으면 새로 추가
            playerHitsArray.push({
                id: playerId,
                name: record.player.name,
                totalHits: hit,
                sheet: record
            });
        }
    });



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
        const {currentRound, currentSheets} = findMaxRoundInfo(data);
        if(isHost) {
            currentSheets.forEach(sheet => {
                if (sheet.player.id === clickedPlayer.player.id) {
                    if (sheet.hit > 0) {
                        if (window.confirm("이미 점수 입력한 사람입니다.\n수정하시겠습니까?")) {
                            putScore(data.id, clickedPlayer).then(_ => {
                            })
                        }
                    } else {
                        putScore(data.id, clickedPlayer).then(_ => {
                        })
                    }
                }
            })
        }
    }
    function isZeroHitPlayerExist(data) {
        // 가장 큰 round 값 찾기
        const {currentRound, currentSheets} = findMaxRoundInfo(data);
        const playerWithZeroHit = currentSheets.some(e=> e.hit<=0 )
        return playerWithZeroHit;
    }

    function progressRound(id) {
        nextRound(id).then(_ => {
            if(_.status===200){
                const newClickPlayer = getHoleStarter(_.data);
                setClickedPlayer(newClickPlayer);
            }
        })
    }
    function endThisGame(id) {
        endGame(id).then(_ => {
            if(_.status===200){
                navigate(`/game/score/${data.id}`)
            }
        })
    }
    const nextRoundHandler =()=>{
        if(isZeroHitPlayerExist(data)) {
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

        if(isZeroHitPlayerExist(data)) {
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
            <ViewScoreList sheets={data.sheets} players={data.players} isHost={isHost} field={data.field}
                           clickedPlayer={clickedPlayer}
                           showCurrentRound={showCurrentRound} setShowCurrentRound={setShowCurrentRound}
                           setClickedHole={setClickedHole}/>


            {/*메모관리*/}
            <MemoOnGame isHost={isHost} field={data.field ?? undefined} selected={clickedHole}/>
            <div className={`grid grid-cols-4 gap-1 p-[5px]`}>

                {[...playerHitsArray, ...Array(4 - playerHitsArray.length).fill(null)].slice(0, 4).map((player, index) => (
                    player ? (
                        <PlayerDiv key={player.name} clicked={isHost && player.id === clickedPlayer.player.id}
                                   onClick={() => playerClickHandler(player.sheet)}>
                            {/*<p className={` ${isHost && player.id === clickedPlayer.player.id ?  'text-[18px] h-[35px] line-h-35 ' : 'text-[14px] h-[40px] line-h-40 '}`} >*/}
                            <p className={`line-h-70  ${isHost && player.id === clickedPlayer.player.id ?  'text-[20px] h-[70px]  ' : 'text-[14px] h-[70px] '}`} >
                                {player.name}
                            </p>
                            {/*<p className={`font-bold ${isHost && player.id === clickedPlayer.player.id ?  'text-[18px] h-[35px]' : 'text-[14px] h-[30px]'}`}>*/}
                            {/*    {player.totalHits}*/}
                            {/*</p>*/}
                        </PlayerDiv>
                    ) : (
                        <div key={`empty-${index}`} className="h-[70px] border">
                            <p className="font-bold text-[14px] h-[40px] line-h-40">&nbsp;</p>
                            <p className="text-[14px] h-[30px]">&nbsp;</p>
                        </div>
                    )
                ))}

            </div>
            {isHost &&
                <Counter>
                    <LefterBtn onClick={putScoreHandler}>입력</LefterBtn>
                    <NumberSelector limit={{upper: 10, under: 0}} number={clickedPlayer.hit}
                                    setNumber={scoreChangeHandler}/>
                    <div className={`w-5-6`}>
                        <RighterBtn onClick={nextRoundHandler}
                                    endable={data.round % 9 === 0 ? 'true' : undefined}>다음 홀</RighterBtn>
                        <EndBtn onClick={endGameHandler} endable={data.round % 9 === 0 ? 'true' : undefined}>종료</EndBtn>
                    </div>
                </Counter>
            }
        </>
    );
}

export default NowPlaying;