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


async function userJoin(user) {
    return await noAuh.post('/user/create', user);
}


export {useLogin,tokenVaildation, userJoin, userLogout };