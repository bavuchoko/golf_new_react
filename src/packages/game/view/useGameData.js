import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {EventSourcePolyfill} from 'event-source-polyfill';

import {finish, onError} from "../../../redux/slice/apiSlice";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const useGameData = (id) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        let eventSource;

        const createEventSource = (token) => {

            //Todo 토큰을 받아서 검증하고 에러있으면 갱신, 갱신도 에러나면 Authorization 자체가 없는 요청으로

            return new EventSourcePolyfill(`${BASE_URL}/game/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
        };

        const connectEventSource = async () => {
            let token = localStorage.getItem("accessToken");

            eventSource = createEventSource(token);

            eventSource.addEventListener('connect', (event) => {
                const eventData = JSON.parse(event.data);
                setData(eventData);
            });

            eventSource.addEventListener('broadCast', (event) => {
                console.log("broadCast");
                const eventData = JSON.parse(event.data);
                setData(eventData);
            });

            eventSource.onerror = async (error) => {

                    eventSource.close();
                    dispatch(onError());

                if (eventSource.readyState === EventSource.CLOSED || eventSource.readyState === EventSource.CLOSING) {
                    console.log("EventSource closed");
                    return;
                }

                if (eventSource.readyState === EventSource.CONNECTING) {
                    console.log("EventSource reconnecting");
                    return;
                }


            };
        };

        connectEventSource();

        return () => {
            if (eventSource) {
                eventSource.close();
                dispatch(finish());
            }
        };
    }, [BASE_URL, id, dispatch]);

    return [data, setData];
};

export default useGameData;
