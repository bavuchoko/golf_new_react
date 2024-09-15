import styled from "styled-components";
import shouldForwardProp from "@styled-system/should-forward-prop";


export const IntroContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn'
})`
    background: #fafafa;
`;
export const IntroContents = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn'
})`
    background: #fafafa;
`;


export const IntroMessageContainer = styled.div`
    position: absolute;
    left: calc(50% - 140px);
    @media screen and (min-height: 845px) {
        top: 300px;
    }
    @media screen and (max-height: 844px) {
        top:200px;
    }
`;

export const IntroButtonContainer = styled.div`
    width: 320px;
    position: absolute;
    display: flex;
    // top: ${props => props.isLoggedIn ? 'calc(var(--vh, 1vh) * 100 - 45px)' : 'calc(var(--vh, 1vh) * 100 - 65px)'};
    @media screen and (min-height: 845px) {
        top: calc(var(--vh, 1vh) * 100 - 300px); /* 700 이상일 때 */
    }

    @media screen and (max-height: 844px) {
        top: calc(var(--vh, 1vh) * 100 - 200px); /* 700 미만일 때 */
    }
    left: calc(50% - 160px);
`;

export const IntroBlueRoundButton = styled.a`
    display: block;
    font-size: 15px;
    margin: auto;
    border-radius: 30px;
    background-color: var(--main-btn-color);
    padding: 8px 6px;
    color: white;
    width: 130px;
    text-align: center;
    box-shadow:0 4px 9px 2px hsla(210, 2%, 50%, 0.4);
`;


export const IndicatorDot = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn'
})`
    border-radius: 50%;
    background-color: gray;
    text-align: center;
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-right: 5px;
`;