"use client"
import { AiOutlineMenu } from 'react-icons/ai'
import { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])
    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div onClick={() => { }} className='hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100'>
                    Airbnb Your Home
                </div>
                <div onClick={toggleOpen} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full hover:shadow-md transition cursor-pointer'>
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar />
                    </div>
                </div>
            </div>
            {
                isOpen && (
                    <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                        <div className='flex flex-col cursor-pointer '>
                            <>
                                <MenuItem onClick={()=>{}} label='Login' />
                                <MenuItem onClick={()=>{}} label='Sing Up' />
                            </>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UserMenu