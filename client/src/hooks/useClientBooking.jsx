import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../api/bookings';

const useClientBooking = () => {
    const {user} = useAuth();
    const { refetch, data: booking = [],isLoading} = useQuery({
        queryKey : ['bookings',user?.email],
        queryFn: async () => {
            return await getBookings(user?.email)
          },
    })
    return [booking,refetch,isLoading];
};

export default useClientBooking;