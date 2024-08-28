const toKSTISOString = (date) => {
    const kstOffset = 9 * 60 * 60 * 1000; // 한국 표준시는 UTC+9
    const kstTimestamp = date.getTime() + kstOffset;
    const kstDate = new Date(kstTimestamp);
    return kstDate.toISOString();
}


export function getQuery(search, pageable){
    let query;

    let sort="&sort=";
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

    let searchTxt="searchTxt=";
    let city="&city=";
    let option='&option=';

    if(search.searchTxt) {
        searchTxt += encodeURIComponent(searchTxt.searchTxt)
    }
    if(search.city){
        city +=search.city;
    }
    if(search.option){
        option +=search.option;
    }
    query=searchTxt+city+option+sort+size+page;
    return query;
}
const isLoggedIn = localStorage.getItem("accessToken") != null
export {toKSTISOString, isLoggedIn};

