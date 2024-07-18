import React, {useState} from 'react';
import '../index.css'

function Test(props) {

    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        console.log("sefsef")
        setIsVisible(!isVisible);
    };
    return (
        <div className="container">
            <div className={`boxxxx ${isVisible ? 'animate-in' : 'animate-out'}`}></div>
            <button onClick={toggleVisibility}>Toggle Animation</button>
        </div>
    );
}

export default Test;