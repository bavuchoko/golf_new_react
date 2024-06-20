import React, {useEffect, useRef, useState} from 'react';
import {
    CurrentRound,
    MemoContainer, MemoContent,
    MemoController, MemoControllerPointer, MemoPushButton, MemoTextArea,
    ScoreList,
    ScoreListContainer,
    TotalScore
} from "../style/StyleView";
import {createMemo, pushMemo} from "../../../../api/memo/MemoService";

function MemoOnGame({up, setUp, isHost, memo, field, round}) {

    const [clicked, setClicked] = useState(false);
    const [memoContent, setMemoContent] = useState(memo?.content);
    const textAreaRef = useRef(null);

    const updateMemo =()=>{
        const newMemo = {
            ...memo,
            content: memoContent
        };
        pushMemo(newMemo)

    }
    const saveMemo =()=>{
        const newMemo = {
            field:{id:field.id},
            round: round,
            content: memoContent
        };
        createMemo(newMemo)
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
        if (clicked && textAreaRef.current) {
            const length = textAreaRef.current.value.length;
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(length, length);
        }
    }, [clicked]);
    if(!field){
        return <></>;
    }

    console.log(memoContent)
    return (
        <MemoContainer>
            <MemoController up={up} isHost={isHost}>
                <MemoControllerPointer  onClick={() => setUp(!up)}>
                    <div className={`draw-up-handler-pointer `} />
                    <p className={`pt-[3px] w-full`}> {up ? '닫기' : `${field.name} ${round}홀  메모 보기`}</p>
                </MemoControllerPointer>

                <MemoContent up={up} isHost={isHost} className={``} style={{}} >
                    {memo ?
                        (clicked ?
                                <div className={''}>
                                    <MemoTextArea
                                        ref={textAreaRef}
                                        up={up} isHost={isHost}
                                        className="w-full radius-no indent-2 no-outline text-[14px] text-[black]"
                                        value={memoContent}
                                        onChange={(e) => setMemoContent(e.target.value)}
                                    />
                                    <MemoPushButton onClick={updateMemo}>저장</MemoPushButton>
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
                                up={up} isHost={isHost}
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