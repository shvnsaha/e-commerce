import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import axiosSecure from '../../../api';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../components/Loader/Loader';
import AllRefundRow from '../../../components/Dashboard/AllRefundRow/AllRefundRow';
import { refundPayment, refundStatus } from '../../../api/bookings';

const ManageRefunds = () => {

    const [page, setpage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')


    const limit = 10;
    const getRefunds = async () => {
        const res = await axiosSecure.get(`/refunds?name=${name}&page=${page}&limit=${limit}`)
        return res
    }

    const {
        data: refunds,
        isLoading,
        isSuccess,
        refetch
    } = useQuery({
        queryKey: ['refund', page, limit, name],
        queryFn: getRefunds,
    })

    console.log(refunds?.data?.result)

    const handleStatus = async (item) => {
        if (item?.status === 'pending') {
            setLoading(true)
            refundStatus(item?._id, { newStatus: 'accepted' })
                .then(data => {
                    if (data.modifiedCount > 0)
                        refetch();
                })

            setLoading(false);
        }
        else if (item?.status === 'accepted') {
            const calculatePrice = item => {
                return (item?.price * item?.quantity).toFixed(2);
            }

            const total = item?.refundData.reduce((total, item) => {
                return total + parseFloat(calculatePrice(item));
            }, 0)

            const refundTotal = total - 150;
            const refundInfo = {
                refundId: item?._id,
                name: item?.name,
                phone: item?.phone,
                email: item?.email,
                address: item?.address,
                price: refundTotal
            }

            const data = await refundPayment(refundInfo)
            window.location.replace(data.url)
        }
    }

    const handleSearch = (event) => {
        setName(event.target.value)
        setpage(1);
    }

    const Pginetionclass =
        "join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200";

   

    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <Helmet>
                <title>E-Shop | Manage Refunds</title>
            </Helmet>

            <div className='flex justify-center mt-3'>
                <input
                    id="search" type="text" placeholder='Search Here Transaction ID' className='md:w-[30%] w-40 h-[50px] p-3 rounded-full border-2 border-[#DEDEDE]' onChange={handleSearch} defaultValue={name} />
            </div>
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
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'
                                            >
                                                #
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                Date
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-centertext-sm uppercase font-normal'
                                            >
                                                Client
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 text-center bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                            >
                                                Address
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                Product Name
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{/* Room row data */}

                                        {
                                            refunds?.data?.result.map((item, index) => <AllRefundRow key={item?._id} item={item} index={index} handleStatus={handleStatus} loading={loading}></AllRefundRow>)

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
                        {[...Array(Math.ceil(refunds?.data?.total / limit)).keys()].map(
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
                            disabled={page === Math.ceil(refunds?.data?.total / limit)}
                            className={`${Pginetionclass} disabled:bg-green-100`}
                        >
                            »
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ManageRefunds;