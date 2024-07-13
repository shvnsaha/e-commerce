import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../layout/DashboardLayout";
import Users from "../pages/Dashboard/Admin/Users";
import { getAllProduct, getProduct } from "../api/products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings";
import AddProduct from "../pages/Dashboard/Admin/AddProduct";
import ManageProduct from "../pages/Dashboard/Admin/ManageProduct";
import AdminRoutes from "./AdminRoutes";
import UpdateProduct from "../pages/Dashboard/Admin/UpdateProduct";
import Profile from "../pages/Dashboard/Shared/Profile";
import Shops from "../pages/Shop/Shops";
import Carts from "../pages/Dashboard/Client/Carts";
import AddDiscount from "../pages/Dashboard/Admin/AddDiscount";
import ErrorPage from "../pages/Errorpage/Errorpage";
import ManageDiscount from "../pages/Dashboard/Admin/ManageDiscount";
import Checkout from "../pages/Dashboard/Client/Checkout";
import Bookings from "../pages/Dashboard/Client/Bookings";
import AllBookings from "../pages/Dashboard/Admin/AllBookings";
import PendingReview from "../pages/Dashboard/Client/PendingReview";
import Reviews from "../pages/Dashboard/Client/Reviews";
import AddCategory from "../pages/Dashboard/Admin/AddCategory";
import PaymentSuccess from "../pages/Dashboard/Client/PaymentSuccess";
import ManageRefunds from "../pages/Dashboard/Admin/ManageRefunds";
import Refund from "../pages/Dashboard/Client/Refund";
import { Dashboard } from "../pages/Dashboard/Admin/Dashboard";
import Verification from "../pages/SignUp/Verification";
import ContactMessage from "../pages/Dashboard/Admin/ContactMessage";
import MonthlyStat from "../pages/Dashboard/Admin/MonthlyStat";




const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path:'/',
            element:<Home></Home>,
        },
        {
          path:'/shop',
          element:<Shop></Shop>
         
        },
        {
          path:'/product/:id',
          element:<ProductDetails></ProductDetails>,
          loader:({params}) => getProduct(params.id)
        },
        // {
        //   path:'/cart',
        //   element:<PrivateRoutes><Cart></Cart></PrivateRoutes>
          
        // }
      ]
    },
    {
      path:'/signup',
      element: <SignUp></SignUp>
    },
    {
      path:'/verify',
      element: <Verification></Verification>
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/checkout',
      element: <PrivateRoutes><Checkout></Checkout></PrivateRoutes>
    },
    {
      path:'/payment/success/:tranId',
      element: <PaymentSuccess></PaymentSuccess>
    },
    {
      path:'/dashboard',
      element:<PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
      children:[
        {
          path:'/dashboard',
          element:<PrivateRoutes><AdminRoutes><Dashboard></Dashboard></AdminRoutes></PrivateRoutes>,
        },
        {
          path:'users',
          element:<PrivateRoutes><AdminRoutes><Users></Users></AdminRoutes></PrivateRoutes>
        },
        {
          path:'manage-bookings',
          element:<PrivateRoutes><AdminRoutes><ManageBookings></ManageBookings></AdminRoutes></PrivateRoutes>
        },
        {
          path:'add-category',
          element:<PrivateRoutes><AdminRoutes><AddCategory></AddCategory></AdminRoutes></PrivateRoutes>
        },
        {
          path:'add-product',
          element:<PrivateRoutes><AdminRoutes><AddProduct></AddProduct></AdminRoutes></PrivateRoutes>
        },
      
        {
          path:'manage-product',
          element:<PrivateRoutes><AdminRoutes><ManageProduct></ManageProduct></AdminRoutes></PrivateRoutes>
        },
        {
          path:'update-product/:id',
          element:<PrivateRoutes><AdminRoutes><UpdateProduct></UpdateProduct></AdminRoutes></PrivateRoutes>,
          loader:({params}) =>getProduct(params.id)
        },
        {
          path:'add-discount',
          element:<PrivateRoutes><AdminRoutes><AddDiscount></AddDiscount></AdminRoutes></PrivateRoutes>
        },
        {
          path:'manage-discount',
          element:<PrivateRoutes><AdminRoutes><ManageDiscount></ManageDiscount></AdminRoutes></PrivateRoutes>
        },
        {
          path:'contacts-message',
          element:<PrivateRoutes><AdminRoutes><ContactMessage></ContactMessage></AdminRoutes></PrivateRoutes>
        },
        {
          path:'monthly-stat',
          element:<PrivateRoutes><AdminRoutes><MonthlyStat></MonthlyStat></AdminRoutes></PrivateRoutes>
        },
        {
          path:'cart',
          element:<PrivateRoutes><Carts></Carts></PrivateRoutes>
        },
        {
          path:'bookings',
          element:<PrivateRoutes><Bookings></Bookings></PrivateRoutes>
        },
        {
          path:'refunds',
          element:<PrivateRoutes><Refund></Refund></PrivateRoutes>
        },
        {
          path:'all-bookings',
          element:<PrivateRoutes><AdminRoutes><AllBookings></AllBookings></AdminRoutes></PrivateRoutes>
        },
        {
           path:'manage-refunds',
           element:<PrivateRoutes><AdminRoutes><ManageRefunds></ManageRefunds></AdminRoutes></PrivateRoutes>
        },
        {
          path:'pending-review',
          element:<PrivateRoutes><PendingReview></PendingReview></PrivateRoutes>
        },
        {
          path:'my-review',
          element:<PrivateRoutes><Reviews></Reviews></PrivateRoutes>
        },
        {
          path:'profile',
          element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
        },
     

    ]
     
    }
  ]);

  export default router