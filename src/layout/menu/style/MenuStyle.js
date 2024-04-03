import styled from "styled-components";


export const Parent = styled.li`
  font-size: 18px;
  margin-top: 30px;
  font-weight: bold;
  height: 30px;
  width: 100%;
  cursor: pointer;
  position: relative;
  
`;

export const Child = styled.li`
  height: ${({ isopen }) => (isopen ? '30px' : '0px')};
  width: 100%;
  font-size: 17px;
  text-indent: 7px;
  margin-bottom:${({ isopen }) => (isopen ? '20px' : '0px')};
  margin-top:${({ isopen }) => (isopen ? '20px' : '0px')};
  overflow: hidden;
  transition: 0.35s ease;
  cursor: pointer
`;