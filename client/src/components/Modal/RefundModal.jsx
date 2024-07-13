import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { TbFidgetSpinner } from 'react-icons/tb';


const RefundModal = ({ closeModal, isOpen, handleSubmit, loading, item, handleChange }) => {
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
                                    className="text-lg font-medium text-center leading-6 text-gray-900 mb-6"
                                >
                                    Refund 
                                </Dialog.Title>
                                <form onSubmit={handleSubmit}>


                                    {
                                        item?.itemName && item?.itemName.map((i, index) => {

                                            return (
                                                <div key={index} className='mb-3'>
                                                    <div className='flex gap-4'>

                                                        <div className='space-y-1 text-sm'>
                                                            <input
                                                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                                                name='name'
                                                                id='name'
                                                                type='text'
                                                                placeholder='Name'
                                                                defaultValue={item?.itemName[index]}
                                                                onChange={() => handleChange(event, index)}
                                                                required
                                                                readOnly
                                                            />
                                                        </div>
                                                        
                                                        <div className='space-y-1 text-sm'>
                                                            <input
                                                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                                                name='quantity'
                                                                id='quantity'
                                                                type='number'
                                                                placeholder='quantity'
                                                                max={item?.itemQuantity[index]}
                                                                defaultValue={item?.itemQuantity[index]}
                                                                onChange={() => handleChange(event, index)}
                                                                required
                                                            />
                                                        </div>

                                                        <div className='space-y-1 text-sm'>
                                                            <input
                                                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                                                name='price'
                                                                id='price'
                                                                type='number'
                                                                placeholder='price'
                                                                max={item?.itemPrice[index]}
                                                                defaultValue={item?.itemPrice[index] / item?.itemQuantity[index]} 
                                                                required
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        })
                                    }

                                    <p>Please Provide TransactionId,Name,Email,Phone On Return Package</p>
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

export default RefundModal;
