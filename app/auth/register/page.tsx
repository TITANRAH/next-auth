"use client";

import { createUser } from "@/app/actions/createUser";
import { useRouter } from "next/navigation";
import React from "react";
import { Resolver, useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// const resolver: Resolver<FormValues> = async (values) => {
//     return {
//         values: values.username ? values : {},
//     }
// }

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password != data.confirmPassword) {
      return alert("Contraseñas no coinciden");
    }
    const res = await createUser(data);
    console.log("res", res.ok);
    // recibo ok o el objeto delusuuario

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username
        </label>
        <input
          type="text"
          {...register("username", {
            required: { value: true, message: "No puede ir vacío" },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="Username123"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email
        </label>

        <input
          type="email"
          {...register("email", { required: true })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="aaa@aaa.com"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password
        </label>

        <input
          type="password"
          {...register("password", { required: true })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="123456"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password
        </label>

        <input
          type="confirmPassword"
          {...register("confirmPassword", { required: true })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="123456"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        <button className="w-full mt-2 bg-blue-500 text-white p-3 rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
