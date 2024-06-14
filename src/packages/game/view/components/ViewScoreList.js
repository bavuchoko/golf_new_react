import React, {useEffect} from 'react';
import {CurrentRound, ScoreList, ScoreListContainer, TotalScore} from "../style/StyleView";

function ViewScoreList({data, isHost, showCurrentRound, setShowCurrentRound}) {

    let vh = 0;
    useEffect(() => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);

    const sheets = data.sheets;

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
                            <div key={`th_`+index}>
                                {round.player.name}
                            </div>
                            ))}
                        </div>
                    {Object.keys(groupedSheets).map((round,index) => (
                        <div key={round} className={`grid grid-cols-5 py-1 ${index % 2 === 0 ? 'bg-odd' :'bg-even'}`}>
                            <div>{round}</div>
                            {groupedSheets[round].sort((a, b) => {
                                const playerOrder = groupedSheets[minRound].map(sheet => sheet.player.id);
                                return playerOrder.indexOf(a.player.id) - playerOrder.indexOf(b.player.id);
                            }).map(sheet => (
                                <div key={sheet.id}>
                                    <p className={``}>{sheet.hit}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </CurrentRound>
                <TotalScore data={data} isHost={isHost} visable={showCurrentRound}>
                </TotalScore>
            </ScoreListContainer>
        </ScoreList>
    );
}

export default ViewScoreList;