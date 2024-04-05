import React, {useState} from 'react';
import WeekSelector from "../../components/datePicker/WeekSelector";
import Nocontent from "../../components/exception/Nocontent";

function List(props) {
    const [date, setDate]= useState(new Date())
    const [data, setData] =useState();
    // const data=[
    //     {
    //         id:1,
    //         field:{name:"1경기장", address:"세종 123"},
    //         playDate:'2024-03-31',
    //         host:{id:1, name:"김종수"},
    //         players:[
    //             {id:1, name:"김종수"},
    //             {id:2, name:"이종수"},
    //             {id:3, name:"박종수"},
    //         ],
    //         status:"PLAYING"
    //     },
    //     {
    //         id:2,
    //         field:{name:"1경기장", address:"세종 123"},
    //         playDate:'2024-03-31',
    //         host:{id:6, name:"김종훈"},
    //         players:[
    //             {id:6, name:"김종훈"},
    //             {id:4, name:"이수근"},
    //             {id:5, name:"홍명보"},
    //             {id:1, name:"김종수"},
    //         ],
    //         status:"PLAYING"
    //     },
    //     {
    //         id:3,
    //         field:{name:"1경기장", address:"세종 123"},
    //         playDate:'2024-03-31',
    //         host:{id:6, name:"김종훈"},
    //         players:[
    //             {id:6, name:"김종훈"},
    //             {id:4, name:"이수근"},
    //             {id:5, name:"홍명보"},
    //             {id:1, name:"김종수"},
    //         ],
    //         status:"PLAYING"
    //     },
    //     {
    //         id:3,
    //         field:null,
    //         playDate:'2024-03-31',
    //         host:{id:6, name:"김종훈"},
    //         players:[
    //             {id:6, name:"김종훈"},
    //             {id:4, name:"이수근"},
    //             {id:5, name:"홍명보"},
    //             {id:1, name:"김종수"},
    //         ],
    //         status:"END"
    //     },
    //     {
    //         id:3,
    //         field:{name:"1경기장", address:"세종 123"},
    //         playDate:'2024-03-31',
    //         host:{id:6, name:"김종훈"},
    //         players:[
    //             {id:4, name:"이수근"},
    //             {id:5, name:"홍명보"},
    //             {id:1, name:"김종수"},
    //         ],
    //         status:"OPEN"
    //     },
    //     {
    //         id:3,
    //         field:{name:"1경기장", address:"세종 123"},
    //         playDate:'2024-03-31',
    //         host:{id:6, name:"김종훈"},
    //         players:[
    //             {id:4, name:"이수근"},
    //             {id:5, name:"홍명보"},
    //             {id:1, name:"김종수"},
    //         ],
    //         status:"OPEN"
    //     },
    //     {
    //         id:3,
    //         field:{name:"1경기장", address:"세종 123"},
    //         playDate:'2024-03-31',
    //         host:{id:6, name:"김종훈"},
    //         players:[
    //             {id:4, name:"이수근"},
    //             {id:5, name:"홍명보"},
    //             {id:1, name:"김종수"},
    //         ],
    //         status:"OPEN"
    //     },
    //     {
    //         id:3,
    //         field:{name:"1경기장", address:"세종 123"},
    //         playDate:'2024-03-31',
    //         host:{id:6, name:"김종훈"},
    //         players:[
    //             {id:4, name:"이수근"},
    //             {id:5, name:"홍명보"},
    //             {id:1, name:"김종수"},
    //         ],
    //         status:"OPEN"
    //     }
    // ]

    return (
        <>

            <WeekSelector date={date} setDate={setDate}/>
            <div className={"pt-[60px]"}></div>
            <div className={"fixed w-full h-[30px] pt-[2px] line-h-30 bg-[#f0f0f0] text-[13px] px-[15px]"}>

                <span className={``}>{data?
                    <>총 10건</>:<>--</>
                } </span>
                <span className={`float-right text-center w-[90px] text-right`}>
                    전체
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="ml-2 w-4 h-4 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                    </svg>
                </span>


            </div>
            <div className={"pt-[30px]  bg-[#fff] "}>
            {data ? data._embedded.fieldsResponseDtoList.map(each=>(
                <div className={`game-each`} key={each.id}>
                    <div className={"flex"}>
                        <div className={`h-[30px] text-[14px]`}>
                            {each.status==='OPEN' &&
                                <span className={`game-each-status open`}>참가중</span>}
                            {each.status==='PLAYING' &&
                                <span className={`game-each-status playing`}>경기중</span>}
                            {each.status==='END' &&
                                <span className={`game-each-status end`}>종료됨</span>}

                            <span>{each.field ? each.field.name: '정보 없음'}</span>
                            <span className={'vertical-slicer'}/>
                            <span>{each.field ? each.field.address: ''}</span>
                        </div>

                    </div>
                    <div className={`w-full flex`}>
                        <div>
                            <span>{each.host.name}</span>
                        </div>
                        <div className={`flex ml-auto game-each-users`} style={{ width: `${each.players.length * 40}px` }}>
                        {each.players.map(user=>(
                            <div className={`game-each-user-each`}>{user.name.substring(user.name.length-2,user.name.length)}</div>
                        ))}
                        </div>
                    </div>
                </div>
            ))
            :
            (
                <Nocontent />
            )
            }
            </div>
        </>
    );
}

export default List;