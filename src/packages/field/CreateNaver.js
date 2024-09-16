import React, {useRef} from 'react';
import styled from "styled-components";


// const StyledMap = styled.div`
//
// height: 500px;
// `;

function CreateNaver(props) {

    const { naver } = window;
    const mapElement = useRef(null);
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10
    });

    return (
        <div id="map" className={`h-[500px]`} ref={mapElement}></div>
        
        
    );
}

export default CreateNaver;