import React, {useEffect} from 'react';
import {CurrentRound, ScoreList, ScoreListContainer, TotalScore} from "../style/StyleView";

function ViewScoreList({sheets, isHost, showCurrentRound, setShowCurrentRound, memos}) {

    let vh = 0;
    useEffect(() => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);



    // round 별로 시트를 그룹화
    const groupedSheets = sheets.reduce((acc, sheet) => {
        const round = sheet.round;
        if (!acc[round]) {
            acc[round] = [];
        }
        acc[round].push(sheet);
        return acc;
    }, {});
    const minRound = Math.min(...Object.keys(groupedSheets));

    return (
        <ScoreList isHost={isHost}>
            <div className={`flex h-[50px] line-h-50 justify-center w-full border`}>
                <div className={`w-[120px] text-left ${showCurrentRound ? 'font-bold' : ''}`}  onClick={()=>setShowCurrentRound(true)}>현재 라운드</div>
                <div className={`splicer h-[30px] mt-[10px]`}/>
                <div className={`w-[120px] text-right ${!showCurrentRound ? 'font-bold' : '' }`} onClick={()=>setShowCurrentRound(false)}>라운드 합계</div>
            </div>
            <ScoreListContainer isHost={isHost}>
                <CurrentRound isHost={isHost} visable={showCurrentRound}>

                    <div className={`grid grid-cols-5 mb-2`}>
                            <div>홀</div>
                            {groupedSheets[minRound].map((round, index) =>(
                            <div key={`hole_`+index}>
                                {round.player.name}
                            </div>
                            ))}
                        </div>
                    {Object.keys(groupedSheets).map((round,index) => (
                        <div key={`hole2_`+round} className={`grid grid-cols-5 ${index % 2 === 0 ? 'bg-odd' :'bg-even'}`}>
                            <div className={`py-1 relative`}>

                                {/* 현재 홀에 메모 존재하는지 여부 */}
                                {memos && memos.some(memo => memo.round == round) &&
                                    <div className={`absolute top-1 left-4 w-4 h-4 rounded-full bg-red-700`} />
                                }

                                <span className={`rounded-full border bg-[white] inline-block h-[35px] w-[35px] line-h-35`}>{round}</span>
                            </div>
                            {groupedSheets[round].sort((a, b) => {
                                const playerOrder = groupedSheets[minRound].map(sheet => sheet.player.id);
                                return playerOrder.indexOf(a.player.id) - playerOrder.indexOf(b.player.id);
                            }).map(sheet => (
                                <div key={`sheet_`+ sheet.player.id} className={`py-1`}>
                                    <span className={`inline-block h-[35px] w-[35px] line-h-35`}>{sheet.hit}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </CurrentRound>
                <TotalScore isHost={isHost} visable={showCurrentRound}>
                </TotalScore>
            </ScoreListContainer>
        </ScoreList>
    );
}

export default ViewScoreList;