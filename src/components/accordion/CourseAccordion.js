import React, {useMemo, useState} from 'react';

function CourseAccordion({data, players}) {
    const [openCourse, setOpenCourse] = useState(0);


    const handleOpenCourse =(courseIndex)=>{
        if(openCourse === courseIndex) setOpenCourse(0)
        else setOpenCourse(courseIndex)
    }

    const playerHitSumByCourse = {};

// 각 코스별로 player별 hit 합계 구하기
    Object.keys(data).forEach(courseKey => {
        if (!playerHitSumByCourse[courseKey]) {
            playerHitSumByCourse[courseKey] = {};
        }

        Object.keys(data[courseKey]).forEach(holeKey => {
            data[courseKey][holeKey].forEach(sheet => {
                const { player, hit } = sheet;
                if (!playerHitSumByCourse[courseKey][player.id]) {
                    playerHitSumByCourse[courseKey][player.id] = 0;
                }
                playerHitSumByCourse[courseKey][player.id] += hit;
            });
        });
    });
    return (
    <>

        {playerHitSumByCourse && Object.keys(playerHitSumByCourse).map((courseIdx) => (
        <React.Fragment key={`course_${courseIdx}`}>
            <div className={`courses_accordion  grid grid-cols-5`}  onClick={()=>handleOpenCourse(courseIdx)}>
                <div>{String.fromCharCode(parseInt(courseIdx) + 64)}</div>
                {players.map(player => (
                    <div key={`total_score_${player.id}_${courseIdx}`}>
                        {playerHitSumByCourse[courseIdx][player.id]}
                    </div>
                ))}
            </div>

            {openCourse == courseIdx && data[openCourse] &&
                    Object.keys(data[openCourse]).map((holes,index   ) => (
                        // console.log(data)
                        <div  key={`txx_${holes}`}  className={` grid grid-cols-5 ${index % 2 === 0 ? 'bg-odd' :'bg-even'}`}>
                            <div>{holes}</div>
                            {data[openCourse][holes].map(sheet=> (
                                    <div key={`tcourse_${sheet.player.id}_${openCourse}`}>
                                        {sheet.hit}
                                    </div>
                                )
                            )}

                        </div>
                        )
                    )
            }

        </React.Fragment>
        ))}

    </>
    );
}

export default CourseAccordion;