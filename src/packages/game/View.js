import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";

function View({}) {
    const id = useParams();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    useEffect(() => {
        //SSE연결 로직
        const eventSource = new EventSource( BASE_URL + '/game/' +  id);
        eventSource.addEventListener('connect', (event) => {
            console.log("connect message: ", event.data)
        });

        eventSource.addEventListener('broadCast', (event) => {
            console.log("broadCast message: ", event.data)
        });
        eventSource.onerror = () => {
            //에러 발생시 할 동작
            eventSource.close(); //연결 끊기
        };

        return () => {
            eventSource.close();
        };

    }, []);

    return (
        <div>

        </div>
    );
}

export default View;