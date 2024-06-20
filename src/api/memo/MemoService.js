import {needAuth} from "../instance/Instance";

async function getMemos(fieldId) {

    if(fieldId)
        return await needAuth.get(`/memo/${fieldId}`);
    else return undefined;
}

async function createMemo(memo) {
    return await needAuth.post(`/memo`, memo);
}

async function pushMemo(memo) {
    return await needAuth.put(`/memo`, memo);
}


export {getMemos, createMemo, pushMemo};