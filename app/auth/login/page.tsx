"use client";

import {signIn} from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormValuesLogin = {
  email: string;
  password: string;
};

function LoginPage() {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesLogin>();

  const [error, setError] = useState('')

  const onSubmit = handleSubmit(async (data) => {
    console.log('data desde submit login',data.password)
    try {
      console.log('entro al try');
      
      const res =  await signIn('credentials', {  
        email: data.email,
        password: data.password,
        redirect: false
      })

      if(res!.error){
          // alert(res!.error)
          setError(res!.error === 'CredentialsSignin' ? 'Credenciales inválidas' : res!.error)
      } else {
        console.log('no hay error enviando a dashboard');
        router.push('/dashboard')
        
      }
  
      console.log('res login desde page', res);
    } catch (error) {
      console.log('error signin', error)
    }
   
    
  });
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">

        {
          error && (
            <p className="bg-red-500 text-lg text-white p-3 rounded-md mb-2">{error}</p>
          )
        }
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: { value: true, message: "El email es requerido" },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="user@email.com"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "El password es requerido" },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="*****"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <button className="w-full mt-2 bg-blue-500 text-white p-3 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
