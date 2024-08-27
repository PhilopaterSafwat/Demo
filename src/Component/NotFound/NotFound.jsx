import React from 'react'
import style from './NotFound.module.css'
import notfound from './../../assets/images/error.svg'

export default function NotFound() {


    return <>
        <div className='w-full flex items-center justify-center'>
            <img src={notfound} alt="notfound" className='w-4/5' />
        </div>
    </>
}

