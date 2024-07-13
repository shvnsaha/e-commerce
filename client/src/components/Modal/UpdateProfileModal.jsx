import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';

const UpdateProfileModal = ({ closeModal, isOpen, handleSubmit, userData, loading }) => {
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
                                    My Profile
                                </Dialog.Title>
                                <form onSubmit={handleSubmit}>

                                    <div className='space-y-1 mt-5 text-sm relative'>

                                        <input
                                            className='peer w-full px-4 py-3 text-gray-800 border border-rose-300  focus:outline-rose-500 rounded-md placeholder-transparent'
                                            name='name'
                                            id='name'
                                            type='text'
                                            placeholder='Name'
                                            defaultValue={userData?.name}
                                        />

                                        <label htmlFor='pass' className='block absolute left-4 -top-3.5 text-gray-600 px-1 bg-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                        peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>
                                            Name
                                        </label>
                                    </div>
                                    <div className='space-y-1 mt-5 text-sm relative'>

                                        <input
                                            className='peer w-full px-4 py-3 text-gray-800 border border-rose-300  focus:outline-rose-500 rounded-md placeholder-transparent'
                                            name='phone'
                                            id='phone'
                                            type='text'
                                            placeholder='Phone'
                                            defaultValue={userData?.phone}
                                        />

                                        <label htmlFor='phone' className='block absolute left-4 -top-3.5 text-gray-600 px-1 bg-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                        peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>
                                            Phone
                                        </label>
                                    </div>
                                    <div className='space-y-1 mt-5 text-sm relative'>

                                        <textarea
                                            className='peer w-full px-4 py-3 text-gray-800 border border-rose-300  focus:outline-rose-500 rounded-md placeholder-transparent'
                                            name='address'
                                            id='address'
                                            type='text'
                                            placeholder='Address'
                                            defaultValue={userData?.address}
                                        />

                                        <label htmlFor='address' className='block absolute left-4 -top-3.5 text-gray-600 px-1 bg-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                                        peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>
                                            Address
                                        </label>
                                    </div>

                                    <div>
                                        <label htmlFor='image' className='block mb-2 text-sm'>
                                            Select Image:
                                        </label>
                                        <input
                                            type='file'
                                            id='image'
                                            name='image'
                                            accept='image/*'
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateProfileModal;