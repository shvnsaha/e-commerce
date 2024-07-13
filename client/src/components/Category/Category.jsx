import React, { useEffect, useState } from "react";
import image from "../../assets/images/macbook.png"
import Image2 from "../../assets/images/macbook.png"
import Image3 from "../../assets/images/macbook.png"
import { getAllCategory } from "../../api/products";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";





const Category = () => {

    const [loader, setLoader] = useState(false)
    const [category, setCategory] = useState([])

    useEffect(() => {
        setLoader(true)
        getAllCategory()
            .then(data => {
                setCategory(data)
            })
        setLoader(false)
    }, [])

    if (loader) return <Loader></Loader>

    return (
        <div className="py-8 m-6">

            <div className="grid mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 " data-aos='fade-down' data-aos-delay='400'>
                {
                    category.map(item =>

                        <Link key={item?._id} to={`/shop?category=${item?.categoryname}`}>
                            <div  className='col-span-1  cursor-pointer group border-2 bg-base-200 hover:shadow-xl rounded-xl p-2'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <div
                                        className='
                    aspect-square 
                    w-full 
                    relative 
                    overflow-hidden 
                    rounded-xl
                  '
                                    >
                                        <img
                                            className='
                      object-cover 
                      h-full 
                      w-full 
                      group-hover:scale-110 
                      transition
                    '
                                            src={item?.image}
                                            alt='Room'
                                        />
                                        <div
                                            className='
                    absolute
                    top-3
                    right-3
                  '
                                        ></div>
                                    </div>
                                    <div className='font-semibold text-sm  mg:text-lg text-center bg-green-300 hover:bg-yellow-300 rounded-xl p-2'>{item?.
                                        categoryname}</div>



                                </div>
                            </div>
                        </Link>

                    )
                }




            </div>
        </div>

    );
};

export default Category;