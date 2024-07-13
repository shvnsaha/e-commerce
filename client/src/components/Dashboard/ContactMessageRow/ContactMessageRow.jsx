import React from 'react';

const ContactMessageRow = ({item,index}) => {
    return (
        <tr>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{index+1}</p>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.name}</p>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.email}</p>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.subject}</p>
            </td>
            <td className='px-5 py-5 border-b text-center border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.description}</p>
            </td>
            
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-center text-sm'>
               {
                (()=>{
                    const date = new Date(item?.createAt)
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
            
        </tr>
    );
};

export default ContactMessageRow;