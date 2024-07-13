import axiosSecure from ".";

export const saveUser = async (user,{phone},status) => {
  console.log(status);
  const currentUser = {
    email: user.email,
    role: "client",
    status: status,
    message: "notsent",
    image: user.photoURL,
    name: user?.displayName,
    phone: phone,
  };

  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);
  return data;
};

export const updateUserStatus = async (user, status) => {
  console.log(status);
  const currentUser = {
    email: user.email,
    role: "client",
    status: status,
    message: "notsent",
    image: user.photoURL,
    name: user?.displayName,
  };

  const { data } = await axiosSecure.put(
    `/userstatus/${user?.email}`,
    currentUser
  );
  return data;
};

export const updateUser = async (id, userData) => {
  const { data } = await axiosSecure.put(`/user/${id}`, userData);
  return data;
};

export const getAllUser = async () => {
  const { data } = await axiosSecure("/users");
  return data;
};

export const getSingleUser = async (email) => {
  const { data } = await axiosSecure(`/user/${email}`);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axiosSecure.delete(`/user/${id}`);
  return data;
};

export const getToken = async (email) => {
  const { data } = await axiosSecure.post(`/jwt`, email);
  console.log("token revi ", data);
  return data;
};

export const clearCookie = async () => {
  const { data } = await axiosSecure.get("/logout");
  return data;
};

export const getRole = async (email) => {
  const { data } = await axiosSecure(`/user/${email}`);
  return data.role;
};

// message update;

export const updateMessage = async (id, object) => {
  console.log(object);
  const { data } = await axiosSecure.put(`/send/${id}`, object);
  return data;
};

// update message status

export const updateMessageStatus = async () => {
  const { data } = await axiosSecure.put(`/updatestatus`);
  return data;
};
