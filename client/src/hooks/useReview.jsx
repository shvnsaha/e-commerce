import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import { getClientReview } from '../api/review';

const useReview = () => {
    const {user} = useAuth();
    const {refetch ,data: reviews = [],isLoading } =useQuery({
        queryKey : ['reviews'],
        queryFn : async () =>{
            return await getClientReview(user?.email);
        }
    })

    return [reviews,refetch,isLoading];
};

export default useReview;