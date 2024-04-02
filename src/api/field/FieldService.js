import {needAuth, noAuh} from "../instance/Instance";

async function createField(field) {
    console.log(field)
    return await needAuth.post('/field', field);
}

async function getFieldList(search) {
    return  await noAuh.get('/field', {params: {searchTxt: search}});
}

export {createField, getFieldList};