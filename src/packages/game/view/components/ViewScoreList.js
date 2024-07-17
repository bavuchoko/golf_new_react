import React, {useEffect, useState} from 'react';
import {CurrentRound, ScoreList, ScoreListContainer, TotalScore} from "../style/StyleView";
import CourseAccordion from "../../../../components/accordion/CourseAccordion";
import {useSelector} from "react-redux";

function ViewScoreList({sheets, players, isHost, showCurrentRound, setShowCurrentRound, setClickedHole}) {
    const memos =useSelector(state => state.memo.data);
    const [expand, setExpand ]=useState(false);
    const courseMap = {};
    let maxCourse = 1;
    sheets.forEach(sheet => {
        const { course, hole } = sheet;
        if (course > maxCourse) {
            maxCourse = course;
        }
        if (!courseMap[course]) {
            courseMap[course] = {};
        }

        if (!courseMap[course][hole]) {
            courseMap[course][hole] = [];
        }

        courseMap[course][hole].push(sheet);
    });
    // 각 코스와 홀의 sheets를 data.players 순서에 맞게 정렬
    Object.keys(courseMap).forEach(courseKey => {
        Object.keys(courseMap[courseKey]).forEach(holeKey => {
            // 현재 홀의 sheets 배열을 data.players 순서에 맞게 정렬
            const sortedSheets = players.map(player => {
                return courseMap[courseKey][holeKey].find(sheet => sheet.player.id === player.id) || { player: player, hit: 0 };
            });
            courseMap[courseKey][holeKey] = sortedSheets;
        });
    });

// organizeSheets 생성
    const organizeSheets = {};
    Object.keys(courseMap).forEach(courseKey => {
        const holes = Object.keys(courseMap[courseKey]).map(holeKey => ({
            hole: parseInt(holeKey),
            course: parseInt(courseKey),
            sheets: courseMap[courseKey][holeKey]
        }));
        organizeSheets[courseKey] = { holes: holes };
    });


    return (
        <ScoreList isHost={isHost}>
            <div className={`flex h-[50px] line-h-50 justify-center w-full border`}>
                <div className={`w-[49%] text-center ${showCurrentRound ? 'font-bold' : ''}`}  onClick={()=>setShowCurrentRound(true)}>현재 스코어</div>
                <div className={`splicer h-[30px] mt-[10px]`}/>
                <div className={`w-[49%] text-center ${!showCurrentRound ? 'font-bold' : '' }`} onClick={()=>setShowCurrentRound(false)}>코스별 스코어</div>
            </div>
            <ScoreListContainer isHost={isHost}>

                {/*현재라운드 컨테이너*/}
                <CurrentRound isHost={isHost} visable={showCurrentRound} >
                    {/*헤더*/}
                    <div className={`grid grid-cols-5 mb-2`}>
                        <div>홀</div>
                        {players.map((player, index) => (
                            <div key={`hole_` + index}>
                                {player.name}
                            </div>
                        ))}
                    </div>

                    {/*점수*/}
                    {organizeSheets[maxCourse].holes.reverse().map((hole, index) => (
                        <div key={`hole22_` + index}
                             className={`grid grid-cols-5 ${index % 2 === 0 ? 'bg-odd' : 'bg-even'} ${expand || index===0 ? '':'hidden'}`}
                             onClick={() => setClickedHole({
                                 hole: hole.hole,
                                 course: hole.course
                             })}>

                            {/*라운드 순번*/}
                            <div className={`py-1 relative`}>
                                {/* 메모 있음 아이콘*/}
                                {memos && memos.some(memo => (memo.course == maxCourse) && (memo.hole == hole.hole)) &&
                                    <div className={`absolute top-1 left-4 w-4 h-4 rounded-full bg-red-700`}/>
                                }
                                <span
                                    className={`rounded-full border bg-[white] inline-block h-[35px] w-[35px] line-h-35`}>{hole.hole}</span>
                            </div>


                            {hole.sheets.map((sheet, index) => (
                                <div key={`sheet_` + sheet.player.id} className={`py-1`} onClick={()=>setExpand(!expand)}>
                                    <span className={`inline-block h-[35px] w-[35px] line-h-35`}>{sheet.hit}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className={`mt-5 mb-1 text-[15px] `}>
                    {!expand ? <p  onClick={()=>setExpand(true)}>추가정보 보기</p> : <p onClick={()=>setExpand(false)}>닫기</p>}
                    </div>
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
                    <CourseAccordion data={courseMap} players={players}/>
                </TotalScore>

            </ScoreListContainer>
        </ScoreList>
    );
}

export default ViewScoreList;