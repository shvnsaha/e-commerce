import React, { useState } from 'react';
import useUser from '../../hooks/useUser';
import useAuth from '../../hooks/useAuth';
import { updateMessage } from '../../api/Auth';
import useDiscount from '../../hooks/useDiscount';


const Message = () => {

    // const [value,setValue] = useState(0)

    const [userData, refetch, isLoading] = useUser();
    const [discountCupon] = useDiscount();

    const { user } = useAuth();
    console.log(userData?.phone);

    console.log(discountCupon);

    // const object = {
    //     email: userData?.email,
    //     status: 'sent',
    // }

    // console.log(object);


    const handleMessage = async () => {
        await updateMessage(userData?._id, { data: discountCupon, email: userData?.email, status: 'sent',})
            .then(data => {
                console.log(data.modifiedCount);
                if (data.modifiedCount > 0) {
                    refetch();
                }
            })
            .then(err => { })
    }

    // calculate distance 
    const targetLatitude = 24.236765  ; //24.228659  

    const targetLongitude =  89.890950;  

    const radiusInMeters = 1500; // 1 kilometer
    


    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const earthRadius = 6371000; // Earth's radius in meters
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;
        console.log(distance);
        return distance;
    }

    //    location

    const checkUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;
            console.log(userLatitude, userLongitude);
            const distance = calculateDistance(userLatitude, userLongitude, targetLatitude, targetLongitude);
            if (distance <= radiusInMeters && user) {
                console.log('inside');
               
               
                //  handleMessage();
                updateMessage(userData?._id, { data: discountCupon, email: userData?.email, status: 'sent',phone:userData?.phone })
                    .then(data => {
                        console.log(data.modifiedCount);
                        if (data.modifiedCount > 0) {
                            refetch();
                            return
                        }
                    })
                    .then(err => { })

                // axiosSecure.put(`/send/${userData?._id}`, { data: discountCupon,email: userData?.email, status: 'sent'}, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // })
                //     .then(response => {
                //         console.log('Response from server:', response.data);
                //     })
                //     .catch(error => {
                //         console.error('Error sending data:', error);
                //     });

                // return
            }
            else {
                if (userData?.message === 'sent')
                    return
                setInterval(checkUserLocation, 10000);

            }
        })


    }


     
        if (userData?.message === 'notsent' && userData?.role!=='admin' && userData?.phone  && !isLoading && discountCupon.length>0) {
            checkUserLocation()
      }
     
    return (
        <></>
    );
};

export default Message;