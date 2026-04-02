import React from 'react'
import UploadForm from './UploadForm'
import { getAuthUser } from '@/lib/auth'
import { redirect } from 'next/navigation'


const Upload =async () => {
    const user = await getAuthUser()
        if(user){
            redirect('/')
        }
  return (
   <UploadForm/>
  )
}

export default Upload