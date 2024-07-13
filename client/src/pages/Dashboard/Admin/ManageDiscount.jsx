import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Loader from '../../../components/Loader/Loader';
import DiscountDataRow from '../../../components/Dashboard/DiscountDataRow/DiscountDataRow';
import { useNavigate } from 'react-router-dom';
import axiosSecure from '../../../api';
import { useQuery } from '@tanstack/react-query';
import UpdateDiscountModal from '../../../components/Modal/UpdateDiscountModal';
import { getAllBrand, getAllCategory } from '../../../api/products';
import toast from 'react-hot-toast';
import { updateDiscount } from '../../../api/discounts';


const ManageDiscount = () => {

    const [page, setpage] = useState(1);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false)
    const [brand, setBrand] = useState([])
    const [category, setCategory] = useState([])
    const [loader, setLoader] = useState(false)

    // category and brand get
    useEffect(() => {
        setLoader(true)
        getAllBrand()
            .then(data => {
                setBrand(data);
            })
        getAllCategory()
            .then(data => {
                setCategory(data)
            })
        setLoader(false)
    }, [])


    const handleUpdate = async (item) => {
        setIsOpen(true);
        setItem(item);
    }
    function closeModal() {
        setIsOpen(false)
        setItem({})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const brand_name = form.brand_name.value;
        const price = parseInt(form.price.value);
        const cupon = form.cupon.value;
        const date = form.date.value;
        const time = form.time.value;
        const dtime = `${date}T${time}`
        const date1 = new Date(dtime)
        const date2 = Date.now();
        const date_ms = date1.getTime();

        if (date2 >= date_ms) {
            toast.error('prev date')
        }

        else {

            const discountData = {
                name, category, brand_name, price, cupon, exDate: date_ms
            }

            console.log(discountData, item?._id)


            try {
                setLoading(true)
                const data = await updateDiscount(discountData, item?._id)
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success('Discount Updated');
                }else{
                    toast.error('Discount Already running')
                }
                
            } catch (err) {
                console.log(err);
                toast.error(err.message);
            } finally {
                setLoading(false);
                closeModal();
            }
        }

    }


    const limit = 10;
    const getDiscounts = async () => {
        const res = await axiosSecure.get(`/discounts?page=${page}&limit=${limit}`)
        return res
    }

    const {
        data: discounts,
        isLoading,
        isSuccess,
        refetch
    } = useQuery({
        queryKey: ['discount', page],
        queryFn: getDiscounts,
    })


    const Pginetionclass =
        "join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200";


   

    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <Helmet>
                <title>E-Shop | Manage Discounts</title>
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
                                                    Category
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                                >
                                                    Brand Name
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                                >
                                                    Discount Price
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                                >
                                                    Coupon
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                                >
                                                    Expire Date
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
                                                    Delete
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                                >
                                                    Update
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>{/* Room row data */}
                                            {
                                                discounts.data.result.map((item, index) => <DiscountDataRow key={item?._id} item={item} index={index} refetch={refetch} handleUpdate={handleUpdate}></DiscountDataRow>)
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
                        {[...Array(Math.ceil(discounts?.data?.total / limit)).keys()].map(
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
                            disabled={page === Math.ceil(discounts?.data?.total / limit)}
                            className={`${Pginetionclass} disabled:bg-green-100`}
                        >
                            »
                        </button>
                    </div>
                </div>
            )}

            {
                <UpdateDiscountModal
                    closeModal={closeModal}
                    isOpen={isOpen} item={item} handleSubmit={handleSubmit} loading={loading} category={category} brand={brand}
                ></UpdateDiscountModal>
            }
        </div>
    );
};

export default ManageDiscount;