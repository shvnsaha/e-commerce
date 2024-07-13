import React from 'react';
import MenuItem from './MenuItem';
import { CiShoppingCart } from "react-icons/ci";
import usePendingReview from '../../hooks/usePendingReview';
import { FaRegBookmark } from "react-icons/fa6";
import { RiRefundLine } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";

const ClientMenu = () => {

   const [pendingReviews,refetch,isLoading] = usePendingReview();
    return (
        <>
          <MenuItem
                icon={CiShoppingCart}
                label='Cart'
                address='/dashboard/cart'
            />
             <MenuItem
                icon={FaRegBookmark}
                label='Ordered Product'
                address='/dashboard/bookings'
            />
             <MenuItem
                icon={RiRefundLine}
                label='Refund Product'
                address='/dashboard/refunds'
            />
             <MenuItem
                icon={MdOutlineRateReview}
                label='Pending Review'
                address='/dashboard/pending-review'
               count = {pendingReviews.length} 
            />
             <MenuItem
                icon={VscPreview}
                label='My Reviews'
                address='/dashboard/my-review'
            />
            
        </>
    );
};

export default ClientMenu;