import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext(null);

export default function CartContextProvider({ children }) {
    let [Cart, setCart] = useState();
    let [wishlist, setWishlist] = useState([]);
    let [wishlistAll, setWishlistAll] = useState([]);
    let headers = { token: localStorage.getItem('userToken') };
    async function addProductTOCart(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    productId
                }, {
                headers
            }
            )
            toast.success(data.message)
            setCart(data);

        } catch (error) {
            console.log(error);

        }
    }
    async function DisplayCart() {
        try {
            if (localStorage.getItem('userToken')) {
                let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
                    {
                        headers
                    }
                )
                setCart(data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function removeItem(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                {
                    headers
                }
            )
            toast.success("Remove " + data.status)
            setCart(data)
        } catch (error) {
            console.log(error);

        }

    }
    async function PlusItem(id, count) {
        if (count > 0) {
            try {
                let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                    {
                        count: count++
                    },
                    {
                        headers
                    }
                )
                toast.success(data.status)
                setCart(data)
            } catch (error) {
                console.log(error);

            }
        } else {
            removeItem(id)
        }

    }
    async function clearCart() {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
                {
                    headers
                }
            )
            setCart(null)
        } catch (error) {
            console.log(error);
        }
    }
    async function AddProductToWishlist(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId
                }, {
                headers
            }
            )
            toast.success(data.message)
            getWishlist()


        } catch (error) {
            console.log(error);

        }
    }
    async function getWishlist() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    headers
                }
            )
            const idsArray = data.data.map(item => item.id);
            setWishlist(idsArray)
            setWishlistAll(data.data)

        } catch (error) {
            console.log(error);
        }
    }
    async function RemoveProductFromWishlist(id) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                {
                    headers
                }
            )
            toast.success("Remove " + data.status)
            getWishlist()
        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        DisplayCart()
    }, [])
    return <CartContext.Provider value={{ addProductTOCart, Cart, DisplayCart, removeItem, PlusItem, clearCart, AddProductToWishlist, getWishlist, wishlist, RemoveProductFromWishlist, wishlistAll }}>
        {children}
    </CartContext.Provider>

}