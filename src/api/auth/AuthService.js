import {needAuth, noAuth} from "../instance/Instance";


async function useLogin(loginUser) {
    localStorage.removeItem('accessToken');
    return await noAuth.post('/user/login', loginUser);
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
        return await needAuth.get('/user/logout');
    }catch (error){
        return error;
    }
}


async function userJoin(user) {
    localStorage.removeItem('accessToken');
    return await noAuth.post('/user/join', user);
}


export {useLogin,tokenVaildation, userJoin, userLogout };