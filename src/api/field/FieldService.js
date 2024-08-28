import {needAuth, noAuth} from "../instance/Instance";
import {getQuery} from "../common/CommonMethod";

async function createField(field) {
    return await needAuth.post('/field', field);
}

async function getFieldList(search, pageable) {
    const query = getQuery(search, pageable);
    return await needAuth.get('/field?' + query);

}


async function getNearFieldList(search, pageable, lat, long) {
    let query = getQuery(search, pageable);
    query += '&lat='+lat+'&long='+long;
    return await needAuth.get('/field/near?' + query);

}



export {createField, getFieldList, getNearFieldList};