import React from 'react';
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import useProduct from '../../../hooks/useProduct';
import { deleteProduct } from '../../../api/products';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';



const ProductDataRow = ({ item, index, refetch }) => {

    // const [product, refetch, isLoading] = useProduct();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your Service Deleted',
                                'success'
                            )

                        }

                    })
            }
        });
    }


    return (
        <tr className='text-center'>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex justify-center items-center'>
                    <div className="avatar">
                        <div className="w-12 rounded-xl">
                            <img src={item?.image} />
                        </div>
                    </div>

                </div>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.product_number}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.totalsold}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button onClick={() => handleDelete(item?._id)} className='relative text-red cursor-pointer'><MdDeleteOutline></MdDeleteOutline></button>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>

                <Link to={`/dashboard/update-product/${item?._id}`}>

                    <button className='relative text-green font-bold cursor-pointer'><GrUpdate></GrUpdate></button>
                </Link>
            </td>
        </tr>
    );
};

export default ProductDataRow;