import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from './../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'


export default function Navbar() {
    let { Cart } = useContext(CartContext);
    let navigate = useNavigate();

    function logout() {
        localStorage.removeItem('userToken');
        setuserData(null);
        setTimeout(() => {
            navigate('/login');
        }, 100);
    }
    const { userData, setuserData } = useContext(UserContext)
    const [hidden, sethidden] = useState(true)
    function hs() {
        sethidden(!hidden)
    }

    return <>
        <nav className=' bg-gray-200 flex items-start fixed top-0 inset-x-0 z-50'>
            <div className="container p-6 flex justify-between lg:flex-row flex-col lg:items-center">
                <div className='flex lg:gap-8 gap-4 lg:flex-row flex-col '>
                    <div className="logo"> <Link to={''}><img src={logo} /></Link></div>
                    {userData != null ? <ul className={`${hidden ? "hidden" : "flex"}  xl:gap-8 gap-4 text-xl text-slate-600 lg:flex-row flex-col lg:flex`}>
                        <li><NavLink to={''} onClick={() => { hs() }}>Home</NavLink></li>
                        <li><NavLink to={'products'} onClick={() => { hs() }}>Products</NavLink></li>
                        <li><NavLink to={'wishlist'} onClick={() => { hs() }}>Wishlist</NavLink></li>
                        <li><NavLink to={'category'} onClick={() => { hs() }}>Categories</NavLink></li>
                        <li><NavLink to={'brands'} onClick={() => { hs() }}>Brands</NavLink></li>

                    </ul> : ''}
                </div>
                <div className={`${hidden ? "hidden" : "flex"} gap-3 lg:items-center text-xl lg:flex-row flex-col mt-5 lg:mt-0 lg:flex`}>
                    {userData != null ? <>
                        <NavLink to={'cart'} onClick={() => { hs() }}>
                            <div className='relative w-fit'>
                                <i className="fa-solid fa-cart-shopping text-2xl"></i>
                                {Cart?.numOfCartItems > 0 ? <div className='bg-emerald-500 rounded-full w-6 h-6 flex items-center justify-center absolute top-[-10px] right-[-10px] text-lg text-white'>{Cart.numOfCartItems}</div> : ''}
                            </div>
                        </NavLink>
                        <div className="social flex gap-3">
                            <i className="fa-brands fa-instagram"></i>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-tiktok"></i>
                            <i className="fa-brands fa-twitter"></i>
                            <i className="fa-brands fa-linkedin"></i>
                            <i className="fa-brands fa-youtube"></i>
                        </div></>
                        : ''}
                    {userData != null ? <Link className='text-slate-600' onClick={() => {logout(), hs()}}>LogOut</Link> : <>
                        <Link to={'login'} className='text-slate-600'>Login</Link>
                        <Link to={'register'} className='text-slate-600'>Register</Link>
                    </>}
                </div>
            </div>
            <div className="menu lg:hidden p-6 text-2xl cursor-pointer" onClick={() => hs()}><i className="fa-solid fa-bars"></i></div>
        </nav>
    </>
}

