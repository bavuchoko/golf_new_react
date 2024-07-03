import React, {useEffect, useRef, useState} from 'react';
import {
    MemoContainer,
    MemoContent,
    MemoController,
    MemoControllerPointer,
    MemoPushButton,
    MemoTextArea
} from "../style/StyleView";
import {createMemo, getMemos, pushMemo} from "../../../../api/memo/MemoService";
import {useDispatch} from "react-redux";
import {set} from "../../../../redux/slice/memoSlice";

function MemoOnGame({isHost, field, selected}) {
    const [memos, setMemos]= useState([]);
    const [memo, setMemo]= useState();
    const [showUp, setShowUp]= useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if(field)
            getMemos(field.id).then(r => {
                if(r)
                    setMemos(r.data)
                    dispatch(set(r.data))
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
                dispatch(set(r.data))
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
                setShowUp(false)
                setMemos(r.data)
                dispatch(set(r.data))
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
    if(!field){
        return <div className={'w-full h-[40px]'}></div>;
    }
    return (
        <MemoContainer>
            <MemoController showUp={showUp} isHost={isHost}>
                <MemoControllerPointer  onClick={() => setShowUp(!showUp)}>
                    <div className={`draw-show-handler-pointer `} />
                    <p className={`pt-[3px] w-full`}> {showUp ? '닫기' : `${field.name} ${selected.hole}홀  메모 보기`}</p>
                </MemoControllerPointer>

                <MemoContent showUp={showUp} isHost={isHost} className={``} style={{}} >
                    {memo ?
                        (clicked ?
                                <div className={''}  ref={textAreaRef}>
                                    <MemoTextArea
                                        showUp={showUp} isHost={isHost}
                                        className="w-full radius-no indent-2 no-outline text-[14px] text-[black]"
                                        value={memoContent}
                                        autoFocus={true}
                                        onChange={(e) => setMemoContent(e.target.value)}
                                    />
                                    <MemoPushButton  onClick={showdateMemo}>수정</MemoPushButton>
                                </div>
                                :
                                <pre key={memo.round}
                                     className={'text-left min-h-[200px]'}
                                    onClick={()=>setClicked(true)}
                                >{memo.content}</pre>
                        )
                        :
                        <>
                            <MemoTextArea
                                showUp={showUp} isHost={isHost}
                                placeholder={'내용을 입력하세요'}
                                onChange={(e) => setMemoContent(e.target.value)}
                            />
                            <MemoPushButton onClick={saveMemo}>저장</MemoPushButton>
                        </>
                    }
                </MemoContent>

            </MemoController>
        </MemoContainer>

    );
}

export default MemoOnGame;