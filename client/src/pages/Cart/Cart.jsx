
import React from 'react';
import useCart from '../../hooks/useCart';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Cart = () => {

  const [cart,refetch] = useCart();
  const {user} =useAuth();

  const calculatePrice = item =>{
    return item?.price * item?.quantity;
  }

  const handleDecrease = (item) =>{
   if(item?.quantity>1)
   {
    axios.put(`http://localhost:5000/carts/${item._id}`,{quantity: item?.quantity-1})
    .then(res => {
        if (res.data.modifiedCount > 0) {
            refetch();
        }
    })
    .then(err=>console.log(err));
   }
  }

  const handleIncrease = (item) =>{
    axios.put(`http://localhost:5000/carts/${item._id}`,{quantity: item?.quantity+1})
    .then(res => {
        if (res.data.modifiedCount > 0) {
            refetch();
        }
    })
    .then(err=>console.log(err));
     
  }

  const cartSubTotal = cart.reduce((total,item)=>{
     return total+calculatePrice(item);
  },0)

  const orderTotal = cartSubTotal;

  const handleDelete = (item) =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/carts/${item._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())

                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your Cart Item Deleted',
                            'success'
                        )
                        
                    }

                })
        }
      });
  }


    return (
        <div>
            <Helmet>
            <title>E-Shop | Cart</title>
            </Helmet>
            <h2 className='text-center font-bold'>Products In Your Cart</h2>

            {/* cart table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-green text-white rounded-md'>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           cart.map((item,index)=>(
                            <tr key={index}>
                            <td>{index+1}</td>
                             <td>
                                 <div className="flex items-center gap-3">
                                     <div className="avatar">
                                         <div className="mask mask-squircle w-12 h-12">
                                             <img src={item.image} />
                                         </div>
                                     </div>
                                 </div>
                             </td>
                             <td>
                                {item.name}
                             </td>
                             <td>
                                <button className='btn btn-xs' onClick={()=>handleDecrease(item)}>-</button>
                                <input type='number' value={item?.quantity} 
                                onChange={()=>console.log(item?.quantity)}
                                className='w-10 mx-2 text-center overflow-hidden'></input>
                                <button className='btn btn-xs' onClick={()=>handleIncrease(item)}>+</button>

                             </td>
                             <td>${calculatePrice(item)}</td>
                             <th>
                                 <button className="btn btn-ghost btn-xs" onClick={()=>handleDelete(item)}>
                                    <FaTrash></FaTrash>
                                 </button>
                             </th>
                         </tr>
                           ))
                        }
                    </tbody>
                </table>
            </div>

            <div className='my-12 flex flex-col md:flex-row justify-between items-start'>
                <div className='md:w-1/2 space-y-3'>
                   <h3 className='font-medium'>Customer Details</h3>
                   <p>Name: ${user?.displayName}</p>
                   <p>Email: ${user?.email}</p>
                   <p>User_ID: ${user?.uid}</p>
                </div>
                <div className='md:w-1/2 space-y-3'>
                <h3 className='font-medium'>Shopping Details</h3>
                   <p>Total Items: ${cart.length}</p>
                   <p>Total Price: ${orderTotal.toFixed(2)}</p>
                   <button className='btn bg-green text-white'>Proceed Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;