import React from 'react';
import MenuItem from './MenuItem';
import { FaUsers, FaShoppingBag, FaPlusCircle, FaEdit } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { MdAddToPhotos } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5"
import { RiRefundLine } from "react-icons/ri";
import { GrContact } from 'react-icons/gr';
import useAllBooking from '../../hooks/useAllBooking';
import { MdCalendarMonth } from "react-icons/md";



const AdminMenu = () => {

  const [booking,refetch,isLoading] = useAllBooking({page:1,limit:1});
  console.log(booking?.totalpending);
    return (
        <>
            <MenuItem
                icon={MdOutlineSpaceDashboard}
                label='Dashboard'
                address='/dashboard'
            />
            <MenuItem
                icon={FaUsers}
                label='Users'
                address='/dashboard/users'
            />
             <MenuItem
                icon={FaShoppingBag}
                label='Manage Orders'
                address='/dashboard/manage-bookings'
                count = {booking?.totalpending} 
            />
            
            <MenuItem
                icon={RiRefundLine}
                label='Manage Refunds'
                address='/dashboard/manage-refunds'
            />
             <MenuItem
                icon={IoAddCircleSharp}
                label='Add Category'
                address='/dashboard/add-category'
            />
           
            <MenuItem
                icon={FaPlusCircle}
                label='Add Product'
                address='/dashboard/add-product'
            />
            <MenuItem
                icon={FaEdit}
                label='Manage Product'
                address='/dashboard/manage-product'
            />
            <MenuItem
                icon={MdAddToPhotos}
                label='Add Discount'
                address='/dashboard/add-discount'
            />
            <MenuItem
                icon={FaEdit }
                label='Manage Discounts'
                address='/dashboard/manage-discount'
            />
            
            <MenuItem
                icon={GrContact}
                label='Messages'
                address='/dashboard/contacts-message'
            />
            {/* <MenuItem
                icon={MdCalendarMonth}
                label='Monthly Stat'
                address='/dashboard/monthly-stat'
            /> */}
        </>
    );
};

export default AdminMenu;