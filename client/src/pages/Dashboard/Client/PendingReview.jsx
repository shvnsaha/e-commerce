import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import usePendingReview from '../../../hooks/usePendingReview';
import PendingReviewRow from '../../../components/Dashboard/PendingReviewRow/PendingReviewRow';
import ReviewModal from '../../../components/Modal/ReviewModal';
import toast from 'react-hot-toast';
import { addClientReview, deletePendingReview } from '../../../api/review';
import { getProduct, updateProduct } from '../../../api/products';
import useAuth from '../../../hooks/useAuth';

const PendingReview = () => {
    const [pendingReviews, refetch, isLoading] = usePendingReview();
    console.log(pendingReviews);
    const {user} = useAuth();

    let [isOpen, setIsOpen] = useState(false)
    const [rating, setRating] = useState(0);
    const [item,setItem] = useState({});
    const [product,setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    console.log(item);

    const addReview = item => {
        // const {_id,productId}= item;
        setIsOpen(true)
        setItem(item);
        getProduct(item?.productId)
        .then(data=>{
           setProduct(data)
        })
    }
   

    function closeModal() {
        setIsOpen(false)
        setRating(0);
        setItem({});
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        const form = e.target;
        const review = form.review.value;

        const reviewData = {
            productId: item.productId,
            name:user.displayName,
            productName: item.itemName,
            email:item?.email,
            image:user.photoURL,
            review: review,
            rating: rating,
            date: Date.now()
        }

        console.log(reviewData)

        try{
            setLoading(true)
            const data = await addClientReview(reviewData)
            .then(async data=>{
                if(data.insertedId){

                    const preRatingNumber = parseInt(product?.ratingNumber); 
                    const preRating = parseFloat(product?.rating);
                    const preCal = preRatingNumber * preRating;
                    const newRatingNumber = preRatingNumber + 1;
                    const newRating = parseFloat(((preCal + rating)/newRatingNumber).toFixed(1))
         
                 //    const newRating = parseFloat(((product?.rating + rating)/ratingNumber).toFixed(1));
                    console.log(newRating,newRatingNumber);
                    const newRatingData = {
                     rating: newRating,
                     ratingNumber: newRatingNumber
                    }
         
                    const data = await updateProduct(newRatingData,product?._id)
                    console.log(data);
         

                    toast.success('Review added');
                    deletePendingReview(item?._id)
                    .then(data=>{
                        if(data.deletedCount > 0){
                            refetch();
                            closeModal();
                        }
                        
                    })

                }

            })
          
           }catch(err){
             console.log(err);
             toast.error(err.message);
           }finally{
            setLoading(false);
           }
          
        //    const preRatingNumber = parseInt(product?.ratingNumber); 
        //    const preRating = parseFloat(product?.rating);
        //    const preCal = preRatingNumber * preRating;
        //    const newRatingNumber = preRatingNumber + 1;
        //    const newRating = parseFloat(((preCal + rating)/newRatingNumber).toFixed(1))

        // //    const newRating = parseFloat(((product?.rating + rating)/ratingNumber).toFixed(1));
        //    console.log(newRating,newRatingNumber);
        //    const newRatingData = {
        //     rating: newRating,
        //     ratingNumber: newRatingNumber
        //    }

        //    const data = await updateProduct(newRatingData,product?._id)
        //    console.log(data);

        
    }

   

    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <Helmet>
                <title>E-Shop | Pending Reviews</title>
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
                                        Product ID
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                    >
                                        Add Review
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{/* Room row data */}

                                {
                                    // product.map((item, index) => <ProductDataRow key={item._id} item={item} index={index}></ProductDataRow>)
                                    // booking.map((item, index) => <ClientBookingRow key={item._id} item={item} index={index}></ClientBookingRow>)
                                    // booking.map((item, index) => <AllBookingRow key={item._id} item={item} index={index} handleStatus={handleStatus}></AllBookingRow>)

                                    pendingReviews.map((item, index) => <PendingReviewRow key={item._id} item={item} index={index} addReview={addReview} ></PendingReviewRow>)



                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ReviewModal closeModal={closeModal}
                isOpen={isOpen} setRating={setRating} rating={rating} item={item} handleSubmit={handleSubmit} loading={loading}>
            </ReviewModal>
        </div>
    );
};

export default PendingReview;