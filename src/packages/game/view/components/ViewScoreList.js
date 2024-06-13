import React, {useEffect} from 'react';
import styled, {keyframes} from "styled-components";

function ViewScoreList({data, isHost, showCurrentRound, setShowCurrentRound}) {

    let vh = 0;
    useEffect(() => {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, []);
    const ScoreList = styled.div`
        text-align: center;
        border: 1px solid #d5d5d5;
        margin-bottom: 5px;
        height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 280px)' : 'calc(var(--vh, 1vh) * 100 - 125px)'};
    `;

    const ScoreListContainer = styled.div`
        position: relative;
        text-align: center;
        border: 1px solid #d5d5d5;
        margin-bottom: 5px;
        overflow-y: auto;
        height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 330px)' : 'calc(var(--vh, 1vh) * 100 - 175px)'};
    `;
    const CurrentRound = styled.button`
        text-align: center;
        position: absolute;
        top:0;
        left: ${props => props.visable ? '0' : '-100%'};
        animation: ${props => props.visable ? slideLeftIn : slideLeftOut} 0.5s cubic-bezier(0.68, -0.45, 0.27, 1.25) forwards;;
        border: 1px solid #d5d5d5;
        margin-bottom: 5px;
        width: 100%;
        background: white;
        overflow-y: auto;
  
        height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 330px)' : 'calc(var(--vh, 1vh) * 100 - 175px)'};
    `;
    const TotalScore = styled.button`
        text-align: center;
        position: absolute;
        top:0;
        left: ${props => props.visable ? '100%' : '0'};
        animation: ${props => props.visable ? slideRightOut : slideRightIn} 0.5s cubic-bezier(0.68, -0.45, 0.27, 1.25) forwards;;
        transition: left 0.5s ease;
        border: 1px solid #d5d5d5;
        margin-bottom: 5px;
        width: 100%;
        background: white;
        overflow-y: auto;

        height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 330px)' : 'calc(var(--vh, 1vh) * 100 - 175px)'};
    `;
    const slideLeftIn = keyframes`
        from {
            left: -100%;
        }
        to {
            left: 0;
        }
    `;

    const slideLeftOut = keyframes`
        from {
            left: 0;
        }
        to {
            left: -100%;
        }
    `;
    const slideRightIn = keyframes`
        from {
            left: 100%;
        }
        to {
            left: 0;
        }
    `;

    const slideRightOut = keyframes`
        from {
            left: 0;
        }
        to {
            left: 100%;
        }
    `;


    return (
        <ScoreList isHost={isHost}>
            <div className={`flex h-[50px] line-h-50 justify-center w-full`}>
                <div className={`w-[120px] text-left ${showCurrentRound ? 'font-bold' : ''}`}  onClick={()=>setShowCurrentRound(true)}>현재 라운드</div>
                <div className={`splicer h-[30px] mt-[10px]`}/>
                <div className={`w-[120px] text-right ${!showCurrentRound ? 'font-bold' : '' }`} onClick={()=>setShowCurrentRound(false)}>라운드 합계</div>
            </div>
            <ScoreListContainer isHost={isHost}>
                <CurrentRound isHost={isHost} visable={showCurrentRound}>
                    {data.id}
                </CurrentRound>
                <TotalScore isHost={isHost} visable={showCurrentRound}>
                    {data.host.name}
                </TotalScore>
            </ScoreListContainer>
        </ScoreList>
    );
}

export default ViewScoreList;