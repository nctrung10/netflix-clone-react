import { useRef } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";

import { UserAuth } from "../store/auth-context";
import { MdArrowDropDown } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const navbarRef = useRef<HTMLDivElement>(null);

  const logoutHandler = () => {
    if (window.confirm('Do you want to log out?')) {
      logOut();
      navigate('/');
    }
  };

  const notUserButtons = (
    <>
      <Link to='login'>
        <button className="text-white pr-4">Sign In</button>
      </Link>
      <Link to='signup'>
        <button className="bg-red-600 text-white rounded px-6 py-2">Sign Up</button>
      </Link>
    </>
  );

  const userButtons = (
    <div className="flex items-center cursor-pointer group relative pl-3">
      <FaUser className="text-xl mr-2" />
      <MdArrowDropDown className="scale-150" />

      <div className="absolute top-8 right-0 w-[180px] rounded hidden group-hover:flex flex-col items-center 
        bg-black text-white/70 font-semibold text-sm">
        <span className="block absolute -top-3 w-full h-4" aria-hidden="true"></span>
        <Link to='browser/account'>
          <button className="py-4">
            <p className="text-xs mb-1">{user?.email}</p>
            My list
          </button>
        </Link>
        <button className="hover:text-red-500 py-4 w-full border-t" onClick={logoutHandler}>
          Sign out of Netflix
        </button>
      </div>
    </div>
  );

  // Detecing the direction of the scroll page
  window.onscroll = (e) => {
    if (window.scrollY > 180) {
      navbarRef.current?.classList.add('bg-black/90');
    } else {
      navbarRef.current?.classList.remove('bg-black/90');
    }
  };

  return (
    <div
      ref={navbarRef}
      className="flex items-center justify-between p-4 z-[100] w-full fixed top-0 left-0 bg-gradient-to-b from-black"
    >
      <a href={user?.email ? '/browser' : '/'}>
        <h1 className="text-[rgb(229,9,20)] text-4xl mr-5 font-bold cursor-pointer select-none">
          NETFLIX
        </h1>
      </a>
      {user?.email && (
        <div className="hidden sm:flex flex-grow items-center text-white">
          <NavLink
            to={user.email ? '/browser' : '/'}
            className={({ isActive }) => isActive ? 'font-bold' : ''}
            end
          >
            <span className="pr-4">Home</span>
          </NavLink>
          <NavLink
            to='browser/account'
            className={({ isActive }) => isActive ? 'font-bold' : ''}
          >
            <span className="pr-4">My List</span>
          </NavLink>
        </div>
      )}
      <div className="text-white">
        {user?.email ? userButtons : notUserButtons}
      </div>
    </div>
  );
};

export default NavBar;