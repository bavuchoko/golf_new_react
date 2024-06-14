import React from 'react';
import Loading from '../../resources/icons/cube_loading.gif'
// import {DotSpinner} from "@uiball/loaders";

function ErrorModal(props) {
    return (
        <div className="api-loading">
            <div className="api-loading-container">
                <div className={"modal-background"}></div>
                <p className={`text-[40px] mt-10`}>error</p>
                {/*<img src={Loading} />*/}
            </div>
        </div>
    );
}

export default ErrorModal;

