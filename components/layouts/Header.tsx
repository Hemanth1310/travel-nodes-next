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
          <div >
            {false?<Link className='text-lg ' href='/login'>Login
            </Link>:<UserDropMenu user={user}/>}
          </div>
        </div>
    </div>
  )
}

export default Header