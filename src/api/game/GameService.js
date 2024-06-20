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


async function quickStart(game) {
    return await needAuth.post('/game/quick', game);
}

async function enrollGame(gameId) {
    return await needAuth.put(`/game/enroll/${gameId}`);
}

async function startGame(gameId) {
    return await needAuth.put(`/game/play/${gameId}?hole=1`);
}


async function endGame(gameId) {
    return await needAuth.put(`/game/end/${gameId}`);
}


async function expelPlayer(gameId, targetId) {
    return await needAuth.put(`/game/expel/${gameId}`,{params: {target: {id: targetId}}});
}
export {gameCreate, getGameList, quickStart, enrollGame, startGame, endGame, expelPlayer};