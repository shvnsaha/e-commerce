import React from 'react';
import useUsers from '../../../hooks/useUsers';
import Swal from 'sweetalert2';
import { deleteUser } from '../../../api/Auth';
import { MdDeleteOutline, MdOutlineCancelPresentation } from 'react-icons/md';
import avatar from '../../../assets/images/placeholder.jpg'
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { FcVoicePresentation } from "react-icons/fc";

const UserDataRow = ({ item, index }) => {
    const [users, refetch, isLoading] = useUsers();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteUser(id)
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'User Deleted',
                                'success'
                            )

                        }

                    })
            }
        });
    }

    return (
        <tr className='text-center'>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex justify-center items-center '>
                    <div className="avatar">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={item?.image? item?.image: avatar} />
                        </div>
                    </div>
                </div>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.email}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-blue-900 whitespace-no-wrap'>{item?.phone}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
             
               <button>
               {
                    item?.role === 'admin' ?  <MdAdminPanelSettings size={20} color='red' /> : <FaUserCheck size={20} color='green'/>

                }
               </button>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button>
                    {
                        item?.message === 'sent' ? <FcVoicePresentation size={20}/> : <MdOutlineCancelPresentation size={15} color='green'/>
                    }
                </button>
            </td>
            {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <button onClick={() => handleDelete(item?._id)} className='relative text-red cursor-pointer'><MdDeleteOutline></MdDeleteOutline></button>
        </td> */}

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button onClick={() => handleDelete(item?._id)} className='relative text-red cursor-pointer'><MdDeleteOutline size={15} color='red'></MdDeleteOutline></button>
            </td>

        </tr>
    );
};

export default UserDataRow;