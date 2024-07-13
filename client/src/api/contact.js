import axiosSecure from ".";

export const addContact = async (contactData) => {
  const { data } = await axiosSecure.post("/contacts", contactData);
  return data;
};

