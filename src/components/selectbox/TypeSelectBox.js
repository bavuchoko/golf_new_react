import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";

const SelectBox = styled.div`
  position: relative;
  width: 70px;
  line-height: 30px;
  align-self: center;
  height: 30px;
  color: #66696e;
  cursor: pointer;
  &::after {
    position: absolute;
    top: -1px;
    content: "⌵";
    margin-left: 30px;
  }
`;
const Label = styled.label`
  font-size: 13px;
  text-align: center;
`;
const SelectOptions = styled.ul`
  position: absolute;
  list-style: none;
  top: 29px;
  left: -30px;
  width: 110px;
  padding-left: 20px;
  box-shadow: 0 -2px 9px 1px hsla(205,7%,51%,.2);
  overflow: hidden;
  height: ${props => props.height? props.height+'px' : 'auto'};
  overflow-y: scroll;
  max-height: ${(props) => (props.show ? "none" : "0")};
  background-color: white;
`;
const Option = styled.li`
  font-size: 14px;
  padding: 0px 10px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #595959;
  }
`;

function TypeSelectBox({options, select, setSelect, height}) {
    const optionRef = useRef(null);
    const [showOptions, setShowOptions] = useState(false);

    const handleOnChangeSelectValue = (e) => {
        setSelect((prev) => {
            return {
                ...prev,
                city: e.target.getAttribute("value")
            }
        })
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionRef.current && !optionRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [optionRef]);

    return (
        <SelectBox onClick={() => setShowOptions((prev) => !prev)} ref={optionRef}>
            <Label>{select}</Label>
            <SelectOptions height={height} show={showOptions ? "true" :undefined }>
                {options  && options.map((each) => (
                    <Option
                        key={each.id}
                        value={each.value}
                        onClick={handleOnChangeSelectValue}
                    >
                        {each.label}
                    </Option>
                ))}
            </SelectOptions>
        </SelectBox>
    );
};

export default TypeSelectBox;