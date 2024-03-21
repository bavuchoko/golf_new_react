import React from 'react';
import {DotSpinner} from "@uiball/loaders";

function LoadingModal(props) {
    return (
        <div className="api-loading">
            <div className="api-loading-container">
                <DotSpinner size={200}/>
            </div>
        </div>
    );
}

export default LoadingModal;

