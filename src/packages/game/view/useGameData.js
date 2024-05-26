// useGameData.js
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EventSourcePolyfill } from 'event-source-polyfill';

import {finish, load} from "../../../redux/slice/apiSlice";

const useGameData = (id) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const dispatch = useDispatch();
    const [data, setData] = useState();

    useEffect(() => {
        dispatch(load());
        // SSE 연결 로직
        const eventSource = new EventSourcePolyfill(`${BASE_URL}/game/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                'Content-Type': 'application/json',
            },
        });

        eventSource.addEventListener('connect', (event) => {
            const eventData = JSON.parse(event.data);
            console.log("connect");
            setData(eventData);
            dispatch(finish());
        });

        eventSource.addEventListener('broadCast', (event) => {
            console.log("broadCast");
            const eventData = JSON.parse(event.data);
            setData(eventData);
            dispatch(finish());
        });

        eventSource.onerror = () => {
            // 에러 발생 시 할 동작
            eventSource.close(); // 연결 끊기
            dispatch(finish());
        };

        return () => {
            eventSource.close();
            dispatch(finish());
        };
    }, [BASE_URL, id, dispatch]);

    return [data, setData];
};

export default useGameData;
