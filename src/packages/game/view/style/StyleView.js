import styled, {keyframes} from "styled-components";
import shouldForwardProp, {props} from "@styled-system/should-forward-prop";
import BackBtn from '../../../../resources/icons/backpress.png';

export const Counter = styled.div`
        display: flex;
        margin-bottom: 5px;
        width: 100%;
        height: 120px;
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
    scale: ${props => props.clicked ? '1' : '1'};
    z-index: ${props => props.clicked ? '3' : ''};
    box-shadow: ${props => props.clicked ?'2px 2px 7px #303038' : ''}; 
`;

export const LefterBtn = styled.button`
        padding: 0 10px;
        
        text-align: center;
        border: 1px solid #d5d5d5;
        height: 120px;
        width: calc(50% - 60px);
    &:active {
        transform: scale(0.97);
    }
    `;
export const RighterBtn = styled.button.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    padding: 0 10px;
    text-align: center;
    border: 1px solid #d5d5d5;
    height: ${props => props.endable ? '60px': '120px'};
    width: 100%;
    &:active {
        transform: scale(0.97);
    }
    `;
export const EndBtn = styled.button.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    padding: 0 10px;
    text-align: center;
    border: 1px solid #d5d5d5;
    height: 60px;
    display: ${props => props.endable ? 'block': 'none'};
    width: 100%;
    &:active {
        transform: scale(0.97);
    }
    `;

export const ScoreList = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`     
    text-align: center;
    height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 250px)' : 'calc(var(--vh, 1vh) * 100 - 130px)'};
`;

export const ScoreListContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    position: relative;
    text-align: center;
    overflow-y: auto;
    overflow-x: hidden;
    height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 310px)' : 'calc(var(--vh, 1vh) * 100 - 230px)'};
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
    max-height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 350px)' : 'calc(var(--vh, 1vh) * 100 - 215px)'};
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
    max-height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 350px)' : 'calc(var(--vh, 1vh) * 100 - 215px)'};
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

export const MemoContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isHost'
})`
    position: fixed;
    right: 20px;
    width: 50px;
    z-index:10;
    bottom:  ${props => props.isHost ? '220px' : '120px'};
    height: 50px;
`;
export const MemoController = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 0px;
    position: absolute;
    background:  white; 
    z-index: 10;
    box-shadow:0 4px 9px 2px hsla(0, 1%, 17%, 0.5);
`;

export const MemoContent = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    position: fixed;
    width: calc(100% - 20px);
    height: 350px;
    background-color: #ffffff;
    border-radius: 3px;
    z-index: 20;
    bottom: 200px;
    right: 10px;
    transform-origin: bottom right;
    box-shadow: 0 4px 9px 2px hsla(0, 1%, 17%, 0.5);

`;
export const MemoTextArea = styled.textarea.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    border: 1px solid var(--main-inner-color);
    margin: 10px;
    margin-top: 20px;
    text-indent: 5px;
    width: calc(100% - 20px);
    font-size: 17px;
    display:  ${props => props.open ? 'block' : 'none'};
    height: 200px;
`;






export const MemoPushButton = styled.button.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    width: 80px;
    height: 40px;
    border-radius: 1px;
    margin-right: 10px;
    float: right;
    color: white;
    background: var(--main-btn-color);
`;


export const BackPressButton = styled.button`
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    box-shadow:0 4px 9px 2px hsla(0, 1%, 17%, 0.5);
    left: 20px;
    bottom:  ${props => props.isHost ? '220px' : '120px'};
    background: url(${BackBtn}) no-repeat center center;
    background-size: cover;
    background-size: 70%;
    background-color: white;
    
    
`;
