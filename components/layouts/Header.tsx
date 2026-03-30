import React from 'react'
import {Luggage} from 'lucide-react'
import Link from 'next/link'
import { User } from '@/lib/types'
type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
  
  return (
    <div className='w-full h-16 shadow-md flex items-center justify-center'>
        <div className='container w-full h-full flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-500 rounded-lg'>
              <Luggage className='h-6 w-6 text-white' />
            </div>
            <span className='text-xl font-bold text-blue-500 font-mono'>Traveler Node</span>
          </div>
          <div >
            {!user?<Link className='text-lg ' href='/login'>Login
            </Link>:<div className='h-8 w-8 cursor-pointer text-center rounded-full bg-blue-500 flex items-center justify-center'>
              <span className='text-lg text-white'>H</span>
              </div>}
          </div>
        </div>
    </div>
  )
}

export default Header