import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
export default function HeaderFlix() {
  let { user } = useSelector(state => state.userSlice);
  console.log('user: ', user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // todo: handle click for open mobile menu
  const handleOpenMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  // Log out
  let handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.reload();
  }


  let renderMenu = () => {
    //CSS button
    let cssBtn = "px-5 py-2 rounded-lg border-2 border-white text-white bg-blue-500";
    let cssUserName = "px-5 py-2 rounded-lg border-2 border-sky-500 lg:bg-white lg:border-white lg:mb-3 lg:text-sm lg:text-center"

    // if already login 
    if (user) {
      return (
        <>
          <span className={cssUserName}><UserOutlined /> {user.hoTen}</span>
          <button className={cssBtn} onClick={handleLogout}>Sign Out</button>
        </>
      )
    }
    // not login yet
    else {
      return (
        <>
          <NavLink className={`${cssBtn} account__item`} to={"/register"}>
            <button>Sign Up</button>
          </NavLink>
          <NavLink className={`${cssBtn} account__item`} to={"/login"}>
            <button>Sign In</button>
          </NavLink>
        </>
      )
    }
  }

  return (
    <div className='headerFlix h-20'>
      <div className='headerFlix__content h-20 flex justify-between items-center px-4 shadow-xl fixed z-10 bg-white w-full'>
        <NavLink to={"/"} className='text-3xl font-bold text-blue-500'>CyberFlix</NavLink>
        <div className='headerFlix__menu lg:hidden'>
          <a href='#lichChieu' className='menu__item mx-4'>Showtime</a>
          <a href='#cumRap' className='menu__item mx-4'>Theaters</a>
          <a href='#' className='menu__item mx-4'>News</a>
          <a href='#' className='menu__item mx-4'>Applications</a>
        </div>
        <div className='space-x-3 lg:hidden'>{renderMenu()}</div>


        {/* Button bars for mobile phone & tablets screen */}
        <div className='headerHome__bars lg:block hidden' onClick={handleOpenMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </svg>
        </div>
        {/* Mobile menu */}
        <div className={`showMobileMenu absolute top-0 left-0 ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div id='mobile-menu'>
            <div className='headerFlix__account ml-6 mr-9 my-4'>
              {renderMenu()}
            </div>
            <hr />
            <div className='headerFlix__menu flex flex-col ml-6 my-4'>
              <a href='#lichChieu' className='menu__item my-4'>Showtime</a>
              <a href='#cumRap' className='menu__item my-4'>Theaters</a>
              <a href='#' className='menu__item my-4'>News</a>
              <a href='#' className='menu__item my-4'>Applications</a>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
