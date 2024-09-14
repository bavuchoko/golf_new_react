import React, {useState} from 'react';
import Trash from '../../../../resources/icons/trashCan.png'
import {useSelector} from "react-redux";

function StepPlayers({names, setNames}) {

    const user = useSelector((state) => state.user.user);

    const [inputText, setInputText] =useState()

    function removePlayer(index){
        const newNames = [...names];
        newNames.splice(index, 1);
        setNames(newNames);

    }


    function setPlayerNames() {
        if(names?.length > 2){
            alert('최대 3명까지 입력할 수 있습니다.');
            return;
        }
        if(inputText.trim() ==='' || inputText == null) {
            alert('이름을 입력하세요')
            return;
        }

        console.log(inputText)
        console.log(names)
        const newNames = [...names, inputText]
        console.log(newNames)

        setNames(newNames)
    }

    return (
        <div className={"px-[30px] mt-[30px]"}>
            <p>동반자 입력</p>
            <div>
                <div className={`text-[18px] flex h-[30px] mt-[20px] mb-[5px]`}>

                    {/*<span className={`mr-3 inline-block`}>1번</span>*/}
                    <p className={``} placeholder={``}>{user.name}</p>
                </div>
                {names.map((_, index) => (
                    <div className={`text-[18px] flex h-[30px] mb-[5px]`} key={index}>

                        {/*<span className={`mr-3 inline-block`}>{index + 2}번</span>*/}
                        <p className={`text-left w-[100px]`} placeholder={``}>{names[index]}</p>


                        <img src={Trash} className={`ml-[20px] w-[25px] h-[25px]`} onClick={() => {
                            removePlayer(index);
                            document.getElementById('names').focus();
                        }}/>
                    </div>
                ))}
            </div>

            <div className={`w-[160px] mt-[20px] relative`}>
                <input type={``} id={'names'} value={inputText} onChange={
                    (e) => setInputText(e.target.value)}
                       className={"border-bottom-black w-full h-[45px] no-outline "} placeholder={'동반자 이름'}
                       autoFocus={true}/>
                <button className={"mt-5 nextBtn"} onClick={() => {
                    setPlayerNames();
                    setInputText('')
                    document.getElementById('names').focus();
                }}>추가
                </button>
            </div>

        </div>
    );
}

export default StepPlayers;