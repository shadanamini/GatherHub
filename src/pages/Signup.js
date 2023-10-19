import Navbar from "../components/Navbar";
import { signup, useCurrentUser } from "../utils/Firebase";
import { useRef, useState } from 'react';

const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    const currentUser = useCurrentUser();

    const [loading, setLoading] = useState(false);

    async function handleSignup() {
        if(emailRef.current===null || passwordRef.current===null || passwordConfirmRef.current===null)
            return;
        if(passwordRef.current.value!==passwordConfirmRef.current.value)
            return;
        setLoading(true);
        try{
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert("ERROR");
        }
        setLoading(false);
        
    }

    return (
        <div className='lg:overflow-y-hidden max-h-screen'>
            <Navbar />
            <div className="flex items-center justify-center bg-base-200">
                <div className="hero min-h-screen w-3/5 bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Signup now!</h1>
                            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <input type="text" placeholder="username" className="input input-bordered" />
                                </div>
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
                                    <input ref={passwordRef} type="text" placeholder="password" className="input input-bordered" />
                                </div>
                                <div className="form-control mt-6">
                                    <button disabled={loading} onClick={handleSignup} className="btn btn-primary">Signup</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup