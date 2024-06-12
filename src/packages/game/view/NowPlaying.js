import React from 'react';
import {useParams} from "react-router-dom";

function NowPlaying({data}) {

    const params = useParams();

    if (!data) {
        return <>loading...</>;
    }

    return (
        <div>nowplaying</div>
    );
}

export default NowPlaying;