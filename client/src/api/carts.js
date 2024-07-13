import axiosSecure from ".";

export const getCart = async (email) => {
  const { data } = await axiosSecure(`/carts?email=${email}`);
  return data;
};

export const cartQuantity = async (quantity, id) => {
  const { data } = await axiosSecure.put(`/carts/${id}`, quantity);
  return data;
};

export const cartPrice = async (cartprice, id) => {
  const { data } = await axiosSecure.put(`/cartprice/${id}`, cartprice);
  return data;
};

// export const increaseCartQuantity = async (quantity,id) =>{
//   const {data} = await axiosSecure.put(`/carts/${id}`,quantity)
//   return data
// }

export const deleteCart = async (id) => {
  const { data } = await axiosSecure.delete(`/carts/${id}`);
  return data;
};

export const addCart = async (cartItem, id) => {
  const { data } = await axiosSecure.put(`/cart/${id}`, cartItem);
  return data;
};

export const newaddCart = async (cartItem) => {
  const { data } = await axiosSecure.post("/carts", cartItem);
  return data;
};
