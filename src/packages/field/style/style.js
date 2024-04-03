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
  height: ${({ drawup }) => (drawup ? '225px' : '95px')};
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
    background: ${({ clicked }) => (clicked ? '#166AEAFF' : '')};
    font-size: 12px;
    text-align: center;
    border-radius: 3px;
    color: ${({ clicked }) => (clicked ? 'white' : '')};
    
`;