import React, { useEffect, useState } from 'react';
import useProduct from '../../../hooks/useProduct';
import ProductDataRow from '../../../components/Dashboard/ProductDataRow/ProductDataRow';
import Loader from '../../../components/Loader/Loader';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../../api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string'


const ManageProduct = () => {

    const [name, setName] = useState('')
    const [page, setpage] = useState(1);


    const limit = 5;

    //
    console.log(name);

    const getProducts = async () => {
        const res = await axiosSecure.get(`/products?name=${name}&page=${page}&limit=${limit}`)
        return res
    }

    const {
        data: products,
        isLoading,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: ['product', name, page],
        queryFn: getProducts,
    })

    const handleSearch = (event) => {
        setName(event.target.value)
        setpage(1);
    }

    const Pginetionclass =
        "join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200";



    return (

        <div className='container mx-auto px-4 sm:px-8'>
            <Helmet>
                <title>E-Shop | Manage Products</title>
            </Helmet>

            <div className='flex justify-center mt-3'>
                <input
                    id="search" type="text" placeholder='Search Here' className='md:w-[30%] w-40 h-[50px] p-3 rounded-full border-2 border-[#DEDEDE]' onChange={handleSearch} defaultValue={name} />
            </div>

            {
                isLoading ?
                    <Loader></Loader> :
                    <div className='py-8'>
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
                                                Product
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-sm uppercase font-normal'
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                            >
                                                Stocks
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                            >
                                                Total Sold
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                                            >
                                                Delete
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-sm uppercase font-normal'
                                            >
                                                Update
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>{/* Room row data */}
                                        {
                                           
                                            products?.data?.result.map((item, index) => <ProductDataRow key={item._id} item={item} index={index}refetch={refetch}></ProductDataRow>)
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
                        {[...Array(Math.ceil(products?.data?.total / limit)).keys()].map(
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
                            disabled={page === Math.ceil(products?.data?.total / limit)}
                            className={`${Pginetionclass} disabled:bg-green-100`}
                        >
                            »
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProduct;