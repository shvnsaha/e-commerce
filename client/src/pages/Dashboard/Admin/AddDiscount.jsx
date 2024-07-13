import React, { useEffect, useState } from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';
import { addDiscount } from '../../../api/discounts';
import toast from 'react-hot-toast';
import { getAllBrand, getAllCategory } from '../../../api/products';
import { Helmet } from 'react-helmet';

const AddDiscount = () => {
    const [loading, setLoading] = useState(false)
    const [brand,setBrand] = useState([])
    const [category,setCategory] = useState([])
    const [loader,setLoader]= useState(false)

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



    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const category = form.category.value;
        const brand_name = form.brand_name.value;
        const price = parseInt(form.price.value);
        const cupon = form.cupon.value;
        const date = form.date.value;
        const time = form.time.value;
        const dtime = `${date}T${time}`
        const date1 = new Date(dtime)
        const date2 = Date.now();
       const date_ms = date1.getTime();

       console.log(price);

     

        if(date2 >= date_ms)
         {
            toast.error('prev date')
         }

        else{

        const discountData = {
            name, category, brand_name, price, cupon,exDate : date_ms
        }

       
        try {
            setLoading(true)
            const data = await addDiscount(discountData)
            console.log(data)
            if(data.insertedId)
             toast.success('New Discount added');
            else
             toast.error('Already Discount Running')

        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    }
    return (
        <>
        <Helmet>
            <title>E Shop | Add Discount</title>
        </Helmet>
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit}>
                <div className='space-y-6'>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='name' className='block text-gray-600'>
                            Name
                        </label>
                        <input
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='name'
                            id='name'
                            type='text'
                            placeholder='Name'
                            required
                        />
                    </div>


                    <div className='space-y-1 text-sm'>
                        <label htmlFor='category' className='block text-gray-600'>
                            Category
                        </label>
                        <select
                            required
                            className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                            name='category'
                        >
                            {category.map(item => (
                                <option value={item.categoryname} key={item?._id}>
                                    {item?.categoryname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='space-y-1 text-sm'>
                        <label htmlFor='brand_name' className='block text-gray-600'>
                            Brand Name
                        </label>
                        <select
                            required
                            className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                            name='brand_name'
                        >
                            {brand.map(item => (
                                <option value={item.brandname} key={item?._id}>
                                    {item?.brandname}
                                </option>
                            ))}
                        </select>


                        <div className='flex justify-between gap-2'>
                            <div className='space-y-1 text-sm'>
                                <label htmlFor='price' className='block text-gray-600'>
                                    Discount Percent
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='price'
                                    id='price'
                                    type='text'
                                    placeholder='Percent'
                                    required
                                />
                            </div>

                            <div className='space-y-1 text-sm'>
                                <label htmlFor='product_number' className='block text-gray-600'>
                                    Cupon
                                </label>
                                <input
                                    className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                    name='cupon'
                                    id='cupon'
                                    type='text'
                                    placeholder='Cupon'
                                    required
                                />
                            </div>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='product_number' className='block text-gray-600'>
                                Date
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='date'
                                id='product_number'
                                type='date'
                                placeholder='Date'
                                required
                            />
                        </div>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='product_number' className='block text-gray-600'>
                                Date
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='time'
                                id='product_number'
                                type='time'
                                placeholder='Date'
                                required
                            />
                        </div>
                

                    </div>



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
        </>
    );
};

export default AddDiscount;