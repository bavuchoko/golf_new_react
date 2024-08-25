import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {gameInfo} from "../../../api/game/GameService";
import {CurrentRound, ScoreList, ScoreListContainer, TotalScore} from "./style/StyleView";
import CourseAccordion from "../../../components/accordion/CourseAccordion";

function FinalScore() {
    const {id} = useParams();
    const [game, setGame] = useState();
    useEffect(() => {
        gameInfo(id).then(_ => {
            console.log(_)
            if (_.status === 200) {
                console.log(_)
                setGame(_.data);
            }
        });
    }, [])
    const courseMap = {};
    let maxCourse = 1;
    game?.sheets.forEach(sheet => {
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
            const sortedSheets = game.players.map(player => {
                return courseMap[courseKey][holeKey].find(sheet => sheet.player.id === player.id) || { player: player, hit: 0 };
            });
            courseMap[courseKey][holeKey] = sortedSheets;
        });
    });
    if (game) {
        return (
            <ScoreList>
                <ScoreListContainer>
                    <TotalScore>
                        <div className={`grid grid-cols-5 mb-2`}>
                            <div>코스</div>
                            {game.players.map(player => (
                                <div key={`total_${player.id}`}>
                                    {player.name}
                                </div>
                            ))}
                        </div>
                        <CourseAccordion data={courseMap} players={game.players}/>
                    </TotalScore>

                </ScoreListContainer>
            </ScoreList>
        );
    }
}

export default FinalScore;