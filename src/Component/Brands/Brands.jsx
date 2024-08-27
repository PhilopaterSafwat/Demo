import React, { useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Helmet, HelmetProvider } from 'react-helmet-async';


export default function Brands() {
    const TITLE = 'Brands';
    const [Load, setLoad] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    const [swar, setswar] = useState({ image: '', category: '', slug: '' });
    function getcategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
    let { data, isLoading, isError, isFetching, error } = useQuery({
        queryKey: ['brands'],
        queryFn: getcategories,
        select: (data) => data.data.data
    })
    function load() {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
            setIsOpen(true)
        }, 1500);
    }

    return <>
        <HelmetProvider>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            {isLoading ? <div role="status" className='flex items-center justify-center'>
                <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div> : <>
                <h2 className='text-center text-4xl text-main'>All Brands</h2>
                <div className='container flex flex-wrap'>
                    {data?.map((category, index) =>
                        <div className='md:w-1/2 lg:w-1/4 relative w-full p-5' key={index} onClick={() => { load(), setswar({ image: category.image, category: category.name, slug: category.slug }) }}>
                            <div className=' border-2 border-solid border-gray-300 rounded-md shadow-felo'>
                                <div className='w-full'>
                                    <img src={category.image} alt={category.name} className='object-cover w-full object-center' />
                                </div>
                                <div>
                                    <h2 className='text-center my-5'>{category.name}</h2>
                                </div>
                            </div>

                        </div>
                    )
                    }
                </div></>}
            <div className={`fixed ${Load ? "flex" : "hidden"} items-center bg-slate-50 bg-opacity-50 w-screen h-screen text-center z-50 left-0 top-0`}>
                <div role="status" className='mx-auto'>
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin  fill-emerald-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
                        <div className='flex items-center md:flex-row flex-col'>
                            <div>
                                <h2 className='text-main text-4xl'>{swar.category}</h2>
                                <h2>{swar.slug}</h2>
                            </div>
                            <img src={swar.image} />
                        </div>

                        <div className="flex gap-4">
                            <button className='text-white bg-emerald-500 hover:bg-emerald-800 px-3 py-2 rounded-md transition-all' onClick={() => setIsOpen(false)}>Cancel</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </HelmetProvider>
    </>
}

