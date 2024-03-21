import {needAuth, noAuh} from "../instance/Instance";


async function useLogin(loginUser) {
    localStorage.removeItem('accessToken');
    const response = await noAuh.post('/user/authentication', loginUser);
    if (response.status === 200) {
        const user ={
            "id":response.data.id,
            "name":response.data.name,
            "birth":response.data.birth,
            "joinDate":response.data.joinDate,
            "gender":response.data.gender,
            "success":true,
            "accessToken":response.data.accessToken
        }
        response.user = user;
        localStorage.setItem('accessToken',response.data.accessToken);
        localStorage.setItem('loginUser',JSON.stringify(user));
        return response;
    }else {
        const error = new Error('조회 실패');
        throw error;
    }
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