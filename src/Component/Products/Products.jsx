import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Products() {
    let [filtered, setfiltered] = useState([])

    let { addProductTOCart, AddProductToWishlist, getWishlist, wishlist, RemoveProductFromWishlist } = useContext(CartContext);
    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    let { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['recentProduct'],
        queryFn: getProducts,
        select: (data) => data?.data.data
    })
    useEffect(() => {
        if (isLoading) {
            getWishlist()
        }
    }, [])
    useEffect(() => {
        setfiltered(data)
    }, [data])
    function test(e) {
        setfiltered(data.filter(item => item.title.toLowerCase().includes(e)));
        console.log(e);
    }
    return <>
        <HelmetProvider>
            <Helmet>
                <title>Products</title>
            </Helmet>
            <input type="text" className='p-1 border-solid border-2 border-gray-500 my-5 rounded-md w-3/4 mx-auto focus:outline-none' placeholder='Search' onKeyUp={(e) => test(e.target.value)} />
            {isLoading ? <div role="status" className='flex items-center justify-center'>
                <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div> : <div className='container flex flex-wrap'>
                {filtered?.map((Product) =>
                    <div className='md:w-1/2 lg:w-1/4 product relative' key={Product.id}>
                        <div className='p-5'>
                            <Link to={`/productdetails/${Product.id}`}>
                                <img src={Product.imageCover} alt={Product.title} />
                                <h2 className='text-main'>{Product.category.name}</h2>
                                <h2>{Product.title.split(' ').splice(0, 4).join(' ')}</h2>
                                <div className='flex justify-between '>
                                    <h2>{Product.price} EGP</h2>
                                    <div className="rate flex gap-2 items-center mt-5">
                                        <i className="fa-solid fa-star text-yellow-300"></i>
                                        <h2>{Product.ratingsAverage}</h2>
                                    </div>
                                </div>
                            </Link>
                            <button className='btn' onClick={() => addProductTOCart(Product.id)}>ADD To Cart</button>
                            <div className='heart w-[50px] h-[50px] rounded-full bg-emerald-500 flex justify-center items-center absolute top-10 left-5'>
                                <i
                                    className={`fa-solid fa-heart text-xl cursor-pointer ${wishlist.includes(Product.id) ? 'text-red-500' : 'text-white'}`}
                                    onClick={() => {
                                        if (wishlist.includes(Product.id)) {
                                            RemoveProductFromWishlist(Product.id);
                                        } else {
                                            AddProductToWishlist(Product.id);
                                        }
                                    }}
                                ></i>
                            </div>
                        </div>
                    </div>)
                }</div>}

        </HelmetProvider >
    </>

}

