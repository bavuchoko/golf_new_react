import React from 'react';
import {useParams} from "react-router-dom";
import ParticipateGame from "./view/ParticipateGame";
import NowPlaying from "./view/NowPlaying";
import useGameData from "./view/useGameData";

function View({}) {

    const params = useParams();
    const [data] =useGameData(params.id)

    return (
        <div>
            {data && data.status ==='OPEN' && <ParticipateGame data={data} width={80}/> }
            {data && data.status ==='PLAYING' && <NowPlaying data={data}/> }
        </div>
    );
}

export default View;