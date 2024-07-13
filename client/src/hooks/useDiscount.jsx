import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllDiscount } from '../api/discounts';

const useDiscount = () => {
 
        const {refetch ,data: discountCupon = [],Loading } =useQuery({
            queryKey : ['discount'],
            queryFn : async () =>{
                return await getAllDiscount();
            }
        })
    
        return [discountCupon,refetch,Loading];
   
};

export default useDiscount;