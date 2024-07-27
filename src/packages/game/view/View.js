import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import ParticipateGame from "./ParticipateGame";
import NowPlaying from "./NowPlaying";
import useGameData from "./useGameData";

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