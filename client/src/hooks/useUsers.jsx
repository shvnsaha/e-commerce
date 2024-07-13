import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllUser } from '../api/Auth';

const useUsers = () => {
    const {refetch ,data: users = [],isLoading } =useQuery({
        queryKey : ['users'],
        queryFn : async () =>{
            return await getAllUser();
        }
    })

   

    return [users,refetch,isLoading];
};

export default useUsers;