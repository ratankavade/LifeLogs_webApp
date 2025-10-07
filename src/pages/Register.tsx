import wallpaper from "../assets/wallpaper.png"
import icon from "../assets/icon.png"
import profileImg from "../assets/profileImg.png"
import { useState } from "react";

const Register = () => {
    const [image, setImage] = useState<any>(null);

    const handleFileChange = (e:any) => {
        const file = e.target.files[0];
        if (file) {
        setImage(URL.createObjectURL(file));
        }
    };
  return (
    <div className='flex h-screen items-center justify-center w-screen' style={{ backgroundImage: `url(${wallpaper})` }}>
        <div className="card w-3xl bg-base-100 card-xl shadow-sm ">
            <div className="card-body p-5">
                <div className="absolute">
                    <a className="link link-accent text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 inline mr-1">
                          <path fillRule="evenodd" d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z" clipRule="evenodd" />
                        </svg>
                        Back to Sign in
                    </a>                
                </div>
                <div className="grid place-items-center text-center">
                    <img alt="lifelog_icon" src={icon} className="h-20 w-20" />
                    <h2 className="card-title">Create Account</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                        {/* <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo</legend>
                            <input type="file" className="file-input  w-full" />
                        </fieldset> */}
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
                                You can edit your profile picture or upload a new one (.JPG or .PNG)
                                </p>
                            </div>
                            </div>
                    </div>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Username</legend>
                            <input  type="text" className="input w-full" placeholder="Enter your name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input  type="text" className="input w-full" placeholder="Enter your email" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input  type="password" className="input w-full" placeholder="Enter your password" />
                        </fieldset>
                    </div>
                </div>
                {/* <div className="grid grid-cols-2 gap-3">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Birth Date</legend>
                        <input type="date" className="input  w-full" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo</legend>
                        <input type="file" className="file-input  w-full" />
                    </fieldset>
                </div> */}
                <div className="flex justify-around mt-4">
                    <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2">Register</button>
                </div>
            </div>
      </div>
  </div>
  )
}

export default Register
