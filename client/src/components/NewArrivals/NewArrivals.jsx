
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import Card from '../Card/Card';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../api';
import Loader from '../Loader/Loader';

const NewArrivals = () => {
  const page = 1;
  const limit = 10;
  const getProducts = async () => {
    const res = await axiosSecure.get(`/products?page=${page}&limit=${limit}`)
    return res
  }


  const {
    data: products,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['product',limit,page],
    queryFn: getProducts,
  })



   console.log(products?.data?.result)
  if (isLoading) return <Loader></Loader>

  return (
    <div className='rounded-xl  m-6' data-aos='fade-down' data-aos-delay='400'>

      <div className='text-center mb-4' data-aos='fade-down' data-aos-delay='600'>
        <p className='text-2xl font-bold text-green-700'>Customers Favorites</p>
        <h2 className='text-lg font-medium text-red-600'>New Arrivals</h2>
      </div>
      <div className='pb-6'>
        <Swiper data-aos='fade-up' data-aos-delay='600'
          speed={1000}
          grabCursor={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{

            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 4,
              spaceBetween: 10,
          },
          1200: {
              slidesPerView: 6,
              spaceBetween: 10,
          }
         
          
          }}
        >
          {
            products.data.result.map(product => <SwiperSlide key={product?._id}><Card product={product}></Card></SwiperSlide>)

          }

        </Swiper>
      </div>
    </div>
  );
}
export default NewArrivals
