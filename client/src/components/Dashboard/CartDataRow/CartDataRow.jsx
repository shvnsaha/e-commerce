import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import useCart from '../../../hooks/useCart';
import { cartQuantity, deleteCart, } from '../../../api/carts';
import Swal from 'sweetalert2';
import Loader from '../../Loader/Loader';

const CartDataRow = ({ item, index }) => {

    const [cart, refetch, isLoading] = useCart();


    // decrease
    const handleDecrease = (item) => {
        if (item?.quantity > 1) {


            cartQuantity({ quantity: item?.quantity - 1 }, item._id)
                .then(data => {
                    if (data.modifiedCount > 0) {
                        refetch();
                    }
                })
                .then(err => console.log(err));
        }
    }

    // increase
    const handleIncrease = (item) => {
        cartQuantity({ quantity: item?.quantity + 1 }, item._id)
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                }
            })
            .then(err => console.log(err));
    }

    const calculatePrice = item => {
        return (item?.discountPrice * item?.quantity).toFixed(2);
    }

    const cartSubTotal = cart.reduce((total, item) => {
        return total + calculatePrice(item);
    }, 0)

    const orderTotal = cartSubTotal;


    //  delete
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
                deleteCart(id)
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


    if (isLoading) return <Loader></Loader>
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{index + 1}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <img
                                alt='profile'
                                src={item?.image}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                    </div>

                </div>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{item?.name}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button className='btn btn-xs' onClick={() => handleDecrease(item)}>-</button>
                <input type='number' value={item?.quantity}
                    onChange={() => console.log(item?.quantity)}
                    className='w-10 mx-2 text-center overflow-hidden'></input>
                <button className='btn btn-xs' onClick={() => handleIncrease(item)}>+</button>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${calculatePrice(item)}</p>
            </td>

            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button onClick={() => handleDelete(item?._id)} className='relative text-red cursor-pointer'><MdDeleteOutline></MdDeleteOutline></button>
            </td>

            <div className='my-12 flex flex-col md:flex-row justify-end items-start'>
                {/* <div className='md:w-1/2 space-y-3'>
                    <h3 className='font-medium'>Customer Details</h3>
                    <p>Name: ${user?.displayName}</p>
                    <p>Email: ${user?.email}</p>
                    <p>User_ID: ${user?.uid}</p>
                </div> */}
                <div className='md:w-1/2 space-y-3'>
                    <h3 className='font-medium'>Shopping Details</h3>
                    <p>Total Items: {cart.length}</p>
                    <p>Total Price: ${cartSubTotal}</p>
                    <button className='btn bg-violet-600 text-white hover:text-black'>Proceed Checkout</button>
                </div>
            </div>

        </tr>
    );
};

export default CartDataRow;