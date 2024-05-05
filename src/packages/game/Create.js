import React, {useState} from 'react';
import StepPlayers from "./create/StepPlayers";
import StepField from "./create/StepField";
import {useSelector} from "react-redux";

function Create(props) {
    const user = useSelector((state) => state.user.user);
    const [step, setStep] = useState("이름");
    const [game, setGame] = useState({});

    return (
        <div className={`right-slider`}>
            {step === "이름" && <StepPlayers setStep={setStep} data={game} fnc={setGame} target={"names"} user={user}/>}
            {step === "경기장" && <StepField setStep={setStep} data={game} fnc={setGame} target={"field"}/>}
        </div>
    );
}
export default Create;