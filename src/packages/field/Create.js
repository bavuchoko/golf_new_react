import React, {useEffect, useRef, useState} from 'react';
import {Map, MapMarker, MapTypeId,} from "react-kakao-maps-sdk";
import DaumPostcode from 'react-daum-postcode';
import {createField} from "../../api/field/FieldService";
import {useNavigate} from "react-router-dom";
import Pin from '../../resources/icons/pin.png'
import {addressToCode} from "../../api/kakao/kakaoService";
import {CategorySection, GrowupSecion, SerachAddress} from "./style/style";
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
    const [name, setName] = useState("");
    const height =125;
    const [openPostcode, setOpenPostcode] = useState(false);
    const [drawup, setDrawup] = useState(false);
    const [address, setAddress] = useState("세종특별자치시 미리내로 104");
    const [city, setCity] = useState("세종특별자치시");
    const [addressDetail, setAddressDetail] = useState("");
    const [courses, setCourses] = useState(1);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const isNumber =  /^\d+$/;
    const [latitude, setLatitude] =useState(36.524281300000716)
    const [longitude, setLongitude] =useState(127.25976801328223)
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
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

    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택했을 경우
        selectAddress: (data) => {
            setOpenPostcode(false);// 모달을 닫고
            setAddress(data.address)              // 해당 주소를 주소값에 저장하고
            addressToCode(data.address).then(     // 카카오API 로 위경도값 가져옴
                response=>{
                    const lelo = response.data.documents[0].road_address
                    console.log(lelo.region_1depth_name)
                    setCity(lelo.region_1depth_name)
                    setLatitude(lelo.y)
                    setLongitude(lelo.x)
                }
            )
        },
    }

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

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
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
                    console.log(roadAddress)
                    console.log(detailAddr)

                    // 클릭한 위도, 경도 정보를 가져옴
                    var latlng = mouseEvent.latLng;
                    // 마커를 클릭한 위치에 표시합니다
                    marker.setPosition(latlng);
                    marker.setMap(map);
                    //클릭위치의 위도
                    latlng.getLat()
                    //클릭위치의 경도
                    latlng.getLng()
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


    const coursesHandler =(value)=>{
        if (isNumber.test(value) || value==='') {
            setCourses(value)
        }else{
            setMessage('코스 수는 숫자로만 입력하세요')
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
            "courses": courses,
        }

        if(field.name.trim()===''|| field.address.trim()==='' || field.courses.toString().trim()==='' || !isNumber.test(courses)){
            toast.error('입력데이터를 확인하세요.')
            return
        }
        try {
            const response = await createField(field);

            if (response.status==200) {
                toast.success('등록되었습니다.')
                navigate(-1)
            }
        } catch (error) {
            console.error(error);
            toast.error('등록 실패하였습니다.')

        }
    }

    return (
        <>
            <SerachAddress onClick={handle.clickButton} >{address}</SerachAddress>
            {openPostcode &&
                <>
                    <DaumPostcode
                        style={postCodeStyle}
                        onComplete={handle.selectAddress}
                        autoClose={false}
                        defaultQuery='세종특별자치시'
                    />
                    <div className={`postal-background`} onClick={()=> setOpenPostcode(false)}></div>
                </>
            }

            <div id='map' style={{width: "100%", height: "calc(100vh - (50px + 8rem))"}} ></div>

            <GrowupSecion className={``} drawup={drawup ? drawup : undefined} height={height}>
                <div className={'draw-up-handler'} onClick={()=>setDrawup(!drawup)}><div className={`draw-up-handler-pointer`}></div> </div>
                <div className={'text-[15px] h-[30px]w-[210px] mb-[5px] text-[#9b9696]'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className={`w-5 h-5 inline-block mr-1`}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                    </svg>
                    <span className={`align-middle mt-1`}>각 코스는 9홀을 기본으로 합니다. </span>
                </div>
                <div className={`create-field shadow-wix`}>
                    <div className={`create-filed-body`}   style={{ height: drawup ? height +'px' : '0px', padding :drawup? '10px':''  }}>
                        <div className={`flex`}>
                            <div className={''}>
                                <img src={Pin} className={`w-[23px] h-[23px] inline-block`}/>
                                <span className={`text-[16px] text-[#166AEAFF]`}>경기장</span><span className={`text-[16px]`}>이름을 입력하세요</span>
                                <input
                                    type="text"
                                    placeholder="경기장 명"
                                    value={name}
                                    className={"radius-no indent-2 border-b mt-2 no-outline text-[14px] mt-[15px]"}
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div className={`w-[55px] ml-auto justify-between pt-[4px]`}>
                                <p className={`text-[13px] text-center`}>코스 수</p>
                                <div>
                                    <input
                                        value={courses}
                                        onChange={(e)=>coursesHandler(e.target.value)}
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
                                onChange={(e)=>setAddressDetail(e.target.value)}
                            />
                        </div>
                    </div>



                    <div className={`create-filed-foot`} style={{background:drawup? '#166AEAFF':'', color:drawup? 'white':'#166AEAFF' }}>
                        {/*<div className={``} onClick={saveField}>*/}
                        <div className={``}  onClick={()=>{
                            if(drawup) saveField()
                            else setDrawup(!drawup)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className={`inline-block align-middle w-4 h-4 rounded-lg ${drawup ?'bg-[white] text-[#166AEAFF]':'bg-[#166AEAFF] text-[white]' }  items-center`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            <span className={`inline-block ml-1 text-[16px] align-middle `}>{drawup ? '저장하기' : '경기장 등록하기'} </span>
                        </div>
                    </div>
                </div>
            </GrowupSecion>

        </>
    );
}

export default Create;