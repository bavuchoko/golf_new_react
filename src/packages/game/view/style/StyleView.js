import styled, {keyframes} from "styled-components";
import shouldForwardProp, {props} from "@styled-system/should-forward-prop";


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
    height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 290px)' : 'calc(var(--vh, 1vh) * 100 - 165px)'};
`;

export const ScoreListContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    position: relative;
    text-align: center;
    overflow-y: auto;
    overflow-x: hidden;
    height: ${props => props.isHost ? 'calc(var(--vh, 1vh) * 100 - 350px)' : 'calc(var(--vh, 1vh) * 100 - 215px)'};
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
    height: ${props => props.open ? 'calc(var(--vh, 1vh) * 100 - 215px)' : '80px'};;
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
    height: ${(props) => (props.showUp ? props.isHost ? 'calc(var(--vh, 1vh) * 100 - 360px)' : 'calc(var(--vh, 1vh) * 100 - 210px)' : '38px')};
    border-top: 1px solid var(--main-gray-line);
    background:  ${(props) => (props.showUp? 'white':'var(--main-btn-color);')}; 
    z-index: 40;
    color: ${(props)=>(props.showUp? 'balck' : 'white')};
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
    display:  ${props => props.showUp ? 'block' : 'none'};
    padding: ${props => props.showUp ? '10px' : ''};
    overflow-y: auto;
    height: ${props =>  (props.showUp ? props.isHost ? 'calc(var(--vh, 1vh) * 100 - 400px)' : 'calc(var(--vh, 1vh) * 100 - 250px)' : '38px')};
`;
export const MemoTextArea = styled.textarea.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    border: 1px solid var(--main-inner-color);
    margin: auto;
    margin-bottom: 5px;
    text-indent: 5px;
    width: calc(100%);
    display:  ${props => props.showUp ? 'block' : 'none'};
    height: ${(props) => (props.showUp ? props.isHost ? 'calc(var(--vh, 1vh) * 100 - 510px)' : 'calc(var(--vh, 1vh) * 100 - 370px)' : '38px')};
`;






export const MemoPushButton = styled.button.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen'
})`
    width: 90px;
    height: 45px;
    border-radius: 2px;
    float: right;
    color: white;
    background: var(--main-btn-color);
`;
