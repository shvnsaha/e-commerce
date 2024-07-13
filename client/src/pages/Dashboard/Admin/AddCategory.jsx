import React, { useState } from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';
import { addBrand, addCategory } from '../../../api/products';
import toast from 'react-hot-toast';
import { imageUpload } from '../../../api/utils';
import { Helmet } from 'react-helmet';

const AddCategory = () => {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    

    const handleBrandSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const brandname = form.brandname.value;
        const BrandData = {
            brandname
        }
        try {
            setLoading(true)
            const data = await addBrand(BrandData)
            toast.success('Brand added');
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const categoryname = form.categoryname.value;
        const image = form.image.files[0];
        const image_url = await imageUpload(image)
        const CategoryData = {
            categoryname, image: image_url?.data?.display_url
        }
        try {
            setLoading2(true)
            const data = await addCategory(CategoryData)
            toast.success('Category added');
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading2(false);
        }
    }

    const handleImageChange = (image) => {
        setUploadButtonText(image.name)
    }

    return (
        <>
         <Helmet>
            <title>E Shop | Add Category</title>
        </Helmet>
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col lg:flex-row px-10 justify-center gap-10 items-center text-gray-800 rounded-xl bg-gray-50'>
            <div className='bg-gray-200 p-5 w-1/2 text-center rounded-md'>
                <h2 className='font-semibold pb-3'>Add Brand</h2>
                <form onSubmit={handleBrandSubmit}>
                    <div className='space-y-1 text-sm'>

                        <input
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='brandname'
                            id='name'
                            type='text'
                            placeholder='Brand Name'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                    >
                        {loading ? (
                            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                        ) : (
                            'Save & Continue'
                        )}
                    </button>
                </form>
            </div>

            <div className='bg-gray-200 p-5 w-1/2 text-center rounded-md'>
                <h2 className='font-semibold pb-3'>Add Category</h2>
                <form onSubmit={handleCategorySubmit}>
                    <div className='text-sm'>

                        <input
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='categoryname'
                            id='name'
                            type='text'
                            placeholder='Category Name'
                            required
                        />


                        <div className='mt-3'>
                            <label>
                                <input onChange={(e) => handleImageChange(e.target.files[0])}
                                    className='text-sm cursor-pointer w-36 hidden'
                                    type='file'
                                    name='image'
                                    id='image'
                                    accept='image/*'
                                    hidden
                                />
                                <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                    {uploadButtonText}
                                </div>
                            </label>
                        </div>

                    </div>
                    <button
                        type='submit'
                        className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                    >
                        {loading2 ? (
                            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                        ) : (
                            'Save & Continue'
                        )}
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default AddCategory;