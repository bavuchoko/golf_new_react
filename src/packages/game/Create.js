import React, {useState} from 'react';
import StepUserName from "../user/joinStep/StepUserName";
import StepPlayers from "./create/StepPlayers";
import StepField from "./create/StepField";

function Create(props) {

    const [step, setStep] = useState("이름");
    const [game, setGame] = useState();

    return (
        <div className={`right-slider`}>
            {step === "이름" && <StepPlayers setStep={setStep} data={game} fnc={setGame} target={"names"}/>}
            {step === "경기장" && <StepField setStep={setStep} data={game} fnc={setGame} target={"field"}/>}
        </div>
    );
}
export default Create;