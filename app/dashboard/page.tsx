'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

function DashboardPage() {
  return (
    <section className='h-[calc(100vh-7rem)] flex flex-col justify-center items-center'>
        <h1 className='text-white text-5xl'>Dashboard</h1>

        <button onClick={()=>signOut()} className='bg-white text-black px-4 py-2 rounded-md mt-4'>Logout</button>
    </section>
  )
}

export default DashboardPage