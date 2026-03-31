import { User } from '@/lib/types';
import { ImageUp, LayoutDashboard, Luggage, Settings } from 'lucide-react';
import React from 'react'
type Props = {
    user: User | null;
}

const Sidebar = ({user}: Props) => {
  return (
    
    <div className="group w-22 hover:w-52 p-3 min-h-screen left-0 top-0 border-r border-r-mist-300 bg-mist-50 flex flex-col items-start gap-10 z-10 fixed transition-[width] duration-150 ease-in-out">
      <span className="w-full flex items-center justify-start gap-3 p-3 rounded-2xl hover:bg-mist-200">
        <div className='h-8 w-8 flex items-center shrink-0 justify-center bg-linear-to-r from-blue-500 to-purple-500 rounded-lg'>
              <Luggage className='h-6 w-6 text-white shrink-0' size={40}/>
            </div>
        <p className="whitespace-nowrap hidden text-blue-500 font-bold font-sans opacity-0 translate-x-2 transition-all duration-150 group-hover:block group-hover:opacity-200 group-hover:translate-x-0">
          Traveler Nodes
        </p>
      </span>
      <span className="w-full flex items-center justify-start gap-3 p-3 rounded-2xl hover:bg-mist-200">
        <LayoutDashboard className="shrink-0" size={32}  color="#353131"/>

        <p className="whitespace-nowrap hidden opacity-0 translate-x-2 transition-all duration-150 group-hover:block group-hover:opacity-200 group-hover:translate-x-0">
          Dashboard
        </p>
      </span>
      {1===1 && <>
      <span className="w-full flex items-center justify-start gap-3 p-3 rounded-2xl hover:bg-mist-200">
        <ImageUp
          className="shrink-0"
          size={32}
          color="#353131"
        />
        <p className="whitespace-nowrap hidden opacity-0 translate-x-2 transition-all duration-150 group-hover:block group-hover:opacity-200 group-hover:translate-x-0">
          Upload
        </p>
      </span>
      <span className="w-full flex items-center justify-start gap-3 p-3 rounded-2xl hover:bg-mist-200">
        <Settings
          className="shrink-0"
          size={32}
          color="#353131"
        />
        <p className="whitespace-nowrap hidden opacity-0 translate-x-2 transition-all duration-150 group-hover:block group-hover:opacity-200 group-hover:translate-x-0">
          Settings
        </p>
      </span>
      </>}
      
    </div>

  )
}

export default Sidebar