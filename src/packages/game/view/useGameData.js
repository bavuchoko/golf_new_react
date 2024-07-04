import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { finish, load, onError } from "../../../redux/slice/apiSlice";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useGameData = (id) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        let eventSource;

        const createEventSource = (token) => {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                },
                withCredentials: true,
                heartbeatTimeout: 60000 // 타임아웃 시간을 60초로 설정
            };

            return new EventSourcePolyfill(`${BASE_URL}/game/${id}`, options);
        };

        const initializeEventSource = (token) => {
            eventSource = createEventSource(token);

            eventSource.addEventListener('connect', (event) => {
                console.log('connected');
                const eventData = JSON.parse(event.data);
                setData(eventData);
            });

            eventSource.addEventListener('broadCast', (event) => {
                console.log("broadCast");
                const eventData = JSON.parse(event.data);
                setData(eventData);
            });

            eventSource.onerror = (error) => {
                console.log(error);
                eventSource.close();
                if (eventSource.readyState === EventSource.CLOSED) {
                    console.log('SSE connection was closed. Reconnecting...');
                    setTimeout(() => {
                        initializeEventSource(token);
                        console.log('Reconnecting...');
                    }, 3000); // 3초 후 재연결 시도
                } else {
                    console.log('SSE connection error: ReadyState =', eventSource.readyState);
                    dispatch(onError());
                }
            };
        };

        const connectEventSource = async () => {
            dispatch(load());
            const rawToken = localStorage.getItem('accessToken');
            let newToken;

            try {
                const response = await axios.get(`${BASE_URL}/user/validation`, {
                    headers: {
                        Authorization: `Bearer ${rawToken}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });
                if (response.status === 200) {
                    newToken = rawToken;
                }
            } catch (error) {
                if (error.message === 'Network Error') {
                    // Handle network error
                } else {
                    if (error.response.status === 401) {
                        const res = await axios.get(`${BASE_URL}/user/reissue`, {
                            withCredentials: true
                        });
                        newToken = res.data;
                        localStorage.setItem('accessToken', newToken);
                    }
                    if (error.response.status === 403) {
                        newToken = null;
                    }
                }
            } finally {
                dispatch(finish());
            }

            initializeEventSource(newToken);
        };

        connectEventSource();

        window.addEventListener('beforeunload', () => {
            axios.get(`${BASE_URL}/sse/disconnect/game/${id}`);
        });

        return () => {
            if (eventSource) {
                axios.get(`${BASE_URL}/sse/disconnect/game/${id}`);
                eventSource.close();
            }
        };

    }, [BASE_URL, id, dispatch]);

    return [data, setData];
};

export default useGameData;
