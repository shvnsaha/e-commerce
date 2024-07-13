import React from 'react';
import { MdOutlineRateReview } from "react-icons/md";

const PendingReviewRow = ({item,index,addReview}) => {
    return (
        <tr>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
            </td>


            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                {
                    <p className='text-gray-900 whitespace-no-wrap'>{item?.itemName}</p>
                }
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                {
                    <p className='text-gray-900 whitespace-no-wrap'>{item?.productId}</p>
                }
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
                {
                  <button onClick={() => addReview(item)} className='relative cursor-pointer'><MdOutlineRateReview  size={20}/></button>
                }
            </td>
           
            {/* <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.status}</p>
            </td> */}
            {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <button onClick={() => handleDelete(item?._id)} className='relative text-red cursor-pointer'><MdDeleteOutline></MdDeleteOutline></button>
        </td> */}

        </tr>
    );
};

export default PendingReviewRow;