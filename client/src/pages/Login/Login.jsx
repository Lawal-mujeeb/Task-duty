import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateLoginSchema } from "../../Utils/formValidation";
import ErrorAlert from "../../Components/ErrorAlert";
import { loginUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Link, useNavigate} from "react-router";
import { useAuth } from "../../store";


export default function Login() {
 
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError  ] = useState(null);

  const {
    register,
    handleSubmit,
     
     formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateLoginSchema),
  });

  const { setAccessToken, setUser } = useAuth(); 
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: loginUser,
  onSuccess: (response) => {
  toast.success(response?.data?.message || "Login successful");

  
  setAccessToken(response?.data?.data?.accessToken);
  setUser(response?.data?.data?.user); 

  
  navigate("/");
},

    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Login Failed");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data);
     console.log(data);
  };

  return (
    <>
      <div className=" flex items-center justify-center min-h-[93vh] gap-2 ">
        
                    <form action="" className="mt-20  "onSubmit={handleSubmit(onSubmit)} >
          <fieldset className="fieldset bg-white border-base-300 rounded-xl shadow-lg w-[22rem] md:w-sm border p-5  ">
            <div className="flex flex-col items-center gap-2">
             
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-600 text-[0.99rem] text-center mb-3">
                Glad to see you again. Log in to your account.
              </p>
            </div>
            {error && <ErrorAlert error={error} />}
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
                className="absolute top-1/4 right-3"
                onClick={togglePassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            {/* <a
              className="text-blue-500 font-bold text-sm"
              href="/account/forgot-password"
            >
              Forgot Password?
            </a> */}
            <button
              className="btn bg-[#2B7FFF] hover:bg-[#1E5FCC] mt-4 text-white"
              disabled={isSubmitting || mutation.isPending}
            >
              {isSubmitting || mutation.isPending ? "Signing in..." : "Sign in"} 
            </button>
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?{" "}
             
              <Link className="text-blue-500 font-bold" to="/register">
                Sign Up
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </>
  );
}
