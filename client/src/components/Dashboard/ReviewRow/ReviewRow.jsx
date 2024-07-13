import React from 'react';
import { GrUpdate } from 'react-icons/gr';
import { MdDeleteOutline, MdOutlineRateReview } from 'react-icons/md';

const ReviewRow = ({index,item,handleDelete,handleUpdate,loading}) => {
    return (
        <tr>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
            </td>


            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                {
                    <p className='text-gray-900 whitespace-no-wrap'>{item?.productName}</p>
                }
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                {
                    <p className='text-gray-900 whitespace-no-wrap'>{item?.rating}</p>
                }
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                {
                    <p className='text-gray-900 whitespace-no-wrap'>{item?.review.slice(0,20)}</p>
                }
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
               {
                (()=>{
                    const date = new Date(item?.date)
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
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                {
                    <button onClick={()=>handleUpdate(item)}  className='relative cursor-pointer text-green tooltip' data-tip="Update"><GrUpdate size={20}></GrUpdate></button>
                }
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                {
                    <button  onClick={()=>handleDelete(item)} className='relative cursor-pointer text-red tooltip' data-tip="Delete"><MdDeleteOutline size={20}></MdDeleteOutline></button>
                }
            </td>

            {/* <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.status}</p>
            </td> */}
            {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <button onClick={} className='relative text-red cursor-pointer'><MdDeleteOutline></MdDeleteOutline></button>
        </td> */}

        </tr>
    );
};

export default ReviewRow;