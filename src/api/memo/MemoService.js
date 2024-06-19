import {needAuth} from "../instance/Instance";

async function getMemos(game) {

    const fieldId = game.field?.id ?? undefined;
    if(fieldId)
        return await needAuth.get(`/memo/${fieldId}`);
    else return undefined;
}

export {getMemos};