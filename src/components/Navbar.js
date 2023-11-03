import { Link } from "react-router-dom"
import { useCurrentUser } from "../utils/Firebase"
import { logout } from "../utils/Firebase";

const Navbar = () => {
    const user = useCurrentUser();
    return (
        <div className="navbar bg-base-100 h-[10vh]">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Create Conference</a></li>
                        <li><a>View Conferences</a></li>
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-sm">Gather Hub</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                    {user 
                    ?
                    <ul className="menu menu-horizontal px-1">
                        <Link to="/create" className="btn btn-ghost normal-case text-sm mr-5">Create Conference</Link>
                        <Link to="/attend" className="btn btn-ghost normal-case text-sm mr-5">Attend Conference</Link>
                    </ul>
                    : 
                    <ul className="menu menu-horizontal px-1"></ul>}
            </div>
            <div className="navbar-end">
                {user ? <Link to="/" className="btn btn-ghost normal-case text-sm mr-5" onClick={logout}>Logout</Link> : <Link to="/login" className="btn btn-ghost normal-case text-sm mr-5">Login</Link>}
                {user ? <Link to="/home" className="btn btn-ghost normal-case text-sm mr-5">{user.email}</Link> : <Link to="/signup" className="btn btn-ghost normal-case text-sm mr-5">Sign Up</Link>}
            </div>
        </div>
    )
}

export default Navbar