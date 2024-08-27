import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import { UserContext } from '../../Context/UserContext'
import axios from 'axios'
import RecentProduct from '../RecentProduct/RecentProduct'
import CatgorySlider from '../CatgorySlider/CatgorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { CartContext } from '../../Context/CartContext'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Home() {

    return <>
    <HelmetProvider >
        <Helmet>
            <title>Home</title>
        </Helmet>
        <MainSlider></MainSlider>
        <CatgorySlider />
        <div className='flex flex-wrap container'>
            <RecentProduct></RecentProduct>
        </div>
    </HelmetProvider >
    </>
}

