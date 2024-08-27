import React, { useContext, useEffect } from 'react'
import style from './Allorders.module.css'
import { CartContext } from '../../Context/CartContext'

export default function Allorders() {
    const {clearCart} = useContext(CartContext)
    useEffect(()=>{
        clearCart()
    }
        , [])
    
    return <>
        <h1 className='text-5xl'>Allorders</h1>

    </>
}

