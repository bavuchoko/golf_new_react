import styled from "styled-components";


export const SerachAddress = styled.div`
    margin: 0 auto;
    z-index: 40;
    font-size: 11px;
    width: calc(100% - 30px);
    position: fixed;
    background: white;
    top: 70px;
    left: 15px;
    outline: none;
    height: 50px;
    font-size: 18px;
    padding: 10px;
    box-shadow: 0 -2px 9px 1px hsla(210, 4%, 21%, 0.4);
`;

export const GrowupSecion = styled.div`
  position: fixed;
  bottom: 8vh;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  width: 100%;
  height: ${({ drawup, height }) => (drawup ? (height +100) + 'px' : '95px')};
  background: white;
  z-index: 40;
  transition: 0.35s ease;
  box-shadow: 0 -9px 9px 1px hsla(206, 5%, 25%, 0.2);
`;
export const CategorySection = styled.div`
  padding: 0px 5vh 3vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 8vh;
  background: white;
  //border-top: 1px solid var(--main-inner-color);
  box-shadow: 0 -2px 4px 8px hsla(0, 0%, 96%, 0.7);
  z-index: 40;
`;
export const ActionButton = styled.div`
    color: ${props => (props.clicked ? '#166AEAFF' : '')};
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    border-radius: 3px;
    //color: ${props => (props.clicked ? 'white' : '')};
`;
export const TypeSelector = styled.div`
    padding: 10px 30px;
    display: flex;
    width: 100%;
    height: 50px;
    //background: var(--main-inner-color);  
    background: #ebeef3;
`;

export const EachType = styled.div`
  padding: 3px 10px;
  font-size: 15px;
  height: 30px;
  margin-right: 10px;
  border-radius: 30px;
  background: ${({ option }) => (option ? 'var(--main-btn-color)' : 'white')};
  border:${({ option }) => (option ? '' : '1px solid var(--main-inner-light-color)')};
  color: ${({ option }) => (option ? 'white' : 'black')};
  box-shadow:  ${({ option }) => (option ? ' 0 3px 7px 2px hsla(205,7%,51%,.7);' : ' ')}; 
  
`;


export const FieldListContainer = styled.div`
  width: 100%;
  height: calc(100vh - 294px);
  overflow-y: scroll;
`;
export const SimpleFieldListContainer = styled.div`
    width: 100%;
    max-height: 200px;
    background-color: #d9e0ec;
    padding: 1px 0;
    overflow-y: scroll;
`;

export const EachField = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 15px;
  height: 80px;
  background: ${({ selected }) => (selected ? '#f0fdf0' : 'white')};
  border-bottom: 1px solid var(--main-inner-color);
`;

export const SimpleEachField = styled.div`
  display: ${({ selected }) => (selected ? 'flex' : 'none')};
  padding: 0 30px;  
  width: 100%;
  background-color: white;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid var(--main-inner-color);
`;


export const EachFieldFlag = styled.div`
  margin-top: 15px;
  background: white;
  margin-right: 15px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 80px;
`;
export const EachFiledHistoryMode = styled.div`
  margin-left: auto;
  margin-top: 25px;
  height: 15px;
  border-bottom: 1px solid black;
  width: 20px;
  
  text-align: center;
`;