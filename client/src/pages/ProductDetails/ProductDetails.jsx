import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { addCart, newaddCart } from '../../api/carts';
import Swal from 'sweetalert2';
import SimilarProducts from './SimilarProducts';
import Loader from '../../components/Loader/Loader';
import useDiscount from '../../hooks/useDiscount';
import toast from 'react-hot-toast';
import Ratings from '../../components/Shared/Ratings';
import { getProductReview } from '../../api/review';
import ProductReviewModal from './ProductReviewModal';
import { FaStar } from "react-icons/fa";
import ScrollTop from '../../hooks/scrollTop';
import { Helmet } from 'react-helmet';
import { TbCurrencyTaka } from 'react-icons/tb';


const ProductDetails = () => {
    const { _id, name, image, category, description, price, discount, brand_name,
        ratingNumber, rating, product_number } = useLoaderData()

    ScrollTop();
    const [cart, refetch, isLoading] = useCart();
    const [discountCupon] = useDiscount();
    const [couponCode, setCouponCode] = useState('');
    const [isValidCoupon, setIsValidCoupon] = useState('');
    const [discountPrice, setDiscountPrice] = useState(price);
    const [isOpen, setIsOpen] = useState(false)
    const [reviews, setReviews] = useState([])
    const [loader, setLoader] = useState(false)


    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
    }

    let discountcupon;
    discountCupon.map(item => {
        if (item?.brand_name === brand_name && item?.category === category) {
            discountcupon = item;
        }

    })



    const handleApplyCoupon = () => {
        if (discountcupon?.cupon === couponCode) {
            setIsValidCoupon(discountcupon?._id)
            const percent = discountcupon?.price;
            const subPrice = Math.ceil(parseFloat(price) * parseFloat(percent) / 100)
            setDiscountPrice(price - subPrice)
            toast.success(`Cupon applied successfully -> ${subPrice} reduced`)
        }
        else {
            toast.error('Invalid Cupon')
        }
    }

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [value, setValue] = useState(1);
    const handleIncrease = () => {
        if (value < product_number)
            setValue(value + 1);
        else
            toast.error('Not Enough Products')
    }

    const handleDecrease = () => {
        if (value > 1)
            setValue(value - 1);
    }

    const handleAddToCart = (id) => {
        if (product_number > 0) {
            if (user && user?.email) {
                let find = 0;
                let product_quantity = value, pid;
                cart.map(item => {
                    if (item?.productId === id && item?.email === user?.email) {
                        find = 1;
                        product_quantity = item?.quantity + value;
                        pid = item?._id;
                        return
                    }
                })



                const cartItem = { productId: _id, name, quantity: product_quantity, image, discountPrice, price, cupon: isValidCoupon, email: user?.email };

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
            toast.error('Not Enough Products')
        }
    }



    const showReview = async (productId) => {
        const data = await getProductReview(productId)
        setReviews(data);
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
        // setReviews([])
    }

    useEffect(() => {
        setLoader(true)
        getProductReview(_id)
            .then(data => {
                setReviews(data);
            })
        setLoader(false)
    }, [_id])


    const [images, setImages] = useState({
        img1: image,
        img2: "https://readymadeui.com/images/laptop2.webp",
        img3: "https://readymadeui.com/images/laptop3.webp",
        img4: "https://readymadeui.com/images/laptop4.webp"
    })

    const [activeImg, setActiveImg] = useState(images.img1)



    let val1 = 0, val2 = 0, val3 = 0, val4 = 0, val5 = 0;
    
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].rating == 1)
            val1++;
        else if (reviews[i].rating == 2)
            val2++;
        else if (reviews[i].rating == 3)
            val3++;
        else if (reviews[i].rating == 4)
            val4++;
        else if (reviews[i].rating == 5)
            val5++;
    }

   if(reviews.length>0){
    val1 = (val1 / reviews.length) * 100
    val2 = (val2 / reviews.length) * 100
    val3 = (val3 / reviews.length) * 100
    val4 = (val4 / reviews.length) * 100
    val5 = (val5 / reviews.length) * 100
   }

   

    if (isLoading && loader) return <Loader></Loader>

    return (
        <>
          <Helmet>
          <title>E-Shop | {name}</title>
          </Helmet>
            <div className=" bg-white">
                <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                            <div className="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                                <div className='flex justify-center  
            
                    overflow-hidden 
                    rounded-xl'>
                                    <img
                                        src={activeImg}
                                        alt="Product"
                                        className="max-h-96  rounded object-cover hover:scale-105 duration-500 transition-transform"
                                    />
                                </div>
                                <button type="button" className="absolute top-4 right-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20px"
                                        fill="#ccc"
                                        className="mr-1 hover:fill-[#333]"
                                        viewBox="0 0 64 64"
                                    >
                                        <path
                                            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                                            data-original="#000000"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                                <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                    <img
                                        src={images.img1}
                                        alt="Product2"
                                        className="w-24 cursor-pointer"
                                        onClick={() => setActiveImg(images.img1)}
                                    />
                                </div>
                                <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                    <img
                                        src={images.img2}
                                        alt="Product2"
                                        className="w-24 cursor-pointer"
                                        onClick={() => setActiveImg(images.img2)}
                                    />
                                </div>
                                <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                    <img
                                        src={images.img3}
                                        alt="Product2"
                                        className="w-24 cursor-pointer"
                                        onClick={() => setActiveImg(images.img3)}
                                    />
                                </div>
                                <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                    <img
                                        src={images.img4}
                                        alt="Product2"
                                        className="w-24 cursor-pointer"
                                        onClick={() => setActiveImg(images.img4)}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="lg:col-span-2 text-center lg:text-left space-y-3">
                            <span className='text-violet-600 font-semibold'>{brand_name} / {category}</span>
                            <h1 className='text-xl md:text-3xl font-bold text-blue-500'>{name}</h1>
                            <div className='flex gap-2 justify-center lg:justify-start items-center'>
                                <Ratings rating={rating}></Ratings>
                                <p className='text-xs text-gray-400 cursor-pointer' onClick={() => showReview(_id)}>({ratingNumber} Customer Reviews)</p>
                            </div>
                            {
                                product_number > 0 ? <p className='text-xs text-green-900 font-semibold'>In stock</p> : <p className='text-xs font-semibold text-red-900'>Out of stock</p>
                            }
                            <p className='text-gray-700'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam placeat, numquam impedit eaque officia minus consequatur aliquid facere temporibus porro magni quia pariatur nisi minima! Adipisci qui delectus cumque accusantium!</p>
                            <p>Price: <span className='font-bold text-amber-950 flex items-center'><TbCurrencyTaka size={20}></TbCurrencyTaka>{discountPrice}</span> </p>

                            <div>
                                <button className='btn btn-xs' onClick={() => handleDecrease(_id)}>-</button>
                                <input type='number' value={value}
                                    onChange={() => setValue(value)}
                                    className='w-10 mx-2 text-center rounded-full overflow-hidden'></input>
                                <button className='btn btn-xs' onClick={handleIncrease}>+</button>
                            </div>
                            <div>
                                <button className='btn btn-outline bg-yellow-500' onClick={() => handleAddToCart(_id)}>Add To Cart</button>
                            </div>

                            <div className='flex justify-center lg:justify-start gap-2'>
                                <input onChange={handleCouponChange}
                                    className='px-4 py-3 text-gray-800 max-w-44 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='cupon'
                                    id='product_number'
                                    type='text'
                                    placeholder='Coupon'
                                    required
                                />
                                <button onClick={handleApplyCoupon} className='btn btn-outline bg-yellow-500'>Apply</button>
                            </div>
                        </div>
                    </div>


                    <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                        <h3 className="text-lg font-bold text-[#333]">Product information</h3>
                        <ul className="mt-6 space-y-6 text-[#333]">
                            <li className="text-sm">
                                TYPE <span className="ml-4 float-right">LAPTOP</span>
                            </li>
                            <li className="text-sm">
                                RAM <span className="ml-4 float-right">16 BG</span>
                            </li>
                            <li className="text-sm">
                                SSD <span className="ml-4 float-right">1000 BG</span>
                            </li>
                            <li className="text-sm">
                                PROCESSOR TYPE{" "}
                                <span className="ml-4 float-right">INTEL CORE I7-12700H</span>
                            </li>
                            <li className="text-sm">
                                PROCESSOR SPEED{" "}
                                <span className="ml-4 float-right">2.3 - 4.7 GHz</span>
                            </li>
                            <li className="text-sm">
                                DISPLAY SIZE INCH <span className="ml-4 float-right">16.0</span>
                            </li>
                            <li className="text-sm">
                                DISPLAY SIZE SM <span className="ml-4 float-right">40.64 cm</span>
                            </li>
                            <li className="text-sm">
                                DISPLAY TYPE{" "}
                                <span className="ml-4 float-right">OLED, TOUCHSCREEN, 120 Hz</span>
                            </li>
                            <li className="text-sm">
                                DISPLAY RESOLUTION <span className="ml-4 float-right">2880x1620</span>
                            </li>
                        </ul>
                    </div>


                    <div className="mt-16 flex flex-col gap-10 md:flex-row md:justify-between   shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                        <div>
                            <h3 className="text-lg font-bold text-[#333]">Reviews ({reviews.length})</h3>
                            <div className='flex flex-col gap-5 mt-6'>
                                <div className='flex gap-4 items-center'>
                                    <p className='flex text-sm gap-1'>5<FaStar /></p>
                                    <progress className="progress progress-warning w-56" value={val5} max="100"></progress>
                                    <p className='text-xs font-extralight'>{val5.toFixed(2)}%</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <p className='flex text-sm gap-1'>4<FaStar /></p>
                                    <progress className="progress progress-warning w-56" value={val4} max="100"></progress>
                                    <p className='text-xs font-extralight'>{val4.toFixed(2)}%</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <p className='flex text-sm gap-1'>3<FaStar /></p>
                                    <progress className="progress progress-warning w-56" value={val3} max="100"></progress>
                                    <p className='text-xs font-extralight'>{val3.toFixed(2)}%</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <p className='flex text-sm gap-1'>2<FaStar /></p>
                                    <progress className="progress progress-warning w-56" value={val2} max="100"></progress>
                                    <p className='text-xs font-extralight'>{val2.toFixed(2)}%</p>
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <p className='flex text-sm gap-1'>1<FaStar /></p>
                                    <progress className="progress progress-warning w-56" value={val1} max="100"></progress>
                                    <p className='text-xs font-extralight'>{val1.toFixed(2)}%</p>
                                </div>

                            </div>
                        </div>

                       {
                        reviews.length>0 &&
                        <div className=' space-y-3'>
                        <div className='flex items-center gap-4 '>
                            <div className="avatar online">
                                <div className="w-10 rounded-full">
                                    <img src={reviews[0]?.image ? reviews[0]?.image : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                </div>
                            </div>
                            <h2 className='text-sm font-light'>{reviews[0]?.name}</h2>
                        </div>

                        <p>
                            {
                                (() => {
                                    const date = new Date(reviews[0]?.date)
                                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                                    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
                                    return (
                                        <div className='flex gap-1 text-xs font-extralight'>
                                            <p className='text-gray-900 whitespace-no-wrap'>{formattedDate}</p>
                                            <p className='text-gray-900 whitespace-no-wrap'>{formattedTime}</p>
                                        </div>
                                    )
                                })()
                            }
                        </p>

                        <Ratings rating={reviews[0]?.rating}></Ratings>
                        <p>{reviews[0]?.review}</p>
                        <button className='btn btn-outline bg-yellow-500' onClick={()=>showReview(_id)}>Show All Reviews</button>
                    </div>
                        
                       }




                    </div>
                </div>


            </div>


            <SimilarProducts category={category} id={_id}></SimilarProducts>
            <ProductReviewModal isOpen={isOpen} closeModal={closeModal} reviews={reviews} name={name}></ProductReviewModal>
        </>


    );
};

export default ProductDetails;