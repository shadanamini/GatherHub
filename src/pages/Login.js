import Navbar from "../components/Navbar";
import { login } from "../utils/Firebase";
import { useState, useRef } from "react";

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if(emailRef.current===null || passwordRef.current===null)
            return;
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
        } catch {

        }
        setLoading(false);
    }

    return (
        <div className='lg:overflow-y-hidden max-h-screen'>
            <Navbar/>
            <div className="flex items-center justify-center bg-base-200 overflow-y-hidden">
                <div className="hero min-h-[90vh] w-3/5 bg-base-200 overflow-y-hidden">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Login now!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input ref={emailRef} type="text" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input ref={passwordRef} type="password" placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button disabled={loading} onClick={handleLogin} className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login