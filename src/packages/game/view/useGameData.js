import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EventSourcePolyfill } from 'event-source-polyfill';
import axios from 'axios';

import { finish, load } from "../../../redux/slice/apiSlice";
import {userLogout} from "../../../api/auth/AuthService";
import {needAuth} from "../../../api/instance/Instance";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const useGameData = (id) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    useEffect(() => {
        let eventSource;

        const createEventSource = (token) => {
            return new EventSourcePolyfill(`${BASE_URL}/game/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        };

        const connectEventSource = async () => {
            let token = localStorage.getItem("accessToken");

            eventSource = createEventSource(token);

            eventSource.addEventListener('connect', (event) => {
                const eventData = JSON.parse(event.data);
                setData(eventData);
                dispatch(finish());
            });

            eventSource.addEventListener('broadCast', (event) => {
                console.log("broadCast");
                const eventData = JSON.parse(event.data);
                setData(eventData);
                dispatch(finish());
            });

            eventSource.onerror = async (error) => {

                if (error.status === 401) {
                    eventSource.close();
                    try {
                        const response = await needAuth.get(`${BASE_URL}/user/reissue`, {
                            withCredentials: true,
                        });
                        const newToken = response.data;
                        console.log(newToken)
                        localStorage.setItem("accessToken", newToken);
                        connectEventSource();
                    } catch (error) {
                        console.log(error);
                        await userLogout();
                        window.location.replace("/");
                    }
                } else {
                    eventSource.close();
                    dispatch(finish());
                }

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
