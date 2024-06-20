import {needAuth} from "../instance/Instance";

async function putScore(id,sheet) {
    return await needAuth.put(`/sheet/score/${id}`, sheet);
}

async function nextRound(id) {
    return await needAuth.put(`/sheet/next-round/${id}`);
}


export {putScore, nextRound};