import React, { useContext, useState } from 'react'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import style from './Checkout.module.css'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const validationSchema = Yup.object().shape({
    details: Yup.string().required('Address is required'),
    phone: Yup.string()
        .matches(/^(002)?01[0125][0-9]{8}$/, 'Phone must be an Egyptian number')
        .required('Phone is required'),
    city: Yup.string().required('City is required'),
})

const Checkout = () => {

    const [loading, setLoading] = useState(false)
    const [apiErr, setApiErr] = useState('')
    const cartid = useContext(CartContext)
    let headers = { token: localStorage.getItem('userToken') };
    async function sendData(values) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid.Cart?.cartId}?url=http://localhost:5173
`,
                {
                    values
                }, {
                headers
            }
            )
            toast.success(data.status)
            console.log(data);
            window.location.href=data.session.url

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="container py-5">
            <Formik
                initialValues={{
                    details: '',
                    phone: '',
                    city: '',
                }}
                validationSchema={validationSchema}
                onSubmit={sendData}
            >
                {({ errors, touched }) => (
                    <Form className="max-w-4xl mx-auto">
                        <h1 className='text-4xl mb-5 font-semibold'>Shipping Address</h1>
                        {apiErr && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">{apiErr}</div>}

                        <div className="relative z-0 w-full mb-5 group">
                            <Field
                                type="text"
                                name="details"
                                id="details"
                                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="details"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Address
                            </label>
                            {errors.details && touched.details && (
                                <div className="mt-5 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    {errors.details}
                                </div>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <Field
                                type="tel"
                                name="phone"
                                id="phone"
                                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="phone"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Phone
                            </label>
                            {errors.phone && touched.phone && (
                                <div className="mt-5 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <Field
                                as="select"
                                name="city"
                                id="city"
                                className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="" label="Select a city" />
                                <option value="Cairo">Cairo</option>
                                <option value="Giza">Giza</option>
                                <option value="Alexandria">Alexandria</option>
                            </Field>
                            {errors.city && touched.city && (
                                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                    {errors.city}
                                </div>
                            )}
                        </div>

                        <button
                            type='submit'
                            className='text-white bg-emerald-500 hover:bg-emerald-800 p-2 rounded-md transition-all'
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>

                        {loading && (
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-500"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Checkout
