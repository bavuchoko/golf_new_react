import React, {useEffect, useState} from 'react';
import WeekSelector from "../../components/datePicker/WeekSelector";
import Nocontent from "../../components/exception/Nocontent";
import TypeSelectBox from "../../components/selectbox/TypeSelectBox";
import {Link, useNavigate} from "react-router-dom";
import {getGameList} from "../../api/game/GameService";
import {toKSTISOString} from "../../api/common/CommonMethod";
import {useHeaderContext} from "../../layout/context/HeaderContext";


function List(props) {
    const [ select, setSelect] = useState('전체');
    const [data, setData] =useState();
    const [date, setDate] = useState(new Date());
    const [openStart, setOpenStart] =useState(false);
    const [search, setSearch] =useState({
        searchTxt:"",
        startDate:toKSTISOString(date),
        endDate:toKSTISOString(date),
    });
    const [pageable, setPageable] =useState({
        sort:"playDate",
        desc:true,
        size:10,
        totalElements:0,
        totalPages:0,
        page:0
    });

    const status=[
        {id:0, value:null, label:'전체'},
        {id:1, value:'OPEN', label:'참가중'},
        {id:2, value:'PLAYING', label:'경기중'},
        {id:3, value:'END', label:'종료'}
    ]

    useEffect(()=>{
        const newSearch = {
            ...search,
            startDate:toKSTISOString(date),
            endDate:toKSTISOString(date)}
        getGameList(newSearch, pageable).then(_ =>{
            if(_.status===200){
                setData(_.data);
                setPageable((prevState) => ({
                    ...prevState,
                    totalElements: _.data.totalElements,
                    totalPages: _.data.totalPages,
                }));
            }
            }).then(
        );
    },[pageable.page, date])

    const navigate = useNavigate();
    if(data) {
        return (
            <>
                <WeekSelector date={date} setDate={setDate}/>
                <div className={"pt-[60px]"}></div>
                <div className={"fixed w-full h-[30px] pt-[2px] line-h-30 bg-[#f0f0f0] text-[13px] px-[15px] flex"}>
                <span className={``}>{data ?
                    <>총 10건</> : <>--</>
                } </span>
                    <div className={`w-[70px] ml-auto`}>
                        <TypeSelectBox options={status} select={select} setSelect={setSelect}/>
                    </div>
                </div>
                <div className={"pt-[30px]  bg-[#fff] "}>
                    {data && data._embedded?.gameResponseDtoList.map(each => (
                        <div className={`game-each`} key={each.id}
                             onClick={()=>{
                                if(each.status==='END') navigate(`score/${each.id}`)
                                else navigate(`${each.id}`)
                        }}>
                            <div className={"flex"}>
                                <div className={`h-[30px] text-[14px]`}>
                                    {each.status === 'OPEN' &&
                                        <span className={`game-each-status open`}>참가중</span>}
                                    {each.status === 'PLAYING' &&
                                        <span className={`game-each-status playing`}>경기중</span>}
                                    {each.status === 'END' &&
                                        <span className={`game-each-status end`}>종료됨</span>}

                                    <span>{each.field ? each.field.name : '정보 없음'}</span>
                                    <span className={'vertical-slicer'}/>
                                    <span className={``}>{each.field ? each.field.address : ''}</span>
                                </div>

                            </div>
                            <div className={`w-full flex`}>
                                <div>
                                    <span>{each.host.name}</span>
                                </div>
                                <div className={`flex ml-auto game-each-users`}
                                     style={{width: `${each.players.length * 40}px`}}>
                                    {each.players.map(user => (
                                        <div key={user.id}
                                             className={`game-each-user-each`}>{user.name.substring(user.name.length - 2, user.name.length)}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {!data._embedded &&
                        <Nocontent/>
                    }

                    <div
                        className={`${openStart ? 'w-[150px] overflow-hidden ' : 'w-[50px]'} rounded-full transition-2-ease h-[50px] border-2-white bg-[#ea5716] fixed bottom-[30px] z-50 right-[20px] flex`}>

                        {openStart ?
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-13 h-13 text-[white]" onClick={() => setOpenStart(false)}>
                                    <path fillRule="evenodd"
                                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                                          clipRule="evenodd"/>
                                </svg>

                                <Link to={"/game/quick"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="ml-3 mt-1 bg-[white] w-9 h-9 p-2 rounded-full text-[#ea5716]">
                                        <path fillRule="evenodd"
                                              d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </Link>
                                <Link to={"/game/create"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="ml-1 mt-1 bg-[white] w-9 h-9 p-2 rounded-full text-[#ea5716]">
                                        <path fillRule="evenodd"
                                              d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
                                              clipRule="evenodd"/>
                                        <path
                                            d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z"/>
                                    </svg>
                                </Link>
                            </>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-13 h-13 text-[white]" onClick={() => setOpenStart(true)}
                            >
                                <path fillRule="evenodd"
                                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                      clipRule="evenodd"/>
                            </svg>
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default List;