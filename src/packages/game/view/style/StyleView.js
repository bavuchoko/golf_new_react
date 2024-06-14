import styled, {keyframes} from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";


export const Counter = styled.div`
        display: flex;
        margin-bottom: 5px;
        width: 100%;
        height: 140px;
    `;

export const PlayerDiv = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    text-align: center;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    height: 70px;
    background: ${props => props.clicked ? '#303038' : 'white'};
    color: ${props => props.clicked ? 'white' : ''};
    scale: ${props => props.clicked ? '1.1' : '1'};
    z-index: ${props => props.clicked ? '3' : ''};
    box-shadow: ${props => props.clicked ?'2px 2px 7px #303038' : ''}; 
`;

export const LefterBtn = styled.button`
        padding: 0 10px;
        
        text-align: center;
        border: 1px solid #d5d5d5;
        height: 140px;
        width: calc(50% - 75px);
    `;
export const RighterBtn = styled.button`
        padding: 0 10px;
        
        text-align: center;
        border: 1px solid #d5d5d5;
        height: 140px;
        width: calc(50% - 75px);
    `;

export const ScoreList = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`     
    text-align: center;
    margin-bottom: 5px;
    height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 280px)' : 'calc(var(--vh, 1vh) * 100 - 125px)'};
`;

export const ScoreListContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    position: relative;
    text-align: center;
    margin-bottom: 5px;
    overflow-y: auto;
    height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 330px)' : 'calc(var(--vh, 1vh) * 100 - 175px)'};
`;
export const CurrentRound = styled.button.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    text-align: center;
    position: absolute;
    top:0;
    left: ${props => props.visable ? '0' : '-100%'};
    animation: ${props => props.visable ? slideLeftIn : slideLeftOut} 0.5s cubic-bezier(0.68, -0.45, 0.27, 1.25) forwards;;
    
    margin-bottom: 5px;
    width: 100%;
    background: white;
    overflow-y: auto;
    max-height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 330px)' : 'calc(var(--vh, 1vh) * 100 - 175px)'};
`;
export const TotalScore = styled.button.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    text-align: center;
    position: absolute;
    top:0;
    left: ${props => props.visable ? '100%' : '0'};
    animation: ${props => props.visable ? slideRightOut : slideRightIn} 0.5s cubic-bezier(0.68, -0.45, 0.27, 1.25) forwards;;
    transition: left 0.5s ease;
    border-top: 1px solid #d5d5d5;
    margin-bottom: 5px;
    width: 100%;
    background: white;
    overflow-y: auto;
    max-height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 330px)' : 'calc(var(--vh, 1vh) * 100 - 175px)'};
`;
export const slideLeftIn = keyframes`
        from {
            left: -100%;
        }
        to {
            left: 0;
        }
    `;

export const slideLeftOut = keyframes`
        from {
            left: 0;
        }
        to {
            left: -100%;
        }
    `;
export const slideRightIn = keyframes`
        from {
            left: 100%;
        }
        to {
            left: 0;
        }
    `;

export const slideRightOut = keyframes`
        from {
            left: 0;
        }
        to {
            left: 100%;
        }
    `;
