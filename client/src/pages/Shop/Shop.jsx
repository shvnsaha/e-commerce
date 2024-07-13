import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { CiSearch } from "react-icons/ci";
import { getAllBrand, getAllCategory } from '../../api/products';
import useProduct from '../../hooks/useProduct';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string'
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import Lottie from 'lottie-react';
import nodatafound from "../../../public/NoData.json";
import ScrollTop from '../../hooks/scrollTop';



const Shop = () => {

    ScrollTop();
    const [loader, setLoader] = useState(false)
    const [brands, setBrands] = useState([])
    const [categorys, setCategorys] = useState([])
    const [params, setParams] = useSearchParams();
    const [page, setpage] = useState(1);
   
    const navigate = useNavigate();

    let currentQuery = {}
    const category = params.get('category') ? params.get('category') : 'All Categories'
    const brand = params.get('brand') ? params.get('brand') : 'All Brands'
    const name = params.get('name') ? params.get('name') : '';
    const sortOrder = params.get('sortOrder') ? params.get('sortOrder') : 'Default';
    const limit = 6;


    const getProducts = async () => {
        const res = await axiosSecure.get(`/products?category=${category}&brand=${brand}&sortField=price&sortOrder=${sortOrder}&name=${name}&page=${page}&limit=${limit}`)
        return res
    }

    const {
        data: products,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ['product', category, brand, sortOrder, name,page],
        queryFn: getProducts,
    })

    console.log(products?.data?.result);

    // category and brand get
    useEffect(() => {
        setLoader(true)
        getAllBrand()
            .then(data => {
                setBrands(data);
            })
        getAllCategory()
            .then(data => {
                setCategorys(data)
            })
        setLoader(false)
    }, [])

    const handleBrandChange = (event) => {
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = { ...currentQuery, brand: event.target.value }

        const url = qs.stringifyUrl({
            url: '/shop',
            query: updatedQuery
        })

        navigate(url)

    };

    const handleCategoryChange = (event) => {
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = { ...currentQuery, category: event.target.value }

        const url = qs.stringifyUrl({
            url: '/shop',
            query: updatedQuery
        })

        navigate(url)

    };

    const handleSortChange = (event) => {
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = { ...currentQuery, sortOrder: event.target.value }

        const url = qs.stringifyUrl({
            url: '/shop',
            query: updatedQuery
        })

      

        navigate(url)
    }

    const handleSearch = (event) => {
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery = { ...currentQuery, name: event.target.value }

        const url = qs.stringifyUrl({
            url: '/shop',
            query: updatedQuery
        })

        navigate(url)
        setpage(1)

    }


    const Pginetionclass =
    "join-item  btn text-lg font-bold hover:bg-green-600 hover:text-white font-Montserrat bg-green-200";


    console.log(page); 

    return (
        <div className='px-4'>
            <Helmet>
                <title>E-Shop | Buy Your Products</title>
            </Helmet>

            {/* banner */}
            <div className="banner h-52 bg-blend-overlay rounded-lg" data-aos='fade-down' data-aos-delay='400'>
                <h2 className=' text-2xl text-center ml-2 sm:ml-0 lg:text-5xl font-bold text-green-600 pt-10' data-aos='fade-down' data-aos-delay='400'>Find Your Desired Product</h2>
                <div className='flex  justify-center pt-8 items-center' data-aos='fade-down' data-aos-delay='400' >
                    <input
                        id="search" type="text" placeholder='Search Here' className='md:w-[30%] w-40 h-[50px] p-3 rounded-full border-2 border-[#DEDEDE]' onChange={handleSearch} defaultValue={name} />
                </div>
            </div>

            {/* category filter */}

            <div className='bg-green-200 p-2 rounded-lg' data-aos='fade-down' data-aos-delay='400'>
                <div className='bg-white p-8 rounded-lg flex flex-col lg:flex-row justify-between items-center'>
                    <div>
                        <h2 className='font-semibold text-2xl'>Filter By:</h2>
                    </div>
                    <div className='flex flex-col lg:flex-row justify-between items-center gap-4'>
                        <div className='flex gap-2 rounded-sm items-center'>
                            <label className="text-lg font-semibold">
                                Category:
                            </label>
                            <select className=" select max-w-xs focus:outline-none text-base font-medium border-green-700   select-bordered w-full " value={category} onChange={handleCategoryChange}
                            >
                                <option value="All Categories">All Categories</option>
                                {categorys.map((item) => (
                                    <option key={item?._id} value={item?.categoryname}>{item?.categoryname}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex gap-2 rounded-sm items-center'>
                            <label className="text-lg font-semibold">
                                Brand:
                            </label>
                            <select className=" select max-w-xs focus:outline-none text-base font-medium border-green-700   select-bordered w-full " value={brand} onChange={handleBrandChange}
                            >
                                <option value="All Brands">All Brands</option>
                                {brands.map((item) => (
                                    <option key={item?._id} value={item?.brandname}>{item?.brandname}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex gap-2 rounded-sm items-center'>
                            <label className="text-lg font-semibold">
                                Sort:
                            </label>
                            <select className=" select max-w-xs focus:outline-none text-base font-medium border-green-700   select-bordered w-full " onChange={handleSortChange} value={sortOrder}
                            >
                                <option value="Default">Choose One</option>
                                <option value="asc">Low to High</option>
                                <option value="desc">High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className=' text-center mt-6 shadow-xl rounded-lg pb-3' data-aos='fade-down' data-aos-delay='400'>
                <h1 className="font-bold text-purple-900 md:text-2xl text-xl">{brand}/{category}</h1>
            </div>

            {/* product */}
            {
                isLoading ? (
                    <Loader></Loader>
                ):  products?.data?.result.length > 0 ?
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 my-10' data-aos='fade-down' data-aos-delay='400'>
                {
                    
                    products?.data?.result.map((product) => <Card key={product._id} product={product}></Card>)
                }
            </div> : 
             (
                <div className="col-span-3 h-96 flex my-20 justify-center items-center">
                  <Lottie className="h-96" animationData={nodatafound}></Lottie>
                </div>
              )

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
    )
}

export default Shop;
