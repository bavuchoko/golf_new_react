import React, {useEffect, useRef, useState} from 'react';
import {Map, MapMarker, MapTypeId,} from "react-kakao-maps-sdk";
import DaumPostcode from 'react-daum-postcode';
import {createField} from "../../api/field/FieldService";
import {useNavigate} from "react-router-dom";
import Pin from '../../resources/icons/pin.png'
import {addressToCode} from "../../api/kakao/kakaoService";
import {AddFieldSection, CategorySection, SerachAddress} from "./style/style";



const postCodeStyle = {
    width: 'calc(100% - 30px)',
    height: '70vh',
    position: 'fixed',
    top:'70px',
    zIndex:'999',
    left:'15px',
};

function Create(props) {
    const [name, setName] = useState("");
    const [openPostcode, setOpenPostcode] = useState(false);
    const [drawup, setDrawup] = useState(false);
    const [address, setAddress] = useState("세종특별자치시 미리내로 104");
    const [addressDetail, setAddressDetail] = useState("");
    const [courses, setCourses] = useState(1);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const isNumber =  /^\d+$/;
    const [latitude, setLatitude] =useState(127.25976801328223)
    const [longitude, setLongitude] =useState(36.524281300000716)
    const mapRef = useRef(null);
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

                    mapRef.current.relayout();

                    setLatitude(lelo.x)
                    setLongitude(lelo.y)
                }
            )
        },
    }

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
            "address": address,
            "latitude": latitude,
            "longitude": longitude,
            "addressDetail": addressDetail,
            "courses": courses,
        }

        if(field.name.trim()===''|| field.address.trim()==='' || field.courses.trim()==='' || !isNumber.test(courses)){
            alert("입력데이터를 확인하세요")
            return
        }
        try {
            const response = await createField(field);

            if (response.status==200) {
                alert("등록되었습니다.")
                navigate(-1)
            }
        } catch (error) {
            console.error(error);
            alert("등록에 실패하였습니다.");

        }
    }
    useEffect(() => {
        if(mapRef.current)
            mapRef.current.relayout();
    }, [latitude, longitude]);
    return (
        <>
            <SerachAddress  className={"post"} onClick={handle.clickButton} >{address}</SerachAddress>
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

            <Map
                center={{ lat:longitude , lng: latitude }}
                style={{width: "100%", height: "calc(100vh - (50px + 8rem))"}}
                ref={mapRef}
            >
                <MapMarker position={{ lat: longitude, lng:latitude }}>
                    <div style={{color: "#000"}}>{address}</div>
                </MapMarker>
                <MapTypeId type={"TRAFFIC"}/>
            </Map>

            <AddFieldSection className={``} drawup={drawup}>
                <div className={'draw-up-handler'} onClick={()=>setDrawup(!drawup)}><div className={`draw-up-handler-pointer`}></div> </div>
                <div className={'text-[12px] h-[30px]w-[210px] mb-[5px] text-[#9b9696]'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className={`w-5 h-5 inline-block mr-1`}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                    </svg>
                    <span className={`align-middle mt-1`}>각 코스는 9홀을 기본으로 합니다. </span>
                </div>
                <div className={`create-field shadow-wix`}>
                    <div className={`create-filed-body`}   style={{ height: drawup ? '125px' : '85px' }}>
                        <div className={`flex`}>
                            <div className={''}>
                                <img src={Pin} className={`w-[23px] h-[23px] inline-block`}/>
                                <span className={`text-[13px] text-[#166AEAFF]`}>경기장</span><span className={`text-[13px]`}>이름을 입력하세요</span>
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



                    <div className={`create-filed-foot`}>
                        <div className={``} onClick={saveField}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="inline-block align-middle w-4 h-4 rounded-lg bg-[#166AEAFF] text-[white] items-center">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            <span className={`inline-block ml-1 text-[13px] align-middle text-[#166AEAFF]`}>경기장 등록하기</span>
                        </div>
                    </div>
                </div>
            </AddFieldSection>

        </>
    );
}

export default Create;