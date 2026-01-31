import wallpaper from "../assets/wallpaper.webp"
import icon from "../assets/icon.webp"
import profileImg from "../assets/profileImg.webp"
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import api from "../app/axios";
import Toast from "../component/common/Toast";

const Register = () => {
    const [image, setImage] = useState<string | null>(null);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [userData, setUserData] = useState({
        userName: "",
        email: "",
        password: ""
    });
    const [confirmpassword, setConfirmPassword] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleFileChange = async(e:any) => {
        const file = e.target.files[0];
        if (!file) return;

        const blobUrl = URL.createObjectURL(file);
        setImage(blobUrl);

        const base64String = await blobUrlToBase64(blobUrl);
        setPhotoUrl(base64String);
    };

    async function blobUrlToBase64(blobUrl: string) {
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
        });
    }

    const validateEmail = (value: any) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value);
    };

    const handleUserData = (name: string, value: string) => {
        setUserData((prev)=> ({
            ...prev,
            [name]: value
        }))

        if (name === "email") {
            if (!validateEmail(value)) {
            setEmailError("Enter a valid email address");
            } else {
            setEmailError("");
            }
        }
    }

    const handleRegisterUser = async() =>{
        if(userData.password !== confirmpassword){
            setPasswordError("Both passwords must be the same");
            return;
        }else{
            setPasswordError("");
        }
        if (emailError !== "") return;

        const payload = {"photoUrl": photoUrl, ...userData}
        console.log("payload", payload);
        try{ 
            await api.post("/register", payload);
            setShowToast(true);
            setUserData({
                userName: "",
                email: "",
                password: ""
            })
            setPhotoUrl(null);
            setConfirmPassword("");
            setTimeout(() => {
                setShowToast(false);
                navigate({to: "/"})
            }, 4000);
            setError("");
            setPasswordError("");
            
        } catch(err: any) {
            console.error(err)
            setError(err.response?.data?.message)
        }
    }

  return (
    <>
    <div className='flex h-screen items-center justify-center w-screen' style={{ backgroundImage: `url(${wallpaper})` }}>
        <div className="card w-3xl bg-base-100 card-xl shadow-sm ">
            <div className="card-body p-5">
                <div className="absolute">
                    
                    <Link className="link link-accent text-sm" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 inline mr-1">
                          <path fillRule="evenodd" d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z" clipRule="evenodd" />
                        </svg>
                        Back to Sign in
                    </Link> 
                </div>
                <div className="grid place-items-center text-center">
                    <img alt="lifelog_icon" src={icon} className="h-20 w-20" />
                    <h2 className="card-title">Create Account</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                        <div className="flex flex-col items-center justify-center bg-emerald-50">
                            <div className="p-8 w-80 flex flex-col items-center">
                                
                                {/* Profile Image */}
                                <div className="relative">
                                <div className="avatar">
                                    <div className="w-32 h-32 rounded-full ring ring-emerald-500 ring-offset-base-100 ring-offset-2">
                                    <img src={image || profileImg} alt="Profile"/>
                                    </div>
                                </div>
                                {image && (
                                    <span className="absolute bottom-3 right-3 bg-success rounded-full p-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    </span>
                                )}
                                </div>

                                {/* Upload Button */}
                                <label className="btn btn-outline btn-sm mt-6 hover:bg-emerald-300">
                                Edit picture
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                </label>

                                {/* Info Text */}
                                <p className="text-xs text-center text-gray-400 mt-4">
                                You can edit your profile picture or upload a new one.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <fieldset className="fieldset pt-0">
                            <legend className="fieldset-legend pt-0">Username</legend>
                            <input value={userData.userName} onChange={(e)=> handleUserData('userName', e.target.value)} type="text" className="input w-full" placeholder="Enter your name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input value={userData.email} onChange={(e)=> handleUserData('email', e.target.value.toLowerCase())} type="text" className="input w-full" placeholder="Enter your email" />
                            {emailError && <p className="label text-red-300">{emailError}</p>}
                        </fieldset>
                        <fieldset className="fieldset relative">
                            <legend className="fieldset-legend">Password</legend>
                            <input value={userData.password} onChange={(e)=> handleUserData('password', e.target.value)} type={showPassword ? "text" : "password"} className="input w-full" placeholder="Enter your password" />
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
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Confirm Password</legend>
                            <input value={confirmpassword} onChange={(e)=> setConfirmPassword(e.target.value)} type="password" className="input w-full" placeholder="Enter your password" />
                            {passwordError && <p className="label text-red-300">{passwordError}</p>}
                        </fieldset>
                    </div>
                </div>
                <div className="mt-4">
                {error && <div className="flex justify-around mb-2">
                    <p className="text-red-300 text-center w-full text-sm">{error}</p>
                </div>}
                <div className="flex justify-around">
                    <button type="button" onClick={handleRegisterUser} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2">Register</button>
                </div>
                </div>
            </div>
      </div>
  </div>
  {showToast && <Toast message="User registered successfully!"/>}
  </>
  )
}

export default Register
