import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { TbFidgetSpinner } from 'react-icons/tb'

const UpdateDiscountModal = ({ closeModal,
    isOpen, item, handleSubmit, loading,category,brand }) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Update Discount
                                </Dialog.Title>
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
                                                defaultValue={item?.name}
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
                                                name='category' defaultValue={item?.category} disabled
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
                                                name='brand_name' defaultValue={item?.brand_name} disabled
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
                                                        defaultValue={item?.price}
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
                                                        defaultValue={item?.cupon}
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default UpdateDiscountModal