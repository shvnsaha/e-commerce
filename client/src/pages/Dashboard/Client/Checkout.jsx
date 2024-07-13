import React from 'react'
import useCart from '../../../hooks/useCart';
import useUser from '../../../hooks/useUser';
import { orderProduct } from '../../../api/bookings';
import { TbCurrencyTaka } from "react-icons/tb";



export default function Checkout() {
    const [cart, isLoading] = useCart();
    const cartTotal = cart.reduce((sum, item) => sum + (item.quantity * item.discountPrice), 0)
    const [userData, refetch] = useUser();


    const handleSubmit = async e =>{
        e.preventDefault();
        const form = e.target; 
        const name = form.name.value;
        const phone = form.phone.value;
        const address = form.address.value;

        const paymentInfo = {
            name,
            phone,
            email: userData?.email,
            address,
            cartTotal,
            quantity: cart.length,
            currency: 'BDT',
            status: 'pending',
            itemName: cart.map(item => item.name),
            itemQuantity: cart.map(item => item.quantity),
            itemPrice: cart.map(item => item?.discountPrice * item?.quantity),
            cartItems: cart.map(item => item._id),
            productItems: cart.map(item => item.productId),
            date: Date.now(),
        }

        console.log(paymentInfo)

        const data = await orderProduct(paymentInfo)
        window.location.replace(data.url)

    }


    return (
        <div>

            <div className='p-10 m-5 rounded-lg text-center bg-blue-500'>
                <h2 className='font-bold text-5xl'>Checkout page</h2>
            </div>


            <div className='mx-auto w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 text-center px-4 py-8'>
                <h3 className='text-lg  font-semibold'>Process Your Payments</h3>

                <form onSubmit={handleSubmit}  className='space-y-3'>
                    <div className='space-y-1 text-sm'>
                        <input
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='name'
                            id='name'
                            type='text'
                            placeholder='Name'
                            defaultValue={userData?.name}
                            required
                        />
                    </div>
                    <div className='space-y-1 text-sm'>
                        <input
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='phone'
                            id='phone'
                            type='text'
                            placeholder='Phone'
                            defaultValue={userData?.phone}
                            required
                        />
                    </div>
                    <div className='space-y-1 text-sm'>
                        <textarea
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='address'
                            id='address'
                            type='text'
                            placeholder='Address'
                            defaultValue={userData?.address}
                            required
                        />
                    </div>
                   
                    <button type='submit' className="btn btn-wide">Pay<TbCurrencyTaka size={20} />{cartTotal}</button>
                   
                </form>
            </div>



        </div>
    )
}

