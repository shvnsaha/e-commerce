import axiosSecure from ".";

export const getAllProduct = async () =>{
    const {data} = await axiosSecure('/products')
    return data
}


// single product;
export const getProduct = async (id) =>{
    const {data} = await axiosSecure(`/product/${id}`)
    return data
}

export const addProduct = async (ProductData) =>{
    const {data} = await axiosSecure.post('/products',ProductData);
    return data; 
 }

 export const deleteProduct = async (id) =>{
    const {data} = await axiosSecure.delete(`/product/${id}`)
    console.log(data);
    return data;
 }

 export const updateProduct = async (ProductData,id) =>{
    const {data} = await axiosSecure.put(`/product/${id}`,ProductData)
    return data;
 }

 export const getSimilarProduct = async(category)=>{
    const data = await axiosSecure(`/products?category=${category}`)
    return data;
 }


//  brand and category

export const addBrand = async (BrandData) =>{
   const {data} = await axiosSecure.post('/brand',BrandData);
   return data; 
}
export const addCategory = async (CategoryData) =>{
   const {data} = await axiosSecure.post('/category',CategoryData);
   return data; 
}

export const getAllBrand  = async () =>{
   const {data} = await axiosSecure('/brand')
   return data
}
export const getAllCategory  = async () =>{
   const {data} = await axiosSecure('/category')
   return data
}


