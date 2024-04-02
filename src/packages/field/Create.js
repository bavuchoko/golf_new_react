import React, {useState} from 'react';
import DaumPostcode from 'react-daum-postcode';
import {createField} from "../../api/field/FieldService";
import {useNavigate} from "react-router-dom";

const postCodeStyle = {
    width: 'calc(100% - 20px)',
    height: '70vh',
    position: 'fixed',
    top:'50px',
    zIndex:'999',
    left:'10px',
};
function Create(props) {
    const [name, setName] = useState("");
    const [openPostcode, setOpenPostcode] = useState(false);
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [courses, setCourses] = useState("");
    const [message, setMessage] = useState('');


    const navigate = useNavigate();
    const isNumber =  /^\d+$/;

    const handleModalOff =(e)=> {
        setOpenPostcode(false);
    }

    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            setOpenPostcode(false);
            setAddress(data.address)
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

    return (
        <div className="px-[15px] pt-[50px]">
            
            <p>경기장을 등록합니다</p>
            {openPostcode &&
                <>
                <DaumPostcode
                    style={postCodeStyle}
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='세종특별자치시' // 팝업을 열때 기본적으로 입력되는 검색어
                />
                <div className={`postal-background`} onClick={()=> setOpenPostcode(false)}></div>
                </>
            }

            <input
                type="text"
                placeholder="경기장 명"
                value={name}
                className={"border-b radius-no indent-3 w-full h-[55px] mt-1 no-outline"}
                onChange={(e)=>setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="주소 선택"
                value={address}
                onClick={handle.clickButton}
                className={"postal-btn"}
                readOnly
            />

            <input
                type="text"
                placeholder="상세주소"
                value={addressDetail}
                className={"border-b radius-no indent-3 w-full h-[55px] mt-1 no-outline"}
                onChange={(e)=>setAddressDetail(e.target.value)}
            />
            <input
                type="number"
                placeholder="코스"
                value={courses}
                className={"courses"}
                onChange={(e)=>coursesHandler(e.target.value)}
            />
            <span className={`inline-block text-[14px] ml-3 align-middle`}>코스가 몇 개 있나요?</span>
            <p></p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className={`w-5 h-5 inline-block mr-1`}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
            </svg>
            <span className={`align-middle mt-1`}>각 코스는 9홀을 기본으로 합니다. </span>
            <span className={`align-middle mt-1`}>{message}</span>
                <button className="loginbtn_Y mt-10 m-0 m-auto" onClick={saveField}>저장</button>

        </div>
    );
}

export default Create;