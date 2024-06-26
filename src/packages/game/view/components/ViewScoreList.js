import React, {useEffect, useMemo} from 'react';
import {CurrentRound, ScoreList, ScoreListContainer, TotalScore} from "../style/StyleView";
import CourseAccordian from "../../../../components/accordion/CourseAccordian";

function ViewScoreList({sheets, players, isHost, showCurrentRound, setShowCurrentRound, memos}) {

    let vh = 0;
    useEffect(() => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);


    const courses = {};
    sheets.forEach(sheet => {
        const round={}

    });

    console.log(courses)



    return (
        <ScoreList isHost={isHost}>
            <div className={`flex h-[50px] line-h-50 justify-center w-full border`}>
                <div className={`w-[120px] text-left ${showCurrentRound ? 'font-bold' : ''}`}  onClick={()=>setShowCurrentRound(true)}>현재 라운드</div>
                <div className={`splicer h-[30px] mt-[10px]`}/>
                <div className={`w-[120px] text-right ${!showCurrentRound ? 'font-bold' : '' }`} onClick={()=>setShowCurrentRound(false)}>라운드 합계</div>
            </div>
            <ScoreListContainer isHost={isHost}>

                {/*현재라운드*/}
                <CurrentRound isHost={isHost} visable={showCurrentRound}>

                    <div className={`grid grid-cols-5 mb-2`}>
                            <div>홀</div>
                            {players.map((player, index) =>(
                            <div key={`hole_`+index}>
                                {player.name}
                            </div>
                            ))}
                        </div>
                    {sheets.map((sheet,index) => (
                        <div key={`hole2_`+sheet} className={`grid grid-cols-5 ${index % 2 === 0 ? 'bg-odd' :'bg-even'}`}>

                            {/*라운드 순번*/}
                            <div className={`py-1 relative`}>
                                {/* 메모 있음 아이콘 */}
                                {memos && memos.some(memo => memo.round == sheet.round) &&
                                    <div className={`absolute top-1 left-4 w-4 h-4 rounded-full bg-red-700`} />
                                }
                                <span className={`rounded-full border bg-[white] inline-block h-[35px] w-[35px] line-h-35`}>{sheet.round}</span>
                            </div>

                            {/*{roundSheet[round].sort((a, b) => {*/}
                            {/*    const playerOrder = roundSheet[minRound].map(sheet => sheet.player.id);*/}
                            {/*    return playerOrder.indexOf(a.player.id) - playerOrder.indexOf(b.player.id);*/}
                            {/*}).map(sheet => (*/}
                            {/*    <div key={`sheet_`+ sheet.player.id} className={`py-1`}>*/}
                            {/*        <span className={`inline-block h-[35px] w-[35px] line-h-35`}>{sheet.hit}</span>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </div>
                    ))}
                </CurrentRound>
                <TotalScore isHost={isHost} visable={showCurrentRound}>
                    <div className={`grid grid-cols-5 mb-2`}>
                        <div>코스</div>
                        {players.map(player => (
                            <div key={`total_${player.id}`}>
                                {player.name}
                            </div>
                        ))}
                    </div>

                    <CourseAccordian courseSheets={"courseSheets"} players={players}/>

                </TotalScore>
            </ScoreListContainer>
        </ScoreList>
    );
}

export default ViewScoreList;