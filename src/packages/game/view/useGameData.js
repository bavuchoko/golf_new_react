import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {EventSourcePolyfill} from 'event-source-polyfill';

import {finish, load, onError} from "../../../redux/slice/apiSlice";
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
            dispatch(load())
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
                if(error.message='Network Error'){

                }else{
                    if(error.response.status === 401){
                        const res = await axios.get(`${BASE_URL}/user/reissue`, {
                            withCredentials:true
                        });
                        newToken = res.data
                        localStorage.setItem('accessToken', newToken)
                    }
                    if(error.response.status === 403){
                        newToken=null;
                    }
                }
            }finally {
                dispatch(finish())
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

            eventSource.onerror = (error) => {
                console.log(error)
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
            dispatch(finish())
        };

        connectEventSource();

        return async () => {
            if (eventSource) {
                eventSource.close();

                // await axios.get(`${BASE_URL}/${id}/close`, {
                //     headers:{
                //         Authorization: `Bearer ${rawToken}`,
                //         'Content-Type': 'application/json',
                //     },
                //     withCredentials:true
                // });


            }
        };
    }, [BASE_URL, id, dispatch]);

    return [data, setData];
};

export default useGameData;
