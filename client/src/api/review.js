import axiosSecure from ".";

export const addPendingReview = async (pendingReview) =>{
    const {data} = await axiosSecure.post('/pending-review',pendingReview);
    return data; 
 }

 export const getPendingReview = async (email) =>{
    const {data} = await axiosSecure(`/pending-review?email=${email}`);
    return data; 
 }

 export const deletePendingReview = async (id) =>{
    const {data} = await axiosSecure.delete(`/pending-review/${id}`)
    console.log(data);
    return data;
 }

//  product review
export const getProductReview = async(productId) =>{
  const {data} = await axiosSecure.get(`/product-reviews/${productId}`)
  return data;
}


//  
 export const addClientReview = async(reviewData) =>{
    const {data} = await axiosSecure.post('/add-review',reviewData);
    return data; 
 }

 export const getClientReview = async (email) =>{
   const {data} = await axiosSecure(`/reviews?email=${email}`);
   return data; 
}

export const deleteReview = async (id) =>{
   const {data} = await axiosSecure.delete(`/review/${id}`)
   console.log(data);
   return data;
}

export const updateReview = async (reviewData,id) =>{
   const {data} = await axiosSecure.put(`/review/${id}`,reviewData)
   return data;
}

export const updateUserReview = async (email,reviewData) =>{
  
   const {data} = await axiosSecure.put(`/reviews?email=${email}`,reviewData)
   return data;
}

