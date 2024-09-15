import React, {useState} from 'react';
import StepPlayers from "./sub/StepPlayers";
import StepField from "./sub/StepField";
import {useNavigate} from "react-router-dom";
import {gameCreate} from "../../../api/game/GameService";

function Create() {

    const [field, setField] =useState(null);
    const [names, setNames]=useState([]);
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
                    <div className={"ml-auto w-[40px] text-right"}>
                        <span className={" text-[#354db0]"}
                              onClick={startGameHandler}
                        >다음</span>
                    </div>

                </div>
            </div>
            <StepField field={field} setField={setField}/>
            <StepPlayers names={names} setNames={setNames}/>
        </div>
    );
}

export default Create;