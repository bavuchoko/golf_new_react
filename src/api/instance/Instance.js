import axios from 'axios'
import {userLogout} from "../auth/AuthService";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const noAuthapi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

const needAuthapi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});


noAuthapi.interceptors.request.use((config) => {
    return config;
});



needAuthapi.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});



// 응답 인터셉터
needAuthapi.interceptors.response.use(
    function (response) {
        // 2xx 번대 응답코드의 응답에 대한 인터셉터
        return response;
    },
    async (error) => {
        const {
            config,
            response: { status },
        } = error;
        if (status === 401) {
            const originalRequest = config;
            let accessToken
            try {
                const resonse = await needAuth.get(BASE_URL + `/user/reissue`,);
                accessToken = resonse.data.accessToken
            }catch (error){
                console.log(error)
                alert("로그인 세션이 만료되어 로그아웃 되었습니다.")
                const response = await userLogout();
                window.location.replace("/");
                return response;
            }
            localStorage.removeItem("accessToken");
            await localStorage.setItem("accessToken", accessToken);
            originalRequest.headers.authorization = `Bearer ${accessToken}`;
            try {
                return axios(originalRequest);
            }catch (error){
                alert("로그인 세션이 만료되어 로그아웃 되었습니다.")
                console.log(error)
                const response = await userLogout();
                window.location.replace("/");
                return response;
            }
        }
        return Promise.reject(error);
    }
);

export const noAuh = noAuthapi
export const needAuth = needAuthapi;