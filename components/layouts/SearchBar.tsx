"use client"
import React, { useEffect, useState, useRef } from 'react'

const SearchBar = () => {
    const [inputVal, setInputVal] = useState("")
    const [isOpen, setIsOpen] = useState(false) 
    const divRef = useRef<HTMLDivElement | null>(null)

   
    useEffect(()=>{
        const timeoutId = setTimeout(()=>{
            if(inputVal.length>=3){
                setIsOpen(true)
            }
            
        },300)

        return ()=>clearTimeout(timeoutId)
    },[inputVal])

    useEffect(()=>{

          const handleMouseDown =(e: MouseEvent)=>{
                if (divRef.current && !divRef.current.contains(e.target as Node)) {
                    setIsOpen(false)
                }
            }
        window.addEventListener("mousedown",handleMouseDown)
    return () => window.removeEventListener('mousedown', handleMouseDown)

    },[])

   
  return (
    <div ref={divRef} className='h-full w-full rounded-2xl flex bg-mist-200 relative'>
        <input suppressHydrationWarning className='ml-5 w-full text-lg outline-none focus:outline-none bg-transparent' type='text' value={inputVal} onChange={(e)=>setInputVal(e.target.value)}></input>
        {isOpen &&   <div className='absolute min-h-10 top-11 w-full bg-mist-100 rounded-2xl p-5 text-xl'>
            kfel
        </div>}
      
    </div>
  )
}

export default SearchBar