import styled from "styled-components";


export const SerachAddress = styled.div`
  margin: 0 auto;
  z-index: 40;
  width: calc(100% - 30px);
  position: fixed;
  background: white;
  top: 70px;
  left: 15px;
  outline: none;
  height: 50px;
  font-size: 18px;
  padding: 10px;
  box-shadow: 0 -2px 9px 1px hsla(205,7%,51%,.2);
`;

export const AddFieldSection = styled.div`
  position: fixed;
  bottom: 9vh;
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
    padding: 1vh 8vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr); 
    gap: 15px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 9vh;
    background: white;
    border-top: 1px solid var(--main-inner-color) ;
    z-index: 40;
`;
export const ActionButton = styled.div`
    background: ${props => (props.clicked ? '#166AEAFF' : '')};
    font-size: 12px;
    text-align: center;
    border-radius: 3px;
    color: ${props => (props.clicked ? 'white' : '')};
`;
export const TypeSelector = styled.div`
  padding: 10px 30px;
  display: flex;
  width: 100%;
  height: 50px;
  //background: var(--main-inner-color);
  
`;

export const EachType = styled.div`
  padding: 6px 10px;
  font-size: 12px;
  height: 30px;
  margin-right: 10px;
  border-radius: 30px;
  background: ${({ option }) => (option ? 'var(--main-btn-color)' : 'white')};
  border:${({ option }) => (option ? '' : '1px solid var(--main-inner-light-color)')};
  color: ${({ option }) => (option ? 'white' : 'black')};
  box-shadow:  ${({ option }) => (option ? ' 0 3px 7px 2px hsla(205,7%,51%,.7);' : ' ')}; 
  
`;

export const CitySelector = styled.div`
  padding: 10px 30px;
  // padding: ${({ open }) => (open ? '10px 30px' : '0px')};
  width: 100%;
  height: ${({ open }) => (open ? 'auto' : '43px')};
  overflow: hidden;
  background: var(--main-inner-color);
  transition: 0.35s ease;
`;
export const EachCity = styled.div`
  padding: 5px 10px;
  font-size: 11px;
  height: 26px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 30px;
  background: ${({ city }) => (city ? '#2a4aad' : 'white')};
  color: ${({ city }) => (city ? 'white' : 'black')};
  box-shadow:  ${({ city }) => (city ? ' 0 3px 7px 2px hsla(205,7%,51%,.7);' : ' ')}; 
`;

export const FieldListContainer = styled.div`
  width: 100%;
  height: calc(100vh - 294px);
  overflow-y: scroll;
`;
export const EachField = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 15px;
  font-size: 13px;
  height: 80px;
  border-bottom: 1px solid var(--main-inner-color);
`;
export const EachFieldFlag = styled.div`
  margin-top: 15px;
  margin-right: 15px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 80px;
`;
export const EachFiledCourses = styled.div`
  margin-left: auto;
  margin-top: 15px;
  margin-right: 15px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
`;