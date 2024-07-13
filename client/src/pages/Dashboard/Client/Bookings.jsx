import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import ClientBookingRow from '../../../components/Dashboard/ClientBookingRow/ClientBookingRow';
import Loader from '../../../components/Loader/Loader';
import axiosSecure from '../../../api';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import RefundModal from '../../../components/Modal/RefundModal';
import { addRefund, bookindRefundStatus,  } from '../../../api/bookings';
import toast from 'react-hot-toast';

const Bookings = () => {

    const [page, setpage] = useState(1);
    const [isOpen, setIsOpen] = useState(false)
    const [item, setItem] = useState({});
    const { user } = useAuth();
    const [loading, setLoading] = useState(false)
    const [refund, setRefund] = useState([]);
    const navigate = useNavigate();
    


    const openModal = async (item) => {
        setIsOpen(true);
        setItem(item);
        item?.itemName.map((it, index) => {
            refund[index] = {
                name: item?.itemName[index],
                quantity: item?.itemQuantity[index],
                price: item?.itemPrice[index] / item?.itemQuantity[index]
            }
            
        })
    }
    function closeModal() {
        setIsOpen(false)
        setItem({})
    }

    const handleChange = (event, index) => {
        refund[index][event.target.name] = parseInt(event.target.value)   
    }
   
    const handleSubmit = async (event, index) => {
        event.preventDefault();
        console.log(refund)
        const refundData = refund.filter(re=>re?.quantity>0)
        if(refundData.length>0){

            const finalRefundData = {
                name: item?.name,
                phone:item?.phone,
                email:item?.email,
                address: item?.address,
                refundData: refundData,
                status: 'pending',
                date : Date.now(),
                bookingId: item?._id,
                bookingTranId: item?.transactionId
            }

            try{
                setLoading(true)
                const data = await addRefund(finalRefundData)
                const result = await bookindRefundStatus(item?._id,{refundStatus: false})
                refetch()
                toast.success('Refund added');
                navigate('/dashboard/refunds');
               }catch(err){
                 console.log(err);
                 toast.error(err.message);
               }finally{
                setLoading(false);
               }
        }

        setIsOpen(false)
    }

    const limit = 10;
    const getBookings = async () => {
        const res = await axiosSecure.get(`/bookings?page=${page}&limit=${limit}&email=${user?.email}`)
        return res
    }

    const {
        data: bookings,
        isLoading,
        isSuccess,
        refetch
    } = useQuery({
        queryKey: ['booking', page, limit],
        queryFn: getBookings,
    })
    const Pginetionclass =
        "join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200";


    if (isLoading) return <Loader></Loader>
    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <Helmet>
                <title>E-Shop | My Bookings</title>
            </Helmet>
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
                                        Name
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 text-center bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 text-center bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                    >
                                        Transaction ID
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                    >
                                        Refund
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookings?.data?.result.map((item, index) => <ClientBookingRow key={item._id} item={item} index={index} openModal={openModal}></ClientBookingRow>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

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
                        {[...Array(Math.ceil(bookings?.data?.total / limit)).keys()].map(
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
                            disabled={page === Math.ceil(bookings?.data?.total / limit)}
                            className={`${Pginetionclass} disabled:bg-green-100`}
                        >
                            »
                        </button>
                    </div>
                </div>
            )}

            {
                <RefundModal
                    closeModal={closeModal}
                    isOpen={isOpen} item={item} handleSubmit={handleSubmit} loading={loading} handleChange={handleChange} 
                >
                </RefundModal>
            }
        </div>
    );
};

export default Bookings;