import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {EventSourcePolyfill} from 'event-source-polyfill';

import {finish, onError} from "../../../redux/slice/apiSlice";
import {needAuth} from "../../../api/instance/Instance";
import {refreshToken, tokenValidate} from "../../../api/auth/AuthService";
import axios from "axios";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const useGameData = (id) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        let eventSource;

        const createEventSource = (token) => {

            let option
            if(token) {
                option= {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            }else{
                option= {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            }

            return new EventSourcePolyfill(`${BASE_URL}/game/${id}`, option);
        };

        const connectEventSource = async () => {

            const rawToken = localStorage.getItem('accessToken')
            let newToken;

            try {
                const response = await axios.get(`${BASE_URL}/user/validation`, {
                    headers:{
                        Authorization: `Bearer ${rawToken}`,
                        'Content-Type': 'application/json',
                    },
                    withCredentials:true
                });
                if(response.status === 200)
                newToken = rawToken
            }catch (error){
                if(error.response.status === 401){
                    const res = await axios.get(`${BASE_URL}/user/reissue`, {
                        headers:{
                            Authorization: `Bearer ${rawToken}`,
                            'Content-Type': 'application/json',
                        },
                        withCredentials:true
                    });
                    newToken = res.data
                    localStorage.setItem('accessToken', newToken)
                }
                if(error.response.status === 403){
                    newToken=null;
                }
            }

            eventSource = createEventSource(newToken);
            eventSource.addEventListener('connect', (event) => {
                console.log('connected')
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
                if (eventSource.readyState === EventSource.CLOSED) {
                    console.log('SSE connection was closed. Reconnecting...');
                    // 재연결 시도
                    setTimeout(createEventSource, 3000); // 3초 후에 재연결 시도
                } else {
                    console.log('SSE connection error: ReadyState =', eventSource.readyState);
                    dispatch(onError());
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
