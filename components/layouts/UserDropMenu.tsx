"use client"
import { User } from '@/lib/types';
import React from 'react'
import {
    ArrowBigDown,
  ChevronDown,
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import  {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from '@/app/(auth)/logout/actions';

type Props = {
  user: User | null;
};


const UserDropMenu = ({ user }: Props) => {
    const userInitial = user?.firstName?.[0]?.toUpperCase() || "";
  return (
    <div className='h-8 w-full cursor-pointer text-center rounded-full flex items-center justify-center'>
        
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
            <Button
            variant="outline"
            className='h-8 w-8 rounded-full border-blue-600 bg-blue-500 text-white transition-colors hover:bg-blue-600 hover:text-white data-[state=open]:bg-blue-700 data-[state=open]:text-white'
            >
            {userInitial ? userInitial: <UserIcon/> }
             
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant="destructive">
          <form action={logoutAction}>
            <button type="submit" className="flex w-full items-center gap-2 text-left">
              <LogOutIcon />
              Log out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}

export default UserDropMenu