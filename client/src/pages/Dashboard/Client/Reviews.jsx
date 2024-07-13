import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useReview from '../../../hooks/useReview';
import ReviewRow from '../../../components/Dashboard/ReviewRow/ReviewRow';
import Swal from 'sweetalert2';
import { deleteReview, updateReview } from '../../../api/review';
import { getProduct, updateProduct } from '../../../api/products';
import UpdateReviewModal from '../../../components/Modal/UpdateReviewModal';
import toast from 'react-hot-toast';

const Reviews = () => {
    const [reviews, refetch, isLoading] = useReview();
    let [isOpen, setIsOpen] = useState(false)
    const [item, setItem] = useState({});
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useState(0)
    const [preRating, setPreRating] = useState(0)

    const handleDelete = async (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteReview(item?._id)
                    .then(data => {
                        if (data.deletedCount > 0) {
                            getProduct(item?.productId)
                                .then(data => {
                                    const preRatingNumber = parseInt(data?.ratingNumber);
                                    const preRating = parseFloat(data?.rating);
                                    const preCal = preRatingNumber * preRating;
                                    const newRatingNumber = preRatingNumber - 1;
                                    const newRating = parseFloat(((preCal - item?.rating) / newRatingNumber).toFixed(1))

                                    //    const newRating = parseFloat(((product?.rating + rating)/ratingNumber).toFixed(1));
                                    console.log(newRating, newRatingNumber);
                                    const newRatingData = {
                                        rating: newRating,
                                        ratingNumber: newRatingNumber
                                    }

                                    updateProduct(newRatingData, item?.productId)



                                })

                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your Review Deleted',
                                'success'
                            )

                        }

                    })
            }
        });
    }

    const handleUpdate = async (item) => {
        setIsOpen(true)
        setItem(item);
        setRating(item?.rating)
        setPreRating(item?.rating)
        getProduct(item?.productId)
            .then(data => {
                setProduct(data)

            })
    }

    function closeModal() {
        setIsOpen(false)
        setRating(0);
        setItem({});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.target;
        const review = form.review.value;
        const reviewData = {
            review: review,
            rating: rating,
            date: Date.now()
        }

        try {
            setLoading(true)
            const data = await updateReview(reviewData,item?._id)
                .then(data => {
                    if (data.modifiedCount > 0) {

                        const preRatingNumber = parseInt(product?.ratingNumber);
                        const preRating = parseFloat(product?.rating);
                        const preCal = preRatingNumber * preRating;
                        const newRatingNumber = preRatingNumber;
                        const newRating = parseFloat(((preCal - item?.rating + rating) / newRatingNumber).toFixed(1))
                        console.log(newRating, newRatingNumber);
                        const newRatingData = {
                            rating: newRating,
                            ratingNumber: newRatingNumber
                        }

                        updateProduct(newRatingData, item?.productId)

                        refetch();
                        toast.success('review updated')
                        closeModal();
                     


                    }

                })

        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }


        console.log(rating);
        const ratingNumber = parseInt(product?.ratingNumber)
        const newRating = parseFloat(((product?.rating - preRating + rating) / ratingNumber));
        console.log(newRating, ratingNumber, product?.rating, preRating);

    }




    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <Helmet>
                <title>E-Shop | My Reviews</title>
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
                                        Product Name
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                    >
                                        Rating
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                    >
                                        Review
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                    >
                                        Date
                                    </th>
                                    <th colSpan={2}
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{/* Room row data */}

                                {
                    

                                    reviews.map((item, index) => <ReviewRow key={item?._id} item={item} index={index} handleDelete={handleDelete}
                                        handleUpdate={handleUpdate} 
                                    ></ReviewRow>)


                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

          

            {
                <UpdateReviewModal
                    closeModal={closeModal}
                    isOpen={isOpen} setRating={setRating} rating={rating} item={item} handleSubmit={handleSubmit} loading={loading}
                ></UpdateReviewModal>
            }
        </div>
    );
};

export default Reviews;