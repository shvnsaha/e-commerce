import React, { useState } from "react";
import useCart from "../../../hooks/useCart";
import CartDataRow from "../../../components/Dashboard/CartDataRow/CartDataRow";
import useAuth from "../../../hooks/useAuth";
import { cartPrice, cartQuantity, deleteCart } from "../../../api/carts";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { getProduct } from "../../../api/products";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { TbCurrencyTaka } from "react-icons/tb";


const Carts = () => {
  const [cart, refetch, isLoading] = useCart();
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  cart.forEach((item) => {
    const cartprice = {
      discountId: item?.cupon,
      price: item?.price,
    };
    if (item?.cupon) cartPrice(cartprice, item?._id);
  });

  // decrease
  const handleDecrease = (item) => {
    if (item?.quantity > 1) {
      cartQuantity({ quantity: item?.quantity - 1 }, item._id)
        .then((data) => {
          if (data.modifiedCount > 0) {
            refetch();
          }
        })
        .then((err) => console.log(err));
    }
  };

  // increase
  const handleIncrease = async (item) => {
    const data = await getProduct(item?.productId);
    console.log(data?.product_number);
    if (item?.quantity < data?.product_number) {
      cartQuantity({ quantity: item?.quantity + 1 }, item._id)
        .then((data) => {
          if (data.modifiedCount > 0) {
            refetch();
          }
        })
        .then((err) => console.log(err));
    } else {
      toast.error("Product Not Available");
    }
  };

  const calculatePrice = (item) => {
    return (item?.discountPrice * item?.quantity).toFixed(2);
  };

  const cartSubTotal = cart.reduce((total, item) => {
    return total + parseFloat(calculatePrice(item));
  }, 0);

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
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteCart(id).then((data) => {
          if (data.deletedCount > 0) {
            refetch();
            toast.success("Product deleted from cart");
          }
        });
      }
    });
  };

  if (count < cart.length) {
    cart.forEach(async (item) => {
      const data = await getProduct(item?.productId);
      if (item?.quantity <= data?.product_number) setCount(count + 1);
    });
  }

  if (isLoading) return <Loader></Loader>;

  return (
    <>
      <Helmet>
        <title>E-Shop | Cart</title>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal ">
                <thead>
                  <tr className="text-center">
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-sm uppercase font-normal"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Room row data */}

                  {
                    // cart.map((item, index) => <CartDataRow key={item._id} item={item} index={index}></CartDataRow>)
                    cart.map((item, index) => (
                      <tr key={item._id} className="text-center">
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {index + 1}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex justify-center items-center">
                            <div className="flex-shrink-0">
                              <div className="block relative">
                                <img
                                  alt="profile"
                                  src={item?.image}
                                  className="mx-auto object-cover rounded h-10 w-15 "
                                />
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            className="btn btn-xs"
                            onClick={() => handleDecrease(item)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item?.quantity}
                            onChange={() => console.log(item?.quantity)}
                            className="w-10 mx-2 text-center overflow-hidden"
                          ></input>
                          <button
                            className="btn btn-xs"
                            onClick={() => handleIncrease(item)}
                          >
                            +
                          </button>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            <div className="flex justify-center items-center">
                              <TbCurrencyTaka></TbCurrencyTaka>{calculatePrice(item)}  
                            </div>
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            onClick={() => handleDelete(item?._id)}
                            className="relative text-red cursor-pointer"
                          >
                            <MdDeleteOutline></MdDeleteOutline>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="my-12 flex flex-col md:flex-row justify-end items-start">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Customer Details</h3>
              <p>Name: {user?.displayName}</p>
              <p>Email: {user?.email}</p>
              <p>User_ID: {user?.uid}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p className="flex items-center">Total Price: <TbCurrencyTaka size={20} />{cartSubTotal}</p>
              {/* <button className='btn bg-violet-600 text-white hover:text-black' onClick={()=>setIsOpen(true)}>Proceed Checkout</button> */}
              {count  >= cart.length ? (
                <Link
                  to={"/checkout"}
                  className="btn bg-violet-600 text-white hover:text-black"
                >
                  Proceed Checkout
                </Link>
              ) : (
                <button className="btn bg-violet-600 text-white hover:text-black">
                  Product Not Available
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carts;
