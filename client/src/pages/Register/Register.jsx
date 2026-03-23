import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorAlert from "../../Components/ErrorAlert";

// import { useNavigate } from "react-router";
import { validateRegisterSchema } from "../../Utils/formValidation";
import { useAuth } from "../../store";
import { Link } from "react-router";

export default function SignUp() {
 
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
   
     formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateRegisterSchema),
  });
  
   const { setAccessToken } = useAuth(); 
 
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };


  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
    
      toast.success(response?.data?.message || "Registration successful");
     
      setAccessToken(response?.data?.data?.accessToken);
      
    },
    onError: (error) => {
     import.meta.env.DEV && console.log(error);
      
      setError(error?.response?.data?.message || "Registration Failed");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data); 
     console.log(data); 
  };


  return (
    <>
      <div className=" flex items-center justify-center min-h-[93vh] gap-2  w-full md:max-w-[350px] mx-auto ">
        <form
          action=""
          className="mt-20 max-w-[400px]"
         onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="fieldset bg-white border-base-300 rounded-xl shadow-lg w-[22rem] md:w-sm border p-5  ">
            <div className="flex flex-col items-center gap-2">
             
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-gray-600 text-[1.05rem] mb-3">
                Enter your details to sign up
              </p>
              {error && <ErrorAlert error={error} />}
            </div>
            <label className="label font-bold  text-black ">Full name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Full name"
              {...register("fullname")}
              id="fullname"
            />
            {errors.fullname && (
              <p className="text-red-500">{errors.fullname.message}</p>
            )}

            <label className="label font-bold  text-black ">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email")}
              id="email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <label className="label font-bold text-black ">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input w-full"
                placeholder="Password"
                {...register("password")}
                id="password"
              />
              <button
                type="button"
                className="absolute top-1/4 right-3  cursor-pointer semi-bold"
                onClick={togglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <button
              className="btn bg-[#2B7FFF] hover:bg-[#1E5FCC] mt-4 text-white"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending
                ? "Creating Account..."
                : "Create Account"} 
            </button>
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
             <Link  className="text-blue-500 font-bold" to="/login">Login</Link>
                
              
            </p>
          </fieldset>
        </form>
      </div>

      {/* w-xs */}
    </>
  );
}
