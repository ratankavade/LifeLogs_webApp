import wallpaper from "../assets/wallpaper.png"
import icon from "../assets/icon.png"
import { useState } from "react"
import api from "../app/axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async() => {
        try{ 
            const response = await api.post("/login", 
                {email, password}
            );
        } catch(err) {
            console.error(err)
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
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" className="input w-full" placeholder="Enter your email" />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="input w-full" placeholder="Enter your password" />
                </fieldset>
                <div className="justify-center card-actions mt-4">
                    <button type="button" onClick={handleLogin} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 w-full">Sign in</button>
                </div>
                <div className='text-center'>
                    <p className='inline text-xs text-gray-400'>Don't have an account? </p>
                    <a className="inline link link-accent text-xs">Create account</a>
                </div>
            </div>
      </div>
  </div>
  )
}

export default Login
