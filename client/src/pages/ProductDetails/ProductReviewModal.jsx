import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import { Fragment } from 'react'
import Ratings from '../../components/Shared/Ratings'

const ProductReviewModal = ({ isOpen, closeModal, reviews, name }) => {
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
                                    className='text-lg font-medium text-center leading-6 text-gray-900 mb-8'
                                >
                                    {name}
                                </Dialog.Title>



                                {

                                    reviews.map((review, index) => (
                                        <div key={index} className='border-b-2 border-red-500 space-y-2 p-2'>
                                            <div className='flex items-center gap-4 '>
                                                <div className="avatar online">
                                                    <div className="w-10 rounded-full">
                                                        <img src={review?.image ? review?.image : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                                                    </div>
                                                </div>
                                                <h2 className='text-sm font-light'>{review?.name}</h2>
                                            </div>
                                            <Ratings rating={review.rating}></Ratings>
                                            <p>{review.review}</p>
                                            {
                                                (() => {
                                                    const date = new Date(review?.date)
                                                    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                                                    const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
                                                    return (
                                                        <div className='flex gap-1 text-xs '>
                                                            <p className='text-gray-900 whitespace-no-wrap'>{formattedDate}</p>
                                                            <p className='text-gray-900 whitespace-no-wrap'>{formattedTime}</p>
                                                        </div>
                                                    )
                                                })()
                                            }

                                        </div>
                                    ))
                                }


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ProductReviewModal
