import {needAuth, noAuh} from "../instance/Instance";


async function useLogin(loginUser) {
    localStorage.removeItem('accessToken');
    return await noAuh.post('/user/authentication', loginUser);
}

async function tokenVaildation() {
    const token = localStorage.getItem('accessToken');
    if(token) {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // Adjust the content type if needed
        };
        try{
            const response =  await needAuth.post('/user/tokenVaildation', null, { headers });
        }catch (error){
        console.log(error)
        localStorage.removeItem('accessToken');
        localStorage.removeItem('loginUser');
        return error;
        }
    }
}



async function userLogout() {
    localStorage.removeItem('accessToken');
    try{
        const response =  await needAuth.get('/user/logout');
    }catch (error){
    }
}

async function userJoin(loginUser) {
    const response = await noAuh.post('/user/create', loginUser);
    if (response.status === 200) {
        localStorage.setItem('accessToken',response.data);
        return response;
    } else {
        const error = new Error('로그인 실패');
        throw error; // 응답 코드가 400인 경우, 예외를 발생시킵니다.
    }
}


export {useLogin,tokenVaildation, userJoin, userLogout };