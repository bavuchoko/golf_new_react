import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Trash from '../../../../resources/icons/trashCan.png'

function StepPlayers({setStep, data, fnc, user}) {
    const [tempName, setTempName] =useState('');
    const [idx, setIdx] =useState(0);
    const navigate = useNavigate();

    function removePlayer(index){
        const newNames = [...data.names];
        newNames.splice(index, 1);
        fnc({...data, names: newNames});

    }


    function setPlayerNames() {
        if(data.names?.length > 2){
            alert('최대 4명까지 입력할 수 있습니다.');
            return;
        }
        if(tempName.trim() ==='' || tempName == null) {
            alert('이름을 입력하세요')
            return;
        }
        if(tempName!=='' && idx < 2) setIdx(()=>idx+1)
        if (!data.names) {
            fnc({...data, names: [tempName]});
        }else if (data.names.length < 3 && tempName.trim() !== '') {
            const newNames = [...data.names];
            newNames[idx] = tempName;
            fnc({...data, names: newNames});
        }
    }

    return (
        <div className={"px-[30px]"}>
            <div className="w-full line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]" >
                    <p onClick={()=>navigate(-1)}>뒤로</p>
                    <div className={"ml-auto w-[85px]"}>
                        <span className={" text-[#354db0]"} onClick={() => {
                            setStep('경기장')
                        }}>경기장 선택</span>
                    </div>
                </div>
            </div>


            <div className={``}></div>
            <div className={`w-full mt-[30px]`}>
                <input type={``} id={'names'} value={tempName} onChange={
                    (e)=>setTempName(e.target.value)} className={"border-bottom-black indent-3 w-full h-[55px] no-outline "} placeholder={'동반자 이름'} autoFocus={true}/>
                <button  className={"mt-5 nextBtn" }  onClick={()=>{

                    setPlayerNames();
                    setTempName('')
                    document.getElementById('names').focus();
                }}>추가</button>
            </div>

            <div>
                <div className={`text-2xl flex h-[30px] mt-[20px] mb-[5px]` } >

                    {/*<span className={`mr-3 inline-block`}>1번</span>*/}
                    <p className={``} placeholder={ ``}>{user.name}</p>
                </div>
            {data?.names?.map((_, index) =>(
                <div className={`text-2xl flex h-[30px] mb-[5px]`} key={index}>

                    {/*<span className={`mr-3 inline-block`}>{index + 2}번</span>*/}
                    <p className={`text-left w-[100px]`} placeholder={``}>{data.names[index]}</p>


                    <img src={Trash} className={`ml-[20px] w-[25px] h-[25px]`} onClick={()=> {
                        removePlayer(index);
                        document.getElementById('names').focus();
                    }}/>
                </div>
            ))}
            </div>


        </div>
    );
}

export default StepPlayers;