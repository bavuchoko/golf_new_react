import React from 'react';
import Loading from '../../resources/icons/cube_loading.gif'
// import {DotSpinner} from "@uiball/loaders";

function LoadingModal(props) {
    return (
        <div className="api-loading">
            <div className="api-loading-container">
                <div className={"modal-background"}></div>
                {/*<DotSpinner size={200}/>*/}
                <img src={Loading} />
            </div>
        </div>
    );
}

export default LoadingModal;

