import styled from "styled-components";
import shouldForwardProp, {props} from "@styled-system/should-forward-prop";


export const IntroContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn',
})`
    position: relative;
    height: ${(props) =>
            props.isLoggedIn
                    ? 'calc(var(--vh, 1vh) * 100 - 100px)'
                    : 'calc(var(--vh, 1vh) * 100 - 120px)'};
`;
export const IntroMessage = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn',
})`
    width: 100%;
    position:absolute;
    font-size: 35px;
    font-weight: bold;
    @media screen and (min-height: 845px) {
        top: 250px;
    }
    @media screen and (max-height: 844px) {
        top:150px;
    }
`;

export const IntroButton = styled.a.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn',
})`
    left: calc(50% - 65px);
    display: block;
    font-size: 15px;
    border-radius: 30px;
    background-color: var(--main-btn-color);
    padding: 8px 6px;
    color: white;
    width: 130px;
    text-align: center;
    box-shadow:0 4px 9px 2px hsla(210, 2%, 50%, 0.4);
    position:absolute;
    @media screen and (min-height: 845px) {
        top: calc(var(--vh, 1vh) * 100 - 400px); /* 700 이상일 때 */
    }

    @media screen and (max-height: 844px) {
        top: calc(var(--vh, 1vh) * 100 - 300px); /* 700 미만일 때 */
    }
`;



export const IntroButtonDouble = styled.div.withConfig({
    shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isLoggedIn',
})`
    left: calc(50% - 140px);
    width: 280px;
    font-size: 15px;
    text-align: center;
    position:absolute;
    @media screen and (min-height: 845px) {
        top: calc(var(--vh, 1vh) * 100 - 400px); /* 700 이상일 때 */
    }

    @media screen and (max-height: 844px) {
        top: calc(var(--vh, 1vh) * 100 - 300px); /* 700 미만일 때 */
    }
    a{
        border-radius: 30px;
        display: inline-block;
        background-color: var(--main-btn-color);
        padding: 8px 6px;
        color: white;
        width: 130px;
        box-shadow:0 4px 9px 2px hsla(210, 2%, 50%, 0.4);
    }
    a:first-child{
        margin-right: 20px;
    }
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
    background-color: ${(props)=>props.now ? 'gray':'white'};
    border: 1px solid gray;
    text-align: center;
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-right: 5px;
`;