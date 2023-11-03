import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUser } from "./Firebase";

const NoLoginRoutes = () => {
    let user = useCurrentUser();

    return (
        !user ? <Outlet/> : <Navigate to='/home'/>
    );
}

export default NoLoginRoutes;