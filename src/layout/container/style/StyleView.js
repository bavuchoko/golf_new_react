import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";


export const IntroContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn'
})`
    background: #fafafa;
    height: ${props => props.isLoggedIn ? 'calc(var(--vh, 1vh) * 100 - 45px)' : 'calc(var(--vh, 1vh) * 100 - 65px)'}; 
`;
export const IntroSection = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn'
})`
    position: relative;
`;

export const IntroContents = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn'
})`
    background: #fafafa;
    height: ${props => props.isLoggedIn ? 'calc(var(--vh, 1vh) * 100 - 45px)' : 'calc(var(--vh, 1vh) * 100 - 65px)'};
`;

export const IntroActions = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn'
})`
    z-index: 20;
    left: 0;
    position: absolute;
    bottom: 80px;
    width: 100%;
    height: 40px;
`;


export const IntroBlueRoundButton = styled.a`
    display: inline-block;
    font-size: 15px;
    border-radius: 30px;
    background-color: var(--main-btn-color);
    padding: 8px 6px;
    color: white;
    width: 130px;
    text-align: center;
    box-shadow:0 4px 9px 2px hsla(210, 2%, 50%, 0.4);
`;