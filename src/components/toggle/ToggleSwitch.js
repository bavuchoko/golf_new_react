import React, {useState} from 'react';
import styled from "styled-components";

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;

  > .toggle-container {
    width: 70px;
    height: 35px;
    border-radius: 30px;
    background-color: rgb(217, 217, 217);
  }

  > .toggle--checked {
    background-color: var(--main-btn-color);
    transition: 0.2s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 33px;
    height: 33px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.2s
  }

  > .toggle--checked {
    left: 36px;
    transition: 0.1s
  }
`;

function ToggleSwitch(props) {
    const [isOn, setisOn] = useState(false);
    const toggleHandler = () => {
        setisOn(preve=>!preve)
    };


    return (
        <ToggleContainer onClick={toggleHandler} >
            <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}/>
            <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`}/>
        </ToggleContainer>
    );
}

export default ToggleSwitch;