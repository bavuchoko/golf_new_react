import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import ParticipateGame from "./ParticipateGame";
import NowPlaying from "./NowPlaying";
import useGameData from "./useGameData";
import {useSelector} from "react-redux";

function View({}) {

    const user = useSelector((state) => state.user.user);
    const params = useParams();
    const [data] =useGameData(params.id)


    return (
        <div>
            {data && data.status ==='OPEN' && <ParticipateGame data={data} width={80} user={user}/> }
            {data && data.status ==='PLAYING' && <NowPlaying data={data} user={user}/> }
        </div>
    );
}

export default View;