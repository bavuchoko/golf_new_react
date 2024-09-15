import React from 'react';
import '../../intro.css';
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css'
import {IntroButton, IntroButtonDouble, IntroContainer, IntroMessage} from "./style/StyleView";
import {isLoggedIn} from "../../api/common/CommonMethod";

const MyComponent = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div>
            <Slider {...settings}>
                <IntroContainer isLoggedIn={isLoggedIn}>
                    <IntroMessage>
                        <p className={`text-center`}>간편하게 타수를</p>
                        <p className={`text-center`}>기록할 수 있습니다.</p>
                    </IntroMessage>
                    <IntroButton href={"/game/create"} >연습매치</IntroButton>
                </IntroContainer>

                <IntroContainer isLoggedIn={isLoggedIn}>
                    <IntroMessage>
                        <p className={`text-center`}>경기장을 등록하고</p>
                        <p className={`text-center`}>메모를 관리하세요</p>
                    </IntroMessage>
                    <IntroButtonDouble>
                        <a href={"/field/list"} >경기장 조회</a>
                        <a href={"/field/create"} >경기장 조회</a>
                    </IntroButtonDouble>
                </IntroContainer>

            </Slider>
        </div>
    )
        ;

};

export default MyComponent;
