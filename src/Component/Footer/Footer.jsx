import React from 'react'
import style from './Footer.module.css'
import iconOne from './../../assets/images/ebay-Six_Revisions.png'
import icontwo from './../../assets/images/paypal-Six_Revisions.png'
import iconthree from './../../assets/images/visa-Six_Revisions.png'
import iconfour from './../../assets/images/mastercard-Six_Revisions.png'
import googlePlay from './../../assets/images/pngwing.com (1).png'
import appStore from './../../assets/images/pngwing.com (2).png'
export default function Footer() {


    return <>
        <footer className='p-10 bg-gray-100'>
            <h1 className='text-4xl'>Get the FreshCart app</h1>
            <p className='text-base text-slate-400'>We will send you link, open it on yourphone to download the app</p>
            <form className='w-full p-5 flex justify-between items-center flex-col lg:flex-row'>
                <input type="email" placeholder='Email ..' className='lg:w-4/5 p-[10px] rounded-md w-full' />
                <button type="button" className="w-full lg:w-fit mt-3 lg:mt-0 focus:outline-none text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:focus:ring-emerald-800">Share App Link</button>
            </form>
            <hr />
            <div className='flex lg:items-center gap-2 justify-between gap-y-7 flex-col lg:flex-row items-start my-5'>
                <div className='lg:flex gap-3 items-center'>
                    <h2>Paymeny Partners</h2>
                    <div className='methods flex gap-3 items-center'>
                        <img src={iconOne} width={30} />
                        <img src={icontwo} width={30} />
                        <img src={iconthree} width={30} />
                        <img src={iconfour} width={30} />
                    </div>
                </div>
                <div className='lg:flex gap-3 items-center'>
                    <h2>Get deliveries wiith FreshCart</h2>
                    <div className='flex gap-3 items-center'>
                    <img src={googlePlay} width={120} />
                    <img src={appStore} width={120} />
                    </div>
                </div>
            </div>
            <hr />
        </footer>
    </>
}

