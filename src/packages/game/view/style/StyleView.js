import styled, {keyframes} from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";


export const Counter = styled.div`
        display: flex;
        margin-bottom: 5px;
        width: 100%;
        height: 140px;
    `;


export const MemoContainer = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 2px;
    height: 40px;
`;
export const MemoController = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    position: absolute;
    bottom: 0;
    border-radius: 7px 7px 0 0;
    width: 100%;
    height: ${(props) => (props.up ? props.isHost ? 'calc(var(--vh, 1vh) * 100 - 360px)' : 'calc(var(--vh, 1vh) * 100 - 210px)' : '38px')};
    border-top: 1px solid var(--main-gray-line);
    background:  ${(props) => (props.up? 'white':'var(--main-btn-color);')}; 
    z-index: 40;
    color: ${(props)=>(props.up? 'balck' : 'white')};
    text-align: center;
    font-size: 17px;
    transition: 0.35s ease;
    box-shadow: 0 -4px 4px 1px hsl(206deg 3.6% 63.09% / 20%)
`;

export const MemoControllerPointer = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    border-radius: 7px 7px 0 0;
    width: 100%;
    height: 38px;
    padding-top: 5px;
    background: var(--main-btn-color); 
    z-index: 40;
    color: white;
    text-align: center;
    font-size: 17px;
    transition: 0.35s ease;
`;

export const MemoContent = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    display:  ${props => props.up ? 'block' : 'none'};;
`;

export const PlayerDiv = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    text-align: center;
    border: 1px solid  var(--main-gray-line);
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
    height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 320px)' : 'calc(var(--vh, 1vh) * 100 - 165px)'};
`;

export const ScoreListContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    position: relative;
    text-align: center;
    overflow-y: auto;
    overflow-x: hidden;
    height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 370px)' : 'calc(var(--vh, 1vh) * 100 - 215px)'};
`;
export const CurrentRound = styled.button.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    text-align: center;
    position: absolute;
    top:0;
    left: ${props => props.visable ? '0' : '-100%'};
    animation: ${props => props.visable ? slideLeftIn : slideLeftOut} 0.5s cubic-bezier(0.68, -0.45, 0.27, 1.25) forwards;
    width: 100%;
    background: white;
    overflow-y: auto;
    max-height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 370px)' : 'calc(var(--vh, 1vh) * 100 - 215px)'};
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
    width: 100%;
    background: white;
    overflow-y: auto;
    max-height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 370px)' : 'calc(var(--vh, 1vh) * 100 - 215px)'};
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
