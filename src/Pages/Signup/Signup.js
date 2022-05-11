import React from 'react';
import auth from "../../firebase.init";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link } from "react-router-dom";

const Signup = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error] =
      useCreateUserWithEmailAndPassword(auth);
  
    let signInError;
  
    if ( loading || gLoading) {
      return <Loading></Loading>;
    }
  
    if (error || gError) {
      signInError = <p className="text-red-500">{error?.message || gError?.message}</p>;
    }
  
    if (gUser) {
      console.log(user);
    }
    const onSubmit = (data) => {
      console.log(data);
      createUserWithEmailAndPassword(data.email, data.password);
    };


    return (
      <div className="flex h-screen justify-center items-center ">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">SingUp</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  class="input input-bordered w-full max-w-xs"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label class="label">
                  {errors.name?.type === "required" && (
                    <span class="label-text-alt text-red-500">{errors.name.message}</span>
                  )}
                </label>
              </div>

              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  class="input input-bordered w-full max-w-xs"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is Required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Provide a valid Email",
                    },
                  })}
                />
                <label class="label">
                  {errors.email?.type === "required" && (
                    <span class="label-text-alt text-red-500">{errors.email.message}</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span class="label-text-alt text-red-500">{errors.email.message}</span>
                  )}
                </label>
              </div>

              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Your Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  class="input input-bordered w-full max-w-xs"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is Required",
                    },
                    minLength: {
                      value: 6,
                      message: "Must be 6 Characters or longer",
                    },
                  })}
                />
                <label class="label">
                  {errors.password?.type === "required" && (
                    <span class="label-text-alt text-red-500">{errors.password.message}</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span class="label-text-alt text-red-500">{errors.password.message}</span>
                  )}
                </label>
              </div>
              {signInError}
              <input
                className="btn w-full max-w-xs text-white"
                type="submit"
                value="Sign Up"
              />
            </form>
            <small>
              {" "}
              <p>
                Already have an account?{" "}
                <Link className="text-primary " to="/login">
                  Please Login
                </Link>
              </p>
            </small>
            <div className="divider">OR</div>
            <button onClick={() => signInWithGoogle()} className="btn btn-outline">
              Continue With Google
            </button>
          </div>
        </div>
      </div>
    );
};

export default Signup;