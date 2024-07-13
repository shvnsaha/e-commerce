import React from 'react'
import { FaAnglesRight } from 'react-icons/fa6';
import { GiConfirmed } from 'react-icons/gi';
import { LiaAmazonPay } from "react-icons/lia";
import { MdPendingActions } from 'react-icons/md';
import { TbFidgetSpinner } from 'react-icons/tb';


const AllRefundRow = ({ item, index, handleStatus, loading }) => {

    const calculatePrice = item => {
        return (item?.price * item?.quantity).toFixed(2);
    }

    const refundTotal = item?.refundData.reduce((total, item) => {
        return total + parseFloat(calculatePrice(item));
    }, 0)

    return (
        <tr>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                {
                    (() => {
                        const date = new Date(item?.date)
                        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                        const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
                        return (
                            <>
                                <p className='text-gray-900 whitespace-no-wrap'>{formattedDate}</p>
                                <p className='text-gray-900 whitespace-no-wrap'>{formattedTime}</p>
                            </>
                        )
                    })()
                }

            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.name}</p>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.phone}</p>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.email}</p>

            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.address}</p>
            </td>


            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                {
                    item?.refundData.map((it, index) => <p key={index} className='text-gray-900 whitespace-no-wrap border-2'>{`${index + 1}. ${it?.name} - 
                    ${it?.quantity}`}</p>)

                }
            </td>

            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{refundTotal-150}</p>
            </td>

            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                {
                    loading ?  <TbFidgetSpinner className='m-auto animate-spin' size={24} /> :
                        <button onClick={() => handleStatus(item)} className='text-gray-900 whitespace-no-wrap'>{item?.status === 'pending' ?
                            <MdPendingActions size={20} /> : item?.status === 'accepted' ? <LiaAmazonPay size={30} color='blue' />
                                : <GiConfirmed size={20} color='green' />
                        }</button>
                }
            </td>


        </tr>
    )
}

export default AllRefundRow;