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
  height: ${({ isopen }) => (isopen ? 'auto' : '0px')};
  width: 100%;
  font-size: 15px;
  text-indent: 7px;
  margin-bottom:${({ isopen }) => (isopen ? '15px' : '0px')};
  margin-top:${({ isopen }) => (isopen ? '15px' : '0px')};
  overflow: hidden;
  transition: 0.35s ease;
  cursor: pointer
`;