import React, {useEffect, useState} from 'react';
import {createField} from "../../api/field/FieldService";
import {useNavigate} from "react-router-dom";
import Pin from '../../resources/icons/pin.png'
import {GrowupSecion, SerachAddress} from "./style/style";
import toast from "react-hot-toast";

const postCodeStyle = {
    width: 'calc(100% - 30px)',
    height: '70vh',
    position: 'fixed',
    top:'70px',
    zIndex:'999',
    left:'15px',
};

const {kakao} = window;
function Create(props) {
    const kakaoRestKey = process.env.REACT_APP_KAKAO_REST_KEY;
    const [name, setName] = useState("");
    const height =125;
    const [drawup, setDrawup] = useState(false);
    const [address, setAddress] = useState("");
    const [roadAddress, setRoadAddress] = useState("");
    const [city, setCity] = useState("세종특별자치시");
    const [addressDetail, setAddressDetail] = useState("");
    const [holes, setHoles] = useState(9);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const isNumber =  /^\d+$/;
    const [latitude, setLatitude] =useState(36.524281300000716)
    const [longitude, setLongitude] =useState(127.25976801328223)
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    const [query, setQuery] = useState('');
    const [queryResult, setQueryResults] = useState([]);

    var positions = [
        {
            title: '카카오',
            latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        },
        {
            title: '생태연못',
            latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        },
        {
            title: '텃밭',
            latlng: new kakao.maps.LatLng(33.450879, 126.569940)
        },
        {
            title: '근린공원',
            latlng: new kakao.maps.LatLng(33.451393, 126.570738)
        }
    ];


    useEffect(()=>{
        const mapContainer = document.getElementById('map');
        const options={
            center : new kakao.maps.LatLng(latitude,longitude),
            level:5
        };

        const map = new kakao.maps.Map(mapContainer, options);



        let markerPosition = new kakao.maps.LatLng(
            latitude,
            longitude
        );
        function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수.
        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                var infoDiv = document.getElementById('centerAddr');

                for(var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        infoDiv.innerHTML = result[i].address_name;
                        break;
                    }
                }
            }
        }
        // 지도에 클릭 이벤트를 등록
        // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    //도로명주소
                    var roadAddress = !!result[0].road_address ? result[0].road_address.address_name: '';
                    //지번주소
                    var detailAddr =result[0].address.address_name;
                    setAddress(roadAddress !==''? roadAddress: detailAddr)
                    setQuery(roadAddress !==''? roadAddress: detailAddr)
                    console.log(roadAddress)
                    console.log(detailAddr)

                    // 클릭한 위도, 경도 정보를 가져옴
                    var latlng = mouseEvent.latLng;
                    // 마커를 클릭한 위치에 표시합니다
                    marker.setPosition(latlng);
                    marker.setMap(map);

                    setLatitude(latlng.getLat())
                    setLongitude(latlng.getLng())

                }
            });




        });
        // // 마커를 생성
        let marker = new kakao.maps.Marker({
            position: markerPosition,
        });
        marker.setMap(map);
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        for (var i = 0; i < positions.length; i ++) {

            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);



            // 마커
            var savedMarker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng,
                image : markerImage // 마커 이미지
            });

            var content ='<div class="customoverlay">' +
                '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
                '    <span class="title">구의야구공원</span>' +
                '  </a>' +
                '</div>';

            // 커스텀오버레이 (마커에 링크달기)
            var customOverlay = new kakao.maps.CustomOverlay({
                map: map,
                position: positions[i].latlng,
                content: content,
                yAnchor: 1
            });
        }
    },[longitude, latitude])


    const holesHandler =(value)=>{
        if (isNumber.test(value) || value==='') {
            setHoles(value)
        }else{
            setMessage('홀 은 숫자로만 입력하세요')
        }
    }

    const saveField =async () => {
        const field = {
            "name":name,
            "city": city,
            "address": address,
            "latitude": latitude,
            "longitude": longitude,
            "addressDetail": addressDetail,
            "holes": holes,
            "courses": holes/9,
        }

        if(field.name.trim()===''|| field.address.trim()==='' || field.courses.toString().trim()==='' || !isNumber.test(holes)){
            toast.error('입력데이터를 확인하세요.')
            return
        }
        try {
            const response = await createField(field);

            if (response.status==200) {
                toast.success('등록되었습니다.')
                navigate("/field/list")
            }
        } catch (error) {
            console.error(error);
            toast.error('등록 실패하였습니다.')
        }
    }

    const setSearch =(e)=>{
        if (e.key === 'Enter') {
            if(query===''){

            }else{
                doQuery(query)
            }
        }
    }

    const doQuery = async () => {
        const encodedQuery = encodeURIComponent(query);
        try {
            const response = await fetch(
                `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&query=`+encodedQuery,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `KakaoAK ${kakaoRestKey}`,
                    },
                    withCredentials: true,
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            setQueryResults(data.documents);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const setAddressHandler =(result)=>{
        const addr = result.address
        const roadAddr=result.road_address;

        setAddress(addr.address_name)
        setRoadAddress(roadAddr?.address_name)
        setCity(addr.region_1depth_name)
        setLatitude(addr.y)
        setLongitude(addr.x)
    }
    return (
        <>
            <div className={`address-modal`}>
                <input
                    className={`h-[50px] w-full outline-0 indent-1 addr-search`}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={setSearch}
                    placeholder="주소를 입력하세요"/>
                {/*<img src={Close} className={`close-search`}/>*/}
                <svg onClick={() => {
                    setQuery('');
                    setAddress('');
                    setQueryResults([]);
                }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"
                     className={`z-70 fixed right-[55px] top-[70px] w-[20px]`}>
                    <path
                        d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                </svg>

                <svg
                    onClick={() => {
                        doQuery();
                    }}
                    xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"
                     className={`z-70 fixed right-[25px] top-[70px] w-[20px]`}>
                    <path
                        d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                </svg>
                <ul className={`addr-ul ${queryResult.length > 0 ? 'p-[10px]' : ''}`}>
                    {queryResult.map((result, index) => (
                        <li key={`address_` + index} className={`hover:cursor-pointer addr-container`}
                            onClick={() => setAddressHandler(result)}>
                            <div className={``}>
                                <div className={`h-[30px] line-h-30 `}><span
                                    className={`addr_type `}>도로명</span> {result.road_address?.address_name}</div>
                                <div className={`h-[30px] line-h-30 `}><span
                                    className={`addr_type `}>지 번</span>{result.address_name}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div id='map' style={{width: "100%", height: "calc(100vh - (50px + 8rem))"}}></div>

            <GrowupSecion className={``} drawup={drawup ? drawup : undefined} height={height}>
                <div className={'draw-up-handler'} onClick={() => setDrawup(!drawup)}>
                    <div className={`draw-up-handler-pointer`}></div>
                </div>
                <div className={'text-[15px] h-[30px]w-[210px] mb-[5px] text-[#9b9696]'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className={`w-5 h-5 inline-block mr-1`}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                    </svg>
                    <span className={`align-middle mt-1`}>각 코스는 9홀을 기본으로 합니다. </span>
                </div>
                <div className={`create-field shadow-wix`}>
                    <div className={`create-filed-body`}
                         style={{height: drawup ? height + 'px' : '0px', padding: drawup ? '10px' : ''}}>
                        <div className={`flex`}>
                            <div className={''}>
                                <img src={Pin} className={`w-[23px] h-[23px] inline-block`}/>
                                <span className={`text-[16px] text-[#166AEAFF]`}>경기장</span><span
                                className={`text-[16px]`}>이름을 입력하세요</span>
                                <input
                                    type="text"
                                    placeholder="경기장 명"
                                    value={name}
                                    className={"radius-no indent-2 border-b mt-2 no-outline text-[14px] mt-[15px]"}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className={`w-[55px] ml-auto justify-between pt-[4px]`}>
                                <p className={`text-[13px] text-center`}>홀</p>
                                <div>
                                    <input
                                        value={holes}
                                        onChange={(e) => holesHandler(e.target.value)}
                                        className={`text-center text-[24px] font-bold w-[50px] h-[40px] border no-outline`}/>
                                </div>
                            </div>
                        </div>

                        <div className={`w-full h-[35px]  mt-4`}>
                            <input
                                type="text"
                                placeholder="상세주소"
                                value={addressDetail}
                                className={"radius-no indent-2 border-b w-full no-outline text-[14px]"}
                                onChange={(e) => setAddressDetail(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className={`create-filed-foot`}
                         style={{background: drawup ? '#166AEAFF' : '', color: drawup ? 'white' : '#166AEAFF'}}>
                        {/*<div className={``} onClick={saveField}>*/}
                        <div className={``} onClick={() => {
                            if (drawup) saveField()
                            else setDrawup(!drawup)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor"
                                 className={`inline-block align-middle w-4 h-4 rounded-lg ${drawup ? 'bg-[white] text-[#166AEAFF]' : 'bg-[#166AEAFF] text-[white]'}  items-center`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            <span
                                className={`inline-block ml-1 text-[16px] align-middle `}>{drawup ? '저장하기' : '경기장 등록하기'} </span>
                        </div>
                    </div>
                </div>
            </GrowupSecion>

        </>
    );
}

export default Create;