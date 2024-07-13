import React, { useEffect, useState } from 'react';
import AddProductForm from '../../../components/Form/AddProductForm';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { imageUpload } from '../../../api/utils';
import toast from 'react-hot-toast';
import { addProduct, getAllBrand, getAllCategory } from '../../../api/products';
import { Helmet } from 'react-helmet';
import Loader from '../../../components/Loader/Loader';

const AddProduct = () => {
    const navigate = useNavigate();
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const [loader,setLoader]= useState(false)
    const [brand,setBrand] = useState([])
    const [category,setCategory] = useState([])

    // category and brand get
    useEffect(() => {
        setLoader(true)
        getAllBrand()
            .then(data => {
                setBrand(data);
            })
            getAllCategory()
            .then(data=>{
                setCategory(data)
            })
            setLoader(false)
    }, [])

    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const brand_name = form.brand_name.value;
        const price = Number(form.price.value);
        const product_number = Number(form.product_number.value);
        const image = form.image.files[0];
        const image_url = await imageUpload(image)
        const description = form.description.value;

        const ProductData = {
            name,category,brand_name,price,product_number,image:image_url?.data?.display_url,description,rating: 0,ratingNumber: 0,totalsold: 0
        }

        try{
            setLoading(true)
            const data = await addProduct(ProductData)
            setUploadButtonText('Uploaded')
            toast.success('Product added');
            
            //  navigate('/dashboard/manage-product');
           
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

    if(loader) return <Loader></Loader>

    return (
        <div>
            <Helmet>
                <title>E-Shop | Add Products</title>
            </Helmet>

            <AddProductForm
                handleSubmit={handleSubmit}
                handleImageChange={handleImageChange}
                loading={loading}
                uploadButtonText={uploadButtonText}
                brand={brand}
                category={category}
            ></AddProductForm>
        </div>
    );
};

export default AddProduct;