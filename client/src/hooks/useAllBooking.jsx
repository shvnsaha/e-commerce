import React from 'react';
import { getAllBookings } from '../api/bookings';
import { useQuery } from '@tanstack/react-query';

const useAllBooking = (props) => {
   
    // console.log(props.page,props.limit)
    const { refetch, data: booking = [],isLoading} = useQuery({
        queryKey : ['booking'],
        queryFn: async () => {
            return await getAllBookings()
          },
    })
    return [booking,refetch,isLoading];
};

export default useAllBooking;