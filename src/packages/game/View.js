import React from 'react';
import {useParams} from "react-router-dom";
import ParticipateGame from "./view/ParticipateGame";
import NowPlaying from "./view/NowPlaying";
import useGameData from "./view/useGameData";

function View({}) {
    const params = useParams();
    console.log(params)
    const [data] =useGameData(params.id)

    if (!data) {
        return <>loading...</>;
    }
    return (
        <div>
            {data.status ==='OPEN' && <ParticipateGame data={data} /> }
            {data.status ==='PLAYING' && <NowPlaying data={data}/> }
        </div>
    );
}

export default View;