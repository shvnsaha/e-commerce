import React, { useEffect, useState } from 'react';

import Card from '../../components/Card/Card';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api';
import Loader from '../../components/Loader/Loader';


const SimilarProducts = ({ category, id }) => {


    const limit = 6


    const getSimilarProducts = async () => {
        const res = await axiosSecure.get(`/products?category=${category}&limit=${limit}`)
        return res
    }

    const {
        data: products,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ['product', category, limit],
        queryFn: getSimilarProducts,
    })

    console.log(products?.data?.result);
    const similar = products?.data?.result.filter(item => {
        return item?._id !== id;
    })


    if (isLoading) return <Loader></Loader>
    return (
        similar.length>0 ? <div className='lg:px-10 2xl:px-24'>
        <h1 className='text-2xl  font-semibold text-blue-500 shadow-sm p-2 rounded-lg'>Similar Products</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-6' data-aos='fade-down' data-aos-delay='400'>
            {
                similar.map((product) => <Card key={product._id} product={product}></Card>)
            }
        </div>
    </div>:<></>
    );
};

export default SimilarProducts;