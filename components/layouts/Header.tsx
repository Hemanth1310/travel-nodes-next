import React from 'react'
import Link from 'next/link'
import { User } from '@/lib/types'
import SearchBar from './SearchBar'
import UserDropMenu from './UserDropMenu';

type HeaderProps = {
  user: User | null;
};

const Header = ({ user }: HeaderProps) => {
  
  return (
    <div className='fixed left-22 right-0 top-0 h-16 p-3 flex items-center gap-4 bg-mist-50'>
        <div className='container w-full h-full flex items-center justify-between gap-4'>
          <div className='w-full h-full'>
            <SearchBar/>
          </div>
          <div className='w-15 flex items-center'>
            {!user?<Link className='text-sm p-2 border rounded-2xl hover:border-blue-500 hover:text-blue-500' href='/login'>Login
            </Link>:<UserDropMenu user={user}/>}
          </div>
        </div>
    </div>
  )
}

export default Header