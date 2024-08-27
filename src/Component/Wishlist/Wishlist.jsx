import React, { useContext, useEffect } from 'react'
import style from './Wishlist.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Wishlist() {
    let { wishlistAll, getWishlist, wishlist, RemoveProductFromWishlist, AddProductToWishlist, addProductTOCart } = useContext(CartContext)
    useEffect(() => {
        getWishlist()
    }, [])

    return <>
    <HelmetProvider>
        <Helmet>
            <title>Wishlist</title>
        </Helmet>
        <h1 className='text-5xl'>Wishlist</h1>
        <div className='container flex flex-wrap'>
            {wishlistAll?.map((Product) =>
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
            }
            {wishlist?.length == 0 && <h2 className='text-5xl text-center mx-auto my-10'>your wishlist is empty</h2>}
            </div>
            </HelmetProvider>
    </>
}

