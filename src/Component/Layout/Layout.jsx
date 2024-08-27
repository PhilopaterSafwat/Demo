import React, { useContext, useEffect } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.jsx'

export default function Layout() {

    return <>
        <Navbar />
        <div className={`container ${style.container} p-5`}>
            <Outlet></Outlet>
        </div>
        <Footer />
    </>
}

