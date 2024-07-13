import { Dialog, Transition } from '@headlessui/react';
import React, { useState } from 'react';
import { Fragment } from 'react'
import { TbFidgetSpinner } from 'react-icons/tb';
import { FaStar } from "react-icons/fa";

const UpdateReviewModal = ({ closeModal, isOpen, setRating, rating, handleSubmit, item, loading = false,}) => {
    const [ratecolor, setColor] = useState(null)
    
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
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    {item?.productName}
                                </Dialog.Title>




                                <form onSubmit={handleSubmit}>




                                    <div className='flex justify-center my-4'>
                                        {[...Array(5)].map((star, index) => {
                                            const currentRate = index + 1
                                            return (

                                                <label key={index}>
                                                    <input type="radio" name='rate' className='hidden'
                                                        value={currentRate}
                                                        onClick={() => setRating(currentRate)}
                                                    />
                                                    <FaStar size={40}
                                                        color={currentRate <= (ratecolor || rating) ? 'red' : 'gray'}
                                                    />

                                                </label>

                                            )
                                        }


                                        )}
                                    </div>




                                    <div className='space-y-1 text-sm'>
                                        <label htmlFor='description' className='block text-gray-600'>
                                            Review
                                        </label>

                                        <textarea maxLength={100}
                                            placeholder='review max 100 character'
                                            defaultValue={item?.review}
                                            id='description'
                                            className='block rounded-md focus:rose-300 w-full h-28 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                                            name='review'
                                        ></textarea>
                                    </div>

                                    <button
                                        type='submit'
                                        className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                                    >
                                        {loading ? (
                                            <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                                        ) : (
                                            'Submit'
                                        )}
                                    </button>
                                </form>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateReviewModal;