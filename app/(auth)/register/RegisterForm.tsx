"use client"
import { Luggage } from 'lucide-react'
import React, { useActionState, useEffect } from 'react'
import { registerAction } from './actions'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

const RegisterForm = () => {
    const router = useRouter()
   const [state, formAction, isPending] = useActionState(registerAction, {
           error: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            serverError:''
        },
        success: false,
    })

    useEffect(() => {
            if (state.success) {
                toast.success("Register Successful!", { id: "register-success" })
                router.push("/login")
            }
    }, [state.success, router])
  return (
    <div className='h-full w-full flex items-center justify-center'>
        
        <form action={formAction} className='border-2 sm:w-1/3 sm:min-h-1/2 border-gray-300 p-5 rounded-2xl flex flex-col gap-3'>
            <div className="w-full flex flex-col items-center gap-3 p-3 rounded-2xl">
                <div className='h-8 w-8 flex items-center shrink-0 justify-center bg-linear-to-r from-blue-500 to-purple-500 rounded-lg'>
                    <Luggage className='h-6 w-6 text-white shrink-0' size={40}/>
                    </div>
                <p className="text-blue-500 font-bold font-sans">
                Traveler Nodes
                </p>
            </div>
             <div className='flex flex-col gap-2'> 
                <label>First Name</label>       
                <input suppressHydrationWarning name='firstName' placeholder='Enter First name' className='border rounded-2xl p-2 pl-3 '></input>
                {state.error.firstName && <div className='text-sm text-red-600'>{state.error.firstName}</div>}
            </div>
             <div className='flex flex-col gap-2'> 
                <label>Last Name</label>       
                <input suppressHydrationWarning name='lastName' placeholder='Enter Last name' className='border rounded-2xl p-2 pl-3 '></input>
                {state.error.lastName && <div className='text-sm text-red-600'>{state.error.lastName}</div>}
            </div>
            <div className='flex flex-col gap-2'> 
                <label>Email</label>       
                <input suppressHydrationWarning name='email' placeholder='Enter username' className='border rounded-2xl p-2 pl-3 '></input>
                {state.error.email && <div className='text-sm text-red-600'>{state.error.email}</div>}
            </div>
             <div className='flex flex-col gap-2 mb-2'> 
                <label>Password</label>       
                <input suppressHydrationWarning type='password' name='password' placeholder='Enter password' className='border rounded-2xl pl-3 p-2'></input>
                {state.error.password && <div className='text-sm text-red-600'>{state.error.password}</div>}
            </div>
           {state.error.serverError && <div className='text-lg text-red-600 text-center'>{state.error.serverError}</div>}
            <Button disabled={isPending} variant='outline' type='submit' className='bg-blue-500 text-white transition-colors hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-700 data-[state=open]:text-white'>
                {isPending ? 'Processing...' : 'Register'}
            </Button>
            <p className='p-3 text-sm text-center'>Already a user? please login <Link className='text-blue-500' href='/register'>here</Link> </p>
        </form>
    </div>
  )
}

export default RegisterForm