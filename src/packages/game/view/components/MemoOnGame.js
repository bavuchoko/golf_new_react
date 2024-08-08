import React, {useEffect, useRef, useState} from 'react';
import {MemoContainer, MemoContent, MemoController, MemoPushButton, MemoTextArea} from "../style/StyleView";
import {createMemo, getMemos, pushMemo} from "../../../../api/memo/MemoService";
import {useDispatch, useSelector} from "react-redux";
import {set} from "../../../../redux/slice/memoSlice";
import Pencil from "../../../../resources/icons/pencil.png";
import Close from "../../../../resources/icons/close.png";
import {closer, toggleModal} from "../../../../redux/slice/openerSlice";

function MemoOnGame({isHost, field, selected}) {
    const [memos, setMemos]= useState([]);
    const [memo, setMemo]= useState();
    const open =useSelector(state => state.opener.MemoOnGame);
    const dp = useDispatch();
    const ref = useRef(null);

    useEffect(() => {
        if(field)
            getMemos(field.id).then(r => {
                if(r)
                    setMemos(r.data)
                    dp(set(r.data))
            })
        setMemo(findMemo())
    }, []);
    useEffect(() => {
        setMemo(findMemo())
    }, [memos, selected]);


    function findMemo(){
        if(memos && memos.length >0)
            return memos.find(memo=>
                (memo.course === selected.course)
                && (memo.hole === selected.hole)
            )
        else return undefined;
    }

    const [clicked, setClicked] = useState(false);
    const [memoContent, setMemoContent] = useState(memo?.content);
    const textAreaRef = useRef(null);

    const showdateMemo =()=>{
        const newMemo = {
            account:{id: memo.account.id},
            field:{id: memo.field.id},
            course: memo.course,
            hole: memo.hole,
            content: memoContent
        };
        pushMemo(newMemo).then(r=>{
            if(r.status===200){
                setClicked(false)
                setMemos(r.data)
                dp(set(r.data))
            }
        })

    }
    const saveMemo =()=>{
        const newMemo = {
            field:{id:field.id},
            course:selected.course,
            hole:selected.hole,
            content: memoContent
        };
        createMemo(newMemo).then(r=>{
            if(r.status==200){
                setClicked(false)
                dp(closer({key:'MemoOnGame'}))
                setMemos(r.data)
                dp(set(r.data))
            }
        })
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
                setClicked(false);
                setMemoContent(memo?.content)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [textAreaRef]);
    useEffect(() => {
        setMemoContent(memo?.content);
    }, [memo]);

    useEffect(() => {
        //외부 클릭시 userMenu 닫음
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                dp(closer({key:'MemoOnGame'}))
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [ref]);


    if(!field){
        return <div className={'w-full h-[0px]'}></div>;
    }

    return (

        <MemoContainer isHost={isHost} ref={ref}>
            <MemoContent  open={open} className={`${open ? 'animate-in' : 'animate-out'}`} >
                <div  className={`bg- py-2 bg-black text-[white] h-[34px]`} onClick={()=>dp(closer({key:'MemoOnGame'}))} >
                    <img src={Close} className={`w-[20px] bg-white float-right mr-[10px]`} onClick={()=>dp(closer({key:'MemoOnGame'}))} />
                </div>
                <div className={`mx-[10px] mt-[10px] mb-[20px]`}>
                    <span className={`inline-block mr-2`}>{field.name}</span>
                    <span className={`inline-block mr-2`}>{selected.hole} 홀</span>
                </div>
                {memo ?
                    (clicked ?
                                        <div className={''}  ref={textAreaRef}>
                                            <MemoTextArea
                                                open={open} isHost={isHost}
                                                className="w-full radius-no indent-2 no-outline text-[13px] text-[black]"
                                                value={memoContent}
                                                autoFocus={true}
                                                onChange={(e) => setMemoContent(e.target.value)}
                                            />
                                            <MemoPushButton  onClick={showdateMemo}>수정</MemoPushButton>
                                        </div>
                                        :
                                        <>
                                        <pre key={memo.round}
                                             className={'text-left min-h-[200px] bg-amber-50 m-2'}
                                            onClick={()=>setClicked(true)}
                                        >{memo.content}</pre>
                                            <p className={`text-center text-[15px]`}>위 영역을 클릭하여 수정하세요</p>
                                        </>
                                )
                                :
                                <>
                                    <MemoTextArea
                                        open={open} isHost={isHost}
                                        placeholder={'내용을 입력하세요'}
                                        onChange={(e) => setMemoContent(e.target.value)}
                                    />
                                    <MemoPushButton onClick={saveMemo}>저장</MemoPushButton>
                                </>
                            }
                        </MemoContent>

            <MemoController
                onClick={() => dp(toggleModal({key:'MemoOnGame'}))}>
                <img src={Pencil} className={`w-[40px]`}/>
            </MemoController>
        </MemoContainer>


    );
}

export default MemoOnGame;