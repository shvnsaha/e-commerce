import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { getToken, saveUser, updateUserStatus } from "../../api/Auth";
import { useState } from "react";
import ResetPasswordModal from "./ResetPasswordModal";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signInWithGoogle, loading, signIn,resetPassword } = useAuth();

  // password change
  let [isOpen, setIsOpen] = useState(false);
  const [loading2,setLoading2] = useState(false)
  function closeModal() {
    setIsOpen(false);
  }

  const handleResetPass = async(e) =>{
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please Provide a valid email address");
      return
    }
    const result = await resetPassword(email)
    setIsOpen(false)
    toast.success('Reset Password Link sent in your email');
   
  }

  
  const [loader, setLoader] = useState(false);
  console.log(loader);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoader(true);
      const result = await signIn(email, password);
      console.log(`result.user.emailVerified: ${result.user.emailVerified}`);
      if (result.user.emailVerified) {
        const dbResponse = await updateUserStatus(result?.user, "verified");
        console.log(dbResponse);

        await getToken(result?.user?.email);
        navigate(from, { replace: true });
        toast.success("login success");
      } else toast.error("Please Verify your account");
    } catch (err) {
      toast.error('Invalid Email or password');
    }

    setLoader(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoader(true);
      const result = await signInWithGoogle();

      const dbResponse = await saveUser(result?.user, "verified");
      console.log(dbResponse);

      await getToken(result?.user?.email);
      navigate(from, { replace: true });
      toast.success("Login success");
    } catch (err) {
      console.log(err);
      toast.success(err?.message);
    }
    setLoader(false);
  };

  return (
    <>
    <Helmet>
        <title>E-Shop | Login</title>
      </Helmet>
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
              {loader ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button
            className="text-xs hover:underline hover:text-rose-500 text-gray-400"
            onClick={() => setIsOpen(true)}
          >
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
      <ResetPasswordModal
       closeModal={closeModal}
       isOpen={isOpen} handleResetPass={handleResetPass} loading2={loading2}></ResetPasswordModal>
    </div>
    </>
  );
};

export default Login;
