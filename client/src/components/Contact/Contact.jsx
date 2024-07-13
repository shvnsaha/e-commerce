import React, { useState } from "react";
import AuthInputBox from "../Shared/AuthInputBox";
import useAos from "../../hooks/useAos";
import { addContact } from "../../api/contact";
import toast from "react-hot-toast";

export const Contact = () => {
  useAos();
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const description = form.description.value;
    const contactData = {
      name,
      email,
      subject,
      description,
    };
    console.log(contactData);
    try {
      setLoader(true);
      const result = await addContact(contactData);
      if(result?.insertedId)
       toast.success('Message Sent Successfully')
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
      form.reset();
    }
  };


  return (
    <div className="my-12 px-6">
      <div data-aos="zoom-out-up" className=" max-w-3xl mx-auto text-center">
        <h1 className="mb-2 text-2xl  text-green-600  font-bold">
          Reach out to us!
        </h1>
        <p className="mb-3 text-lg leading-7 text-grey font-medium">
          To learn more about our team and initiatives, feel free to get in
          touch with us. Our dedicated team of professionals is here to help and
          provide support to your queries.
        </p>
      </div>

      <div className="flex gap-7 flex-col items-center md:flex-row">
        <div className="grid grid-cols-1 gap-5 md:w-1/2 md:grid-cols-2">
          <div data-aos="fade-up" className="crad_items  rounded-none">
            <div className="card bg-green-100  mb-2   shadow-lg ">
              <figure className="text-6xl text-green-600  mt-14">
                <i className="fa-light fa-location-dot"></i>
              </figure>
              <div className="card-body text-center">
                <h2 className="text-head text-4xl text-green-600 font-bold capitalize">
                  adress
                </h2>
                <p className="text-lg   mt-2   text-grey font-light">
                  685 Tangail,
                </p>
                <p className="text-lg text-grey font-light">
                  Dhaka, Bangladesh
                </p>
                <div className="card-actions justify-center"></div>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" className="crad_items  rounded-none">
            <div className="card bg-green-100   mb-2   shadow-lg ">
              <figure className="text-6xl text-green-600 mt-14 ">
                <i className="fa-light fa-phone-volume"></i>
              </figure>
              <div className="card-body text-center">
                <h2 className="text-head text-4xl text-green-600 font-bold capitalize">
                  Call US
                </h2>
                <p className="text-lg  mt-2 font-light  text-grey ">
                  0183736633
                </p>
                <p className="text-lg text-grey font-light">
                  6463-222-22-8888-22
                </p>
                <div className="card-actions justify-center"></div>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" className="crad_items  rounded-none">
            <div className="card bg-green-100   mb-2   shadow-lg ">
              <figure className="text-6xl text-green-600 mt-14 ">
                <i className="fa-regular fa-envelope"></i>
              </figure>
              <div className="card-body text-center">
                <h2 className="text-head text-4xl text-green-600 font-bold capitalize">
                  Mail us
                </h2>
                <p className="text-lg  mt-2  break-words  text-grey font-light">
                  eshop@gmail.com
                </p>
                <p className="text-lg text-grey break-words font-light">
                  me@yahoo.com
                </p>
                <div className="card-actions justify-center"></div>
              </div>
            </div>
          </div>

          <div data-aos="fade-up" className="crad_items  rounded-none">
            <div className="card bg-green-100   mb-2   shadow-lg ">
              <figure className="text-6xl text-green-600 mt-14 ">
                <i className="fa-regular fa-headphones"></i>
              </figure>
              <div className="card-body text-center">
                <h2 className="text-head text-4xl text-green-600 font-bold capitalize">
                  Helpline
                </h2>
                <p className="text-lg  mt-2   text-grey font-light">
                  24/7 6584557
                </p>
                <p className="text-lg text-grey font-light">
                  Tangail ,Dhaka ,Bangladesh
                </p>
                <div className="card-actions justify-center"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <div data-aos="zoom-in-up" className="bg-green-100  p-10 rounded-lg">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 justify-between h-full"
            >
              <AuthInputBox
                placeholder="Name"
                name="name"
                type="text"
              ></AuthInputBox>
              <AuthInputBox
                placeholder="email"
                name="email"
                type="email"
              ></AuthInputBox>
              <AuthInputBox
                placeholder="subject"
                name="subject"
                type="text"
              ></AuthInputBox>

              <textarea
                required
                name="description"
                className="textarea  border-green-700 focus:outline-none my-3 text-base textarea-bordered"
                placeholder="Message"
                rows={4}
              ></textarea>

              <button
                type="submit"
                className="btn mt-5 lg:mt-0 w-full bg-green-600  hover:bg-green-600 text-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
