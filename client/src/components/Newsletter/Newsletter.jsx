import React from 'react'
import { IoMailOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import toast from 'react-hot-toast';

const Newsletter = () => {
    const handlesubmit = () =>{
        toast.success('Subscribed successfully')
    }
    return (
        <div className='bg-green-200 rounded-lg  m-6' data-aos='fade-down' data-aos-delay='400'>

            <div className='space-y-3 py-20'>
                <div className='flex justify-center'>
                    <IoMailOutline size={30} />
                </div>
                <p className='font-bold text-2xl text-center'>Newsletter</p>
                <div className='flex justify-center'>
                    <input
                        className='w-96 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                        name='email'
                        id='email'
                        type='email'
                        placeholder='Email'
                        required
                    />
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <input type="checkbox" name="" id="" />
                    <p>Send me promotional offers</p>
                </div>
                <div className='flex justify-center'>
                    <button className='flex items-center gap-2 btn btn-outline' onClick={handlesubmit}>
                        <p className='font-semibold text-xl'> Subscribe</p>
                        <FaLocationArrow size={23} />
                    </button>
                </div>
            </div>


        </div>
    )
}
export default Newsletter
