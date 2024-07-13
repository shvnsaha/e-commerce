import axiosSecure from ".";


export const getAllDiscount = async () =>{
    const {data} = await axiosSecure('/discount')
    return data
}

export const addDiscount = async (discountData) =>{
const {data} = await axiosSecure.post('/discounts',discountData)
    return data; 
 }

 export const deleteDiscount = async (id) =>{
    const {data} = await axiosSecure.delete(`/discounts/${id}`)
    console.log(data);
    return data;
 }

 export const updateDiscount = async (discountData,id) =>{
    const {data} = await axiosSecure.put(`/discount/${id}`,discountData)
    return data;
 }