import { Navigate } from "react-router-dom";

import useRole from "../hooks/useRole";
import Loader from "../components/Loader/Loader";



const AdminRoutes = ({children}) => {
   
    const [role,loading] = useRole();
 

    if(loading) return <Loader></Loader>
    if(role === 'admin') return children
    return <Navigate to='/dashboard'></Navigate>
};

export default AdminRoutes;