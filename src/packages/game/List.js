import React, {useState} from 'react';
import WeekSelector from "../../components/datePicker/WeekSelector";
import Nocontent from "../../components/exception/Nocontent";
import TypeSelectBox from "../../components/selectbox/TypeSelectBox";


function List(props) {
    const [date, setDate]= useState(new Date())
    const [ select, setSelect] = useState('전체');
    const [data, setData] =useState();


    const status=[
        {id:0, value:null, label:'전체'},
        {id:1, value:'OPEN', label:'참가중'},
        {id:2, value:'PLAYING', label:'경기중'},
        {id:2, value:'END', label:'종료'}
    ]

    return (
        <>

            <WeekSelector date={date} setDate={setDate}/>
            <div className={"pt-[60px]"}></div>
            <div className={"fixed w-full h-[30px] pt-[2px] line-h-30 bg-[#f0f0f0] text-[13px] px-[15px] flex"}>
                <span className={``}>{data?
                    <>총 10건</>:<>--</>
                } </span>
                <div className={`w-[70px] ml-auto`}>
                    <TypeSelectBox options={status}  select={select} setSelect={setSelect}/>
                </div>
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
            <div className={`w-[50px] h-[50px] fixed bottom-[30px] z-50 right-[20px] flex`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                     className="w-13 h-13 text-[#ea5716]"
                >
                    <path fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                          clipRule="evenodd"/>
                </svg>
            </div>
            </div>
        </>
    );
}

export default List;