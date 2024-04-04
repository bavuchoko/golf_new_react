import React from 'react';
import useGeolocation from "react-hook-geolocation";

function List(props) {
    const geolocation = useGeolocation();
    const latitude = geolocation.latitude
    const longitude = geolocation.longitude
    return (
        <div className={``}>
            <div className={`type-selector`}>
                <div className={`each-type`}>근처</div>
            </div>
        </div>
    );
}

export default List;