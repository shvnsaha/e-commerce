import React from 'react';
import useUsers from '../../../hooks/useUsers';
import UserDataRow from '../../../components/Dashboard/UserDataRow/UserDataRow';
import { MdOutlineUpdate } from 'react-icons/md';
import { updateMessageStatus } from '../../../api/Auth';
import Loader from '../../../components/Loader/Loader';
import { Helmet } from 'react-helmet';

const Users = () => {
    const [users,refetch,isLoading] = useUsers();
    const handleUpdate = () =>{
        updateMessageStatus()
        .then(data => {
            if (data.modifiedCount > 0) {
                refetch();
            }
        })
        .then(err => console.log(err));
    }
    
    if(isLoading) return <Loader></Loader>
  
    return (
        <div>
             <Helmet>
            <title>E Shop | Users</title>
        </Helmet>
        <div className='container mx-auto flex justify-end px-4 sm:px-8'>
           <MdOutlineUpdate size={25} onClick={handleUpdate}  className='cursor-pointer'></MdOutlineUpdate>
        </div>
       <div className='container mx-auto px-4 sm:px-8'>
           <div className='pb-8'>
               <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                   <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                       <table className='min-w-full leading-normal'>
                           <thead>
                               <tr className='text-center'>
                                   <th
                                       scope='col'
                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                   >
                                       #
                                   </th>
                                   <th
                                       scope='col'
                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                   >
                                      Avatar
                                   </th>
                                   <th
                                       scope='col'
                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                   >
                                       Name
                                   </th>
                                   <th
                                       scope='col'
                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                   >
                                       Email
                                   </th>
                                   <th
                                       scope='col'
                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                   >
                                       Phone
                                   </th>
                                   <th
                                       scope='col'
                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                   >
                                       Role
                                   </th>
                                   <th
                                       scope='col'
                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                   >
                                       Message
                                   </th>
                                   <th
                                       scope='col'
                                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                   >
                                       Delete
                                   </th>

                               </tr>
                           </thead>
                           <tbody>{/* Room row data */}

                               {
                                   users.map((item, index) => <UserDataRow key={item._id} item={item} index={index}></UserDataRow>)
                               }
                           </tbody>
                       </table>
                   </div>
               </div>
           </div>
       </div>
   </div>
    );
};

export default Users;