import { useState } from 'react'
// Components
// import Logo from '../../Shared/Logo'
import logo2 from '/logo2.png'
import MenuItem from './MenuItem'
// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { MdOutlineSpaceDashboard } from "react-icons/md";

import useAuth from '../../hooks/useAuth'
import useRole from '../../hooks/useRole'
import AdminMenu from './AdminMenu'
import ClientMenu from './ClientMenu'



const Sidebar = () => {
    const [isActive, setActive] = useState(false)
    const [role] = useRole();

   
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }

    // logout
    const {logOut} = useAuth();
    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to={'/'} className=''>
                            <img src={logo2} className='h-14' />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>
            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
                            <Link to={'/'} className='hidden md:block'>
                                <img src={logo2} className='h-14' />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        {/* If a user is host */}

                        <nav>
                          
                           
                               
                            {/* Menu Items */}
                            {role === 'admin' && <AdminMenu></AdminMenu>}
                            {role === 'client' && <ClientMenu></ClientMenu>}


                        </nav>
                    </div>
                </div>

                <div>
                    <hr />

                    <MenuItem
                        icon={FcSettings}
                        label='Profile'
                        address='/dashboard/profile'
                    />
                    <button onClick={logOut} className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'>
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Sidebar