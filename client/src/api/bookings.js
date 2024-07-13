import axiosSecure from "."

export const createPaymentIntent = async price => {
    const { data } = await axiosSecure.post('/create-payment-intent', price)
    return data
  }

export const orderProduct = async (paymentInfo) =>{
  const {data} = await axiosSecure.post('/order',paymentInfo)
  return data
}
  // save booking info in db
export const saveBookingInfo = async paymentInfo => {
    const { data } = await axiosSecure.post('/bookings', paymentInfo)
    return data
  }

  export const getAllBookings = async ()  => {
    const { data } = await axiosSecure(`/bookings?page=1&limit=1`)
    return data
  }

  // get all bookings for a client by email
export const getBookings = async email => {
  const { data } = await axiosSecure(`/bookings?email=${email}`)
  return data
}

// update status
export const updateStatus = async (id,newStatus) =>{
  console.log(newStatus);
  const {data} = await axiosSecure.put(`/booking/${id}`,newStatus)
  return data;
}

export const bookindRefundStatus= async (id,newStatus) =>{
  console.log(newStatus);
  const {data} = await axiosSecure.put(`/bookings/${id}`,newStatus)
  return data;
}

// add new refund request
export const addRefund = async (refundData) =>{
  const {data} = await axiosSecure.post('/refund',refundData)
  return data
}

// change refund status
export const refundStatus = async (id,newStatus) =>{
  const {data} = await axiosSecure.put(`/refunds/${id}`,newStatus)
  return data
}

export const refundPayment = async (refundInfo) =>{
  const {data} = await axiosSecure.post('/refundpayment',refundInfo)
  return data
}

export const deleteRefund = async (refundInfo) =>{
  const {data} = await axiosSecure.post('/refunds',refundInfo)
  return data;
}

