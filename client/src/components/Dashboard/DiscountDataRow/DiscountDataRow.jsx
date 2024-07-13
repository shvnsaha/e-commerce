import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import useDiscount from '../../../hooks/useDiscount';
import Swal from 'sweetalert2';
import { deleteDiscount } from '../../../api/discounts';
import { IoCheckmarkCircle } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import toast from 'react-hot-toast';
import { MdSystemUpdateAlt } from "react-icons/md";

const DiscountDataRow = ({ item, index,refetch,handleUpdate }) => {

    const date = Date.now();
    

    const handleDelete = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                 deleteDiscount(id)
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                           toast.success('Discount Deleted')
                            
                        }
    
                    })
            }
          });
      }

      
    return (
        <tr>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{index+1}</p>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.name}</p>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.category}</p>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.brand_name}</p>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.price}%</p>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.cupon}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
               {
                (()=>{
                    const date = new Date(item?.exDate)
                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}` 
                    return(
                       <>
                        <p className='text-gray-900 whitespace-no-wrap'>{formattedDate}</p>
                        <p className='text-gray-900 whitespace-no-wrap'>{formattedTime}</p>
                       </>
                    )
                })()
               }
                
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
         
                 <button>{ (date<item?.exDate) ? <IoCheckmarkCircle color='green' /> : <HiMiniXMark color='red' />}</button>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <button onClick={() => handleDelete(item?._id)} className='relative text-red cursor-pointer'><MdDeleteOutline color='red'></MdDeleteOutline></button>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
               <button onClick={()=>handleUpdate(item)} className='relative text-red cursor-pointer'><MdSystemUpdateAlt color='green' /></button>
            </td>
        </tr>
    );
};

export default DiscountDataRow;