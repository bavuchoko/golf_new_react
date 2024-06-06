import {needAuth, noAuh} from "../instance/Instance";

async function gameStart(game) {
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

async function startGame(id) {
    return await needAuth.put(`/enroll/${id}`);
}


export {gameStart, getGameList, quickStart, startGame};