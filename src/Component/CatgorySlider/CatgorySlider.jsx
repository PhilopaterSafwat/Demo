import React, { useEffect, useState } from 'react'
import style from './CatgorySlider.module.css'
import axios from 'axios'
import Slider from "react-slick";
import { useQuery } from '@tanstack/react-query';
export default function CatgorySlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }],

    };
    function getCatgory() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
        let {data,isLoading,isError,isFetching,error} = useQuery({
            queryKey:['CatgorySlider'],
            queryFn:getCatgory
        })
        
    return <>
        <h1 className='text-4xl my-5 '>Shop Populur Catgory</h1>
        <Slider {...settings} className='mb-20'>
            {data?.data.data.map((catgory, index) => <img key={index} className={`${style.imageHeight}`} src={catgory.image} />)}
        </Slider>
    </>
}

