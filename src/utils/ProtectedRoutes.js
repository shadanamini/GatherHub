import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUser } from "./Firebase";

const PrivateRoutes = () => {
    let user = useCurrentUser();

    return (
        user ? <Outlet/> : <Navigate to='/'/>
    );
}

export default PrivateRoutes;