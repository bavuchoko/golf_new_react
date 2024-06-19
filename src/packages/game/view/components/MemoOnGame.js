import React, {useEffect, useState} from 'react';
import {
    CurrentRound,
    MemoContainer, MemoContent,
    MemoController, MemoControllerPointer, MemoTextArea,
    ScoreList,
    ScoreListContainer,
    TotalScore
} from "../style/StyleView";

function MemoOnGame({up, setUp, isHost, memos, round}) {

    const [clicked, setClicked] = useState(false);

    return (
        <MemoContainer>
            <MemoController up={up} isHost={isHost}>
                <MemoControllerPointer  onClick={() => setUp(!up)}>
                    <div className={`draw-up-handler-pointer `} />
                    <p className={`pt-[3px] w-full`}> {up ? '닫기' : '현재 홀 기록내용 보기'}</p>
                </MemoControllerPointer>

                <MemoContent up={up} className={``} style={{}}>
                    {memos ? (
                        memos.map(memo => {
                            if (round === memo.round) {
                                if (!clicked) {
                                    return <pre key={memo.round}>{memo.content}</pre>;
                                } else {
                                    return (
                                        <MemoTextArea
                                            up={up} isHost={isHost}
                                            className="w-full radius-no indent-2 no-outline text-[14px] text-[black]"
                                            value={memo.content}
                                            onChange={() => {}}
                                        />
                                    );
                                }
                            }
                            return null;
                        })
                    ) : (
                         <div className={`keyFix`}>
                        <MemoTextArea
                            up={up} isHost={isHost}
                            placeholder={'내용을 입력하세요'}
                            onChange={() => {}}
                        />
                         </div>
                    )}
                </MemoContent>

            </MemoController>
        </MemoContainer>

    );
}

export default MemoOnGame;