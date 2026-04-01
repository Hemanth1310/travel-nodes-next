"use client"
import { Button } from '@/components/ui/button'
import { Luggage } from 'lucide-react'
import React, { useActionState, useEffect } from 'react'
import { loginAction } from './actions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

const Login = () => {
    const router = useRouter()
    const [state, formAction, isPending] = useActionState(loginAction, {
        error: null,
        success: false,
    })

    useEffect(() => {
            if (state.success) {
                toast.success("Login Successful!", { id: "login-success" })
                router.push("/")
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
                <label>UserName</label>       
                <input suppressHydrationWarning name='email' placeholder='Enter username' className='border rounded-2xl p-2'></input>
            </div>
             <div className='flex flex-col gap-2 mb-2'> 
                <label>Password</label>       
                <input suppressHydrationWarning type='password' name='password' placeholder='Enter password' className='border rounded-2xl p-2'></input>
            </div>
           {state.error && <div className='text-lg text-red-600 text-center'>{state.error}</div>}
            <Button disabled={isPending} variant='outline' type='submit' className='bg-blue-500 text-white transition-colors hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-700 data-[state=open]:text-white'>
                {isPending ? 'Logging in...' : 'Login'}
            </Button>
            <p className='p-3 text-sm text-center'>Not a user ? please register <Link className='text-blue-500' href='/register'>here</Link> </p>            
        </form>
    </div>
  )
}

export default Login