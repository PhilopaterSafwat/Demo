import React from 'react'
import style from './MainSlider.module.css'
import grocy1 from './../../assets/images/grocery-banner.png'
import grocy2 from './../../assets/images/grocery-banner-2.jpeg'
import slide1 from './../../assets/images/slider-image-1.jpeg'
import slide2 from './../../assets/images/slider-image-2.jpeg'
import slide3 from './../../assets/images/slider-image-3.jpeg'
import Slider from "react-slick";


export default function MainSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
    };

    return <>
        <div className="flex mb-8">
            <div className='w-3/4'>
                <Slider {...settings}>
                    <img src={slide1} className='rounded-none w-full h-[400px] object-cover' />
                    <img src={slide2} className='rounded-none w-full h-[400px] object-cover' />
                    <img src={slide3} className='rounded-none w-full h-[400px] object-cover' />
                </Slider>

            </div>
            <div className='w-1/4'>
                <img src={slide3} className='rounded-none w-full h-[200px] ' />
                <img src={slide1} className='rounded-none w-full h-[200px] ' />
            </div>

        </div>
    </>
}

