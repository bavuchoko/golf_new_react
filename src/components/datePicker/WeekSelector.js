import React from 'react';

function WeekSelector({date, setDate}) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var threeDaysAgo = new Date(date);
    threeDaysAgo.setDate(date.getDate() - 3);

    var threeDaysLater = new Date(date);
    threeDaysLater.setDate(date.getDate() + 3);

    var weekArray = [];
    var daysOfWeekKorean = ["일", "월", "화", "수", "목", "금", "토"];

    for (var i = -3; i <= 3; i++) {
        var currentDate = new Date(date);
        currentDate.setDate(date.getDate() + i);
        weekArray.push(currentDate);
    }

    return (
        <>
            <div className={"bg-[white] grid grid-cols-7 top-[45px] px-[20px] fixed w-full h-[60px] left-0 weekSelector-border"}>
            {weekArray.map(today=>(
                <div key={today.getDate()} className={`text-center weekSelector pt-[10px] ${today.getDate()===date.getDate() ? 'today' :''}`} onClick={()=>setDate(today)}>
                    <div className={"text-[13px] " + (today.getDay() === 0 ? "text-[red]" : (today.getDay() === 6 ? "text-blue-500" : ""))}>{(today.getMonth() + 1).toString().padStart(2, '0') + "/" + today.getDate().toString().padStart(2, '0')}</div>
                    <div className={"text-[13px] " + (today.getDay() === 0 ? "text-red-500" : (today.getDay() === 6 ? "text-blue-500" : ""))}>{daysOfWeekKorean[today.getDay()] + " "}</div>
                </div>
            ))}
            </div>
        </>
    );
}

export default WeekSelector;