import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/carts';

const useCart = () => {
   
    const {user} = useAuth();
    const { refetch, data: cart = [],isLoading} = useQuery({
        queryKey : ['carts',user?.email],
        queryFn: async () => {
            // const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`)
            // return response.json();
            return await getCart(user?.email)
          },
    })
    return [cart,refetch,isLoading];
       
    
};

export default useCart;