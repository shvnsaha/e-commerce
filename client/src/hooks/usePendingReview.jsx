import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getPendingReview } from '../api/review';
import useAuth from './useAuth';

const usePendingReview = () => {
    const {user} = useAuth();
    const {refetch ,data: pendingReviews = [],isLoading } =useQuery({
        queryKey : ['pending-review'],
        queryFn : async () =>{
            return await getPendingReview(user?.email);
        }
    })

    return [pendingReviews,refetch,isLoading];
};

export default usePendingReview;