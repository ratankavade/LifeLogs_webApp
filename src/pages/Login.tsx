import wallpaper from "../assets/wallpaper.png"
import icon from "../assets/icon.png"
import { useState } from "react"
import api from "../app/axios";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emialError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => {
        try{ 
            const response = await api.post("/login", 
                {email, password}
            );
            setEmail("");
            setPassword("");
            navigate({to: "/expences"})
            return dispatch(addUser(response.data));
            
        } catch(err: any) {
            console.error("err", err);
            setPasswordError(err.response?.data?.message)
        }
    }

    const validateEmail = (value: any) => {
        // Simple email regex pattern
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value);
    };


    const handleEmail = (e: any) => {
        setEmail(e.target.value)

        if (!validateEmail(e.target.value)) {
        setEmailError("Enter valid email address");
        } else {
        setEmailError("");
        }
    }

  return (
    <div className='flex h-screen items-center justify-center w-screen' style={{ backgroundImage: `url(${wallpaper})` }}>
        <div className="card w-96 bg-base-100 card-xl shadow-sm ">
            <div className="card-body p-5">
                <div className="grid place-items-center text-center">
                    <img alt="lifelog_icon" src={icon} className="h-20 w-20" />
                    <h2 className="card-title">LifeLogs</h2>
                    <p className="text-xs text-gray-400">
                        Welcome Back! Sign in to LifeLogs!
                    </p>
                </div>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input value={email} onChange={handleEmail} type="text" className="input w-full" placeholder="Enter your email" required/>
                    {emialError && <p className="label text-red-300">{emialError}</p>}
                </fieldset>
                <fieldset className="fieldset relative">
                    <legend className="fieldset-legend">Password</legend>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type={showPassword ? "text" : "password"} className="input w-full grow " placeholder="Enter your password" />
                    <svg onClick={()=>setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 absolute right-2.5 top-3.5 cursor-pointer z-10">
                        {showPassword ? 
                        <>
                        <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clipRule="evenodd" />
                        <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                        </>
                        : 
                        <>
                        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                        </>
                        }
                    </svg>
                    {passwordError  && <p className="label text-red-300">{passwordError}</p>}
                </fieldset>
                <div className="justify-center card-actions mt-4">
                    <button type="button" onClick={handleLogin} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 w-full">Sign in</button>
                </div>
                <div className='text-center'>
                    <p className='inline text-xs text-gray-400'>Don't have an account? </p>
                    <Link to="/register" className="inline link link-accent text-xs">Create account</Link>
                </div>
            </div>
      </div>
  </div>
  )
}

export default Login
