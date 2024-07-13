import React, { useState } from 'react';
import axiosSecure from '../../../api';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader/Loader';
import { Helmet } from 'react-helmet';
import ContactMessageRow from '../../../components/Dashboard/ContactMessageRow/ContactMessageRow';

const ContactMessage = () => {
    const [page, setpage] = useState(1);


    const limit = 10;
    const getContacts = async () => {
        const res = await axiosSecure.get(`/contacts?page=${page}&limit=${limit}`)
        return res
    }

    const {
        data: contacts,
        isLoading,
        isSuccess,
        refetch
    } = useQuery({
        queryKey: ['contact', page],
        queryFn: getContacts,
    })

    console.log(contacts?.data?.result);

    const Pginetionclass =
        "join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200";

    return (
        <div className='container mx-auto px-4 sm:px-8'>
        <Helmet>
            <title>E-Shop | Manage Messsages</title>
        </Helmet>
        {
            isLoading ? <Loader></Loader> :

                    <div className='py-8'>
                        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                <table className='min-w-full leading-normal'>
                                    <thead>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                #
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                Subject
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                Message
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                Date
                                            </th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>{/* Room row data */}
                                        {
                                            contacts.data.result.map((item, index) => <ContactMessageRow key={item?._id} item={item} index={index}></ContactMessageRow>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> 
                    
        }

        {isSuccess && (
            <div className="paginetion flex mb-20">
                <div className="join border-green-300 border mx-auto ">
                    <button
                        onClick={() => setpage((old) => old - 1)}
                        disabled={1 === page}
                        className={`${Pginetionclass} disabled:bg-green-100`}
                    >
                        «
                    </button>
                    {[...Array(Math.ceil(contacts?.data?.total / limit)).keys()].map(
                        (ele) => {
                            return (
                                <button
                                    onClick={() => setpage(ele + 1)}
                                    key={ele + 1}
                                    className={`${Pginetionclass} ${ele + 1 === parseInt(page) ? "bg-yellow-300" : ""
                                        } `}
                                >
                                    {ele + 1}
                                </button>
                            );
                        }
                    )}

                    <button
                        onClick={() => setpage((old) => old + 1)}
                        disabled={page === Math.ceil(contacts?.data?.total / limit)}
                        className={`${Pginetionclass} disabled:bg-green-100`}
                    >
                        »
                    </button>
                </div>
            </div>
        )}

        {
            // <UpdateDiscountModal
            //     closeModal={closeModal}
            //     isOpen={isOpen} item={item} handleSubmit={handleSubmit} loading={loading} category={category} brand={brand}
            // ></UpdateDiscountModal>
        }
    </div>
    );
};

export default ContactMessage;