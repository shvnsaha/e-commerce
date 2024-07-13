import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Header/Navbar/Navbar';
import Message from '../components/Message/Message';
import Footer from '../components/Footer/Footer';
import BigLoader from '../components/Loader/BigLoader';

const MainLayout = () => {

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])
    return (
        // <div className='space-y-20 max-w-screen-xl container mx-auto'>
        <>


            {loading ? <BigLoader></BigLoader> :
                <div className='max-w-[2520px]  mx-auto   px-2'>
                    <Message></Message>
                    <div className='mb-16'>
                        <Navbar></Navbar>
                    </div>

                    < div className='min-h-[calc(100vh-68px)]'>
                        <Outlet></Outlet>
                    </div>



                    <Footer></Footer>

                </div >
            }

        </>




    );
};

export default MainLayout;