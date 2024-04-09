import {needAuth, noAuh} from "../instance/Instance";

async function createGame(game) {
    console.log(game)
    return await needAuth.post('/game', game);
}

async function getGameList(search, pageable) {
    const start = performance.now();
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
    return await needAuth.get('/game?' + pageStr, search);
}


async function quickStart(playerCount) {
    return await needAuth.post('/game/quick', playerCount);
}



export {createGame, getGameList, quickStart};