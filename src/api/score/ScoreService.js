import {needAuth} from "../instance/Instance";

async function putScore(id,sheet) {
    return await needAuth.put(`/sheet/score/${id}`, sheet);
}


export {putScore};