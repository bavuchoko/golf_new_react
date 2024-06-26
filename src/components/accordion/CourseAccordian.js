import React, {useMemo, useState} from 'react';

function CourseAccordian({courseSheets, players}) {
    const [openCourse, setOpenCourse] = useState();



    const handleChangeIndex =(courseIndex)=>{
        console.log(courseIndex)
    }

    return (
    <>
        {/*{Object.keys(playerTotalScoresByCourse[playersOrder[0].id]).map((courseIndex) => (*/}

        {/*<div key={`course_${courseIndex}`} className={`grid grid-cols-5`}  onClick={()=>handleChangeIndex(courseIndex)}>*/}
        {/*    <div>{String.fromCharCode(courseIndex + 65)}</div>*/}
        {/*    {playersOrder.map(player => (*/}
        {/*        <div key={`total_score_${player.id}_${courseIndex}`}>*/}
        {/*            {playerTotalScoresByCourse[player.id][courseIndex]}*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*</div>*/}
        {/*))}*/}
    </>
    );
}

export default CourseAccordian;