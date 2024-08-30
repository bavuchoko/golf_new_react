import React from 'react';

function Nocontent({message}) {
    return (
        <div className={"pt-[40%] w-full text-center text-[16px]"}>{message ? message : "조회 결과가 없습니다."}</div>
    );
}

export default Nocontent;