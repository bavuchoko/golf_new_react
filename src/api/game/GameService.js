import {needAuth, noAuth} from "../instance/Instance";

async function gameCreate(game) {
    console.log(game)
   return await needAuth.post('/game', game);
}

async function getGameList(search, pageable) {
    let pageStr="";
    let sort="sort=";
    let size='&size=';
    let page='&page=';
    const desc = ',desc';
    if(pageable.sort) {
        sort += pageable.sort
        if (pageable.desc) {
            sort += desc;
        }
    }

    if(pageable.size){
        size +=pageable.size;
    }
    page +=pageable.page;
    pageStr=sort+size+page;
    return await needAuth.get('/game?' + pageStr+'&startDate='+search.startDate+'&endDate='+search.endDate);
}

async function gameInfo(gameId) {
    return await noAuth.get(`/game/score/${gameId}`);
}

async function deleteGame(gameId) {
    return await needAuth.delete(`/game/${gameId}`);
}


async function quickStart(game) {
    return await needAuth.post('/game/quick', game);
}

async function enrollGame(gameId) {
    return await needAuth.put(`/game/enroll/${gameId}`);
}

async function startGame(gameId, hole) {
    return await needAuth.put(`/game/play/${gameId}?hole=${hole}`);
}


async function endGame(gameId) {
    return await needAuth.put(`/game/end/${gameId}`);
}


async function expelPlayer(gameId, targetId) {
    console.log(targetId)
    return await needAuth.put(`/game/expel/${gameId}`, {id: targetId});
}
export {gameCreate, getGameList, quickStart, enrollGame, startGame, endGame, expelPlayer, gameInfo, deleteGame, };