import React, {useState} from 'react';
import styled from "styled-components";

const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
  width: 50px !important;
  > .toggle-container {
    width: 60px;
    height: 30px;
    border-radius: 30px;
    background-color: rgb(217, 217, 217);
  }

  > .toggle--checked {
    background-color: var(--main-deep-red);
    transition: 0.2s
  }

  > .toggle-circle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.2s
  }

  > .toggle--checked {
    left: 32px;
    transition: 0.1s
  }
`;

function ToggleSwitch({on, setOn}) {

    const toggleHandler = () => {
        setOn(preve=>!preve)
    };


    return (
        <ToggleContainer onClick={toggleHandler} >
            <div className={`toggle-container ${on ? "toggle--checked" : null}`}/>
            <div className={`toggle-circle ${on ? "toggle--checked" : null}`}/>
        </ToggleContainer>
    );
}

export default ToggleSwitch;