import React, { useState } from 'react';
import UpdateProductForm from '../../../components/Form/UpdateProductForm';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { imageUpload } from '../../../api/utils';
import toast from 'react-hot-toast';
import { updateProduct } from '../../../api/products';

const UpdateProduct = () => {
    const product = useLoaderData();
    const navigate = useNavigate();
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [imageloading,setImageloading] =useState(false)
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const brand_name = form.brand_name.value;
        const price = Number(form.price.value);
        const product_number = Number(form.product_number.value);
        const description = form.description.value;
        const image = form.image.files[0];
      
      
         const image_url = image ?  await imageUpload(image): '' 
         const image_new = image ? image_url?.data?.display_url : product?.image;
        

        
        const ProductData = {
            name,category,brand_name,price,product_number,image:image_new,description
        }

        console.log(ProductData);
 
         try{
            setLoading(true)
            const data = await updateProduct(ProductData,product?._id)
            setUploadButtonText('Uploaded')
            toast.success('Product updated');
            
             navigate('/dashboard/manage-product');
           
           }catch(err){
             console.log(err);
             toast.error(err.message);
           }finally{
            setLoading(false);
           }
        
    }


    const handleImageChange = (image) => {
        setUploadButtonText(image.name)
    }
    return (
        <div>
        
            <UpdateProductForm
                handleSubmit={handleSubmit}
                handleImageChange={handleImageChange}
                loading={loading}
                uploadButtonText={uploadButtonText}
                product={product}>
            </UpdateProductForm>
        </div>
    );
};

export default UpdateProduct;