import React, {useState} from 'react';
import StepPlayers from "./sub/StepPlayers";
import StepField from "./sub/StepField";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {gameCreate} from "../../../api/game/GameService";

function Create(props) {


    const [game, setGame] = useState({});
    const [field, setField] =useState(null);
    const [names, setNames]=useState([]);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const startGameHandler =()=> {
        const newGame = {
            names : names,
            field : field
        }
        gameCreate(newGame).then(_=> {
            navigate('/game/' + _.data.id)
        }).finally(()=> {
        });

    }

    return (

        <div className={`right-slider`}>
            <div className="px-[30px] w-full line-h-40 py-[5px] line-h-50 h-[55px] ">
                <div className="inline-block w-[100%] flex h-[50px]">
                    <p onClick={() => {
                        navigate(-1)
                    }}>뒤로</p>
                    <div className={"ml-auto w-[32px]"}>
                        <span className={" text-[#354db0]"}
                              onClick={startGameHandler}
                        >다음</span>
                    </div>

                </div>
            </div>
            <StepField field={field} setField={setField} setStep={setStep}/>
            {step >1 &&
            <StepPlayers names={names} setNames={setNames}/>
            }
        </div>
    );
}

export default Create;