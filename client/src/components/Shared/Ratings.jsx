import React from 'react'
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { AiOutlineStar } from "react-icons/ai";

const Ratings = ({ rating }) => {
    const ratingStar = Array.from({ length: 5 }, (item, index) => {
        let number = index + 0.5;
        return <span key={index}>
            {
                rating >= index + 1
                    ? <FaStar color='orange'></FaStar>
                    : rating >= number
                        ? <FaStarHalf  color='orange'></FaStarHalf>
                        : <AiOutlineStar></AiOutlineStar>
            }
        </span>
    })

    return (
        <div className='flex gap-1'>
            {ratingStar}
        </div>
    )
}

export default Ratings
