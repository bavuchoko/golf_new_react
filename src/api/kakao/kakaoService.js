import axios from "axios";

async function addressToCode(address) {
    try{
        const kakaoRestKey = process.env.REACT_APP_KAKAO_REST_KEY;
        return  axios.get(
            "https://dapi.kakao.com/v2/local/search/address.json?",
            {
                params :{'query': address},
                headers:{
                    'Authorization' : 'KakaoAK '+ kakaoRestKey
                }
            }
        )
    }catch (error){
        // 오류 처리
        console.error('에러발생 : ', error);
        throw error;
    }
}

export {addressToCode};