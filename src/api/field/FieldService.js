import {needAuth, noAuth} from "../instance/Instance";

async function createField(field) {
    console.log(field)
    return await needAuth.post('/field', field);
}

async function getFieldList(search, pageable) {
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
    return await needAuth.get('/field?' + pageStr, search);

}



export {createField, getFieldList};