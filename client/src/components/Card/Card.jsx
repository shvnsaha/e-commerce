import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { addCart, newaddCart } from '../../api/carts';
import useCart from '../../hooks/useCart';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import Ratings from '../Shared/Ratings';
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import useDiscount from '../../hooks/useDiscount';
import { TbCurrencyTaka } from "react-icons/tb";


const Card = ({ product }) => {
    const { _id, name, image, price,
        rating,
        product_number,
        brand_name, category,
    } = product;

    const [cart, refetch, isLoading] = useCart();
    const [discountCupon, Loading] = useDiscount();

    let discount;
    discountCupon.forEach((item) => {
        if (item?.brand_name === brand_name && item?.category === category)
            discount = item?.price
    })

    console.log(discount);

    let cupon = '';
    let discountPrice;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const handleAddCart = (id) => {

        if (product_number > 0) {
            if (user && user?.email) {
                let find = 0;
                let product_quantity = 1, pid;
                cart.map(item => {
                    if (item?.productId === id && item?.email === user?.email) {
                        find = 1;
                        product_quantity = item?.quantity + 1;
                        pid = item?._id;
                        cupon = item?.cupon
                        discountPrice = item?.discountPrice
                        return
                    }
                })

                let cartItem
                if (find == 1) {
                    cartItem = { productId: _id, name, quantity: product_quantity, image, discountPrice: discountPrice, price, cupon, email: user?.email };
                }
                else
                    cartItem = { productId: _id, name, quantity: product_quantity, image, discountPrice: price, price, cupon, email: user?.email };

                if (find == 1) {
                    addCart(cartItem, pid)
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                refetch();
                                toast.success('Product added on cart')

                            }
                        })
                        .then(err => console.log(err));

                }
                else {
                    newaddCart(cartItem)
                        .then(data => {
                            if (data.insertedId) {
                                refetch();
                                toast.success('Product added on cart')
                            }
                        })
                }
            }
            else {
                navigate('/login', { state: { from: location } })
            }
        }
        else {
            toast.error('Not enough product')
        }
    }



    if (isLoading && Loading) return <Loader></Loader>
    return (


        <div className='col-span-1  cursor-pointer group border-2 bg-base-200 hover:shadow-xl rounded-xl p-2'>
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
                        src={image}
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
                <div className='font-semibold text-lg'>{name}</div>
                <div className='flex justify-between items-center'>
                    <div className='font-semibold text-xs text-violet-900'>{category}</div>
                    <div className='font-semibold text-xs text-violet-900'>{brand_name}</div>
                </div>

                <div className='flex items-center text-xs text-gray-700 justify-between'>
                    <div className='flex items-center text-xs text-gray-700 gap-2'>
                        <Ratings rating={rating}></Ratings>
                        <span>{
                            rating !== 0 ? <span>({rating})</span> : <></>
                        }</span>
                    </div>
                    {
                        product_number > 0 ? <span className='text-xs text-green-900 font-semibold'>In stock</span> : <span className='text-xs text-red-900 font-semibold'>Out of stock</span>
                    }

                </div>
                <div className='flex justify-between items-center'>
                    <div className='font-semibold flex items-center text-orange-800'><TbCurrencyTaka size={20}></TbCurrencyTaka> {price}</div>
                    {
                        discount ? <span className='text-xs text-orange-700 font-semibold'>{discount}% off</span> : <></>
                    }
                </div>
                <div className='flex justify-between items-center'>
                    <Link to={`/product/${_id}`} className='btn btn-outline'>View Details <FaArrowTrendUp ></FaArrowTrendUp> </Link>
                    <button onClick={() => handleAddCart(product._id)}><FaCartArrowDown size={20} ></FaCartArrowDown></button>
                </div>
            </div>
        </div>




    );
};

export default Card;
// hover:-translate-y-4 duration-300 transition-all