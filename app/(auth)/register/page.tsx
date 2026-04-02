import React from 'react'
import RegisterForm from './RegisterForm'
import { getAuthUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Register = async() => {
    const user = await getAuthUser()
    if(user){
        redirect('/')
    }
  return (
    <RegisterForm/>
  )
}

export default Register