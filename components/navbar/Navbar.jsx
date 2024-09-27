"use client"
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

const Navbar = () => {
  return (
    <div className='z-10 bg-white shadow-sm fixed-w-full'>
        <div className='py-4 border-b-[1px] '>
            <Container />
            <div className='flex flex-row items-center justify-between gap-3 px-2 md:px-8 md:gap-0'>
              <Logo />
              <Search />
              <UserMenu />
            </div>
        </div>
    </div>
  )
}

export default Navbar  