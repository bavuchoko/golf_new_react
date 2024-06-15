import {needAuth, noAuth} from "../instance/Instance";


async function useLogin(loginUser) {
    localStorage.removeItem('accessToken');
    return await noAuth.post('/user/login', loginUser);
}

async function tokenValidate() {
    return await needAuth.get('/user/validation');


}

async function refreshToken() {
    localStorage.removeItem('accessToken')
    const response = await needAuth.get('/user/reissue');
    if(response.status===200){
        localStorage.setItem('accessToken', response.data)
    }
    return response.data;
}



async function userLogout() {
    localStorage.removeItem('accessToken');
    try{
        return await needAuth.get('/user/logout');
    }catch (error){
        return error;
    }
}


async function userJoin(user) {
    localStorage.removeItem('accessToken');
    return await noAuth.post('/user/join', user);
}


export {useLogin, tokenValidate, refreshToken, userJoin, userLogout };