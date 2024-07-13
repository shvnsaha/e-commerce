import React, { useState } from "react";
import useUser from "../../../hooks/useUser";
import UpdateProfileModal from "../../../components/Modal/UpdateProfileModal";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { updateUser } from "../../../api/Auth";
import toast from "react-hot-toast";
import { updateUserReview } from "../../../api/review";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { updateUserProfile, resetPassword } = useAuth();
  const [userData, refetch, isLoading] = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const handleUpdate = async (item) => {
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const image = form.image.files[0];

    const image_url = image ? await imageUpload(image) : "";
    const image_new = image ? image_url?.data?.display_url : userData?.image;

    const updateUserData = {
      name,
      phone,
      address,
      image: image_new,
    };

    try {
      await updateUserProfile(name, image_new);

      //update user in db
      const dbresponse = await updateUser(userData?._id, updateUserData);
      await updateUserReview(userData?.email, { name });

      refetch();
      setIsOpen(false);
      toast.success("User Information Updated successfully");
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const resetpass = async (email) => {
    const result = await resetPassword(email)
      .then(() => {
        toast.success("Code sent Successfully.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <>
      <Helmet>
        <title>E Shop | Manage Profile</title>
      </Helmet>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-lg rounded-2xl w-3/5">
          <img
            alt="profile"
            src="https://wallpapercave.com/wp/wp10784415.jpg"
            className="w-full mb-4 rounded-t-lg h-36"
          />
          <div className="flex flex-col items-center justify-center p-4 -mt-16">
            <a href="#" className="relative block">
              <img
                alt="profile"
                src={userData?.image}
                className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
              />
            </a>

            <p className="p-2 px-4 text-xs text-white bg-pink-500 rounded-full">
              {userData?.role && userData?.role.toUpperCase()}
            </p>
            {/* <p className='mt-2 text-xl font-medium text-gray-800 '>
              User Id: {user.uid}
            </p> */}
            <div className="w-full p-2 mt-4 rounded-lg">
              <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
                <p className="flex flex-col">
                  Name
                  <span className="font-bold text-black ">{userData.name}</span>
                </p>
                <p className="flex flex-col">
                  Email
                  <span className="font-bold text-black ">
                    {userData.email}
                  </span>
                </p>

                <div>
                  <button
                    onClick={() => handleUpdate(userData)}
                    className="bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={() => resetpass(userData?.email)}
                    className="bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          <UpdateProfileModal
            closeModal={closeModal}
            isOpen={isOpen}
            handleSubmit={handleSubmit}
            userData={userData}
            loading={loading}
          ></UpdateProfileModal>
        }
      </div>
    </>
  );
};

export default Profile;
