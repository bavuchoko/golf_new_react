import React from 'react';
import styled from "styled-components";
import toast from "react-hot-toast";


const upColor ='var(--main-deep-red)';
const downColor ='var(--main-deep-blue)';

const CountSelectorBox = styled.div`
  position: relative;
  font-size: 1.2rem;
  text-align: center;
`;
const ConterBox=styled.div`
    margin: 0 auto;
    position: relative;
    width: 150px;
    height: 150px;
`;
const CountDisplay=styled.div`
  width: 150px;
  height: 150px;
  font-size: 6rem;
  font-weight: bold;
  line-height: 150px;
  color:  ${theme =>(theme ? 'white': 'white' )};
  position: absolute;
  z-index: 20;
`;
const BluePannel = styled.div`
  //clip-path: polygon(0 0, 100% 0, 50% 100%, 50% 100%);
  background:  ${downColor};
  width: 100%;
  height: 49%;
  position: absolute;
  bottom: 0;
  z-index: 10;
`;
const RedPannel = styled.div`
  //clip-path: polygon(100% 100%, 50% 0, 0 100%);
  background:  ${upColor};
  width: 100%;
  height: 49%;
  position: absolute;
  top: 0;
  z-index: 10;
`;

const UpCounter = styled.div`
  border-radius: 5px 5px 0px 0px;
  border-top: ${upColor};
  border-left: ${upColor};
  border-right: ${upColor};
  width: 100%;
  background: none;
  height: 49%;
  position: absolute;
  top: 0;
  z-index: 30;
`;
const DownCounter = styled.div`
  border-radius: 0px 0px 5px 5px;
  border-left: ${downColor};
  border-right: ${downColor};
  border-bottom: ${downColor};
  background: none;
  width: 100%;
  height: 49%;
  position: absolute;
  bottom: 0;
  z-index: 30;
`;
function NumberSelector({theme, limit, number, setNumber}) {


    const setUpCounter =()=> {
        if(limit?.upper && number>= limit.upper) {
            toast.error('네 명을 넘을 수 없습니다.')
            return;
        }
        setNumber(number+1);
    }

    const setDownCounter =()=> {
        if(limit?.under && number<= limit.under) {
            toast.error('최소 한명 있어야 합니다.')
            return;
        }
        setNumber(number-1);
    }

    return (
            <CountSelectorBox>
                <ConterBox>
                    <CountDisplay>{number}</CountDisplay>
                    <RedPannel></RedPannel>
                    <BluePannel></BluePannel>
                    <UpCounter onClick={setUpCounter}></UpCounter>
                    <DownCounter onClick={setDownCounter}></DownCounter>
                </ConterBox>
            </CountSelectorBox>
    );

}

export default NumberSelector;