import React from 'react'
import logo from '../../../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from './../../../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons"
import ProfileDropdown from "../../Auth/ProfileDropdown"
import Button from '../Button';
import { useState } from 'react-router-dom';
import { categories } from '../../../../services/apis';
import { IoIosArrowDropdownCircle } from 'react-icons'


const subLinks = [
  {
    title: "python",
    link: "catalog/python"
  },
  {
    title: "web dev",
    link: "/catalog/web-development"
  },
]

const Navbar = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing sublinks results", result);
      setSubLinks(result.data.data);
    } catch (error) {
      console.log("could not fetch the category list, please wait for sometime")
    }
  }

  useEffect(() => {
    fetchSublinks
  }, [])




  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to={"/"}>
          <img src={logo} width={160} height={42} loading='lazy' />
        </Link>

        {/* nav links */}
        <nav>
          <ul className='flex gap-x-6 text-richblue-25'>
            {
              NavbarLinks.map((link, index) => (
                <li key={index}>
                  {
                    link.title === "Catalog" ? (
                      <div className=" relative flex items-center gap-2 group">
                        <p>{link.title}</p>
                        <IoIosArrowDropdownCircle />

                        <div className="invisible absolute left-[50%] top-[50%] 
                        translate-x-[-50%] translate-y-[-80%]
                        flex flex-col rounded-md bg-richblack-5 p-4
                         text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">

                          <div className="absolute left-[50%] top-0
                        translate-x-[80%] translate-y-[-45%]
                        h-6 w-6 rotate-45 rounded bg-richblack-5 ">

                          </div>

                          {
                            subLinks.length ? (

                              subLinks.map((subLink, index) => {
                                <Link to={`${subLink.link}`} key={index}>
                                  <p>{subLink.title}</p>

                                </Link>
                              })

                            ) : (<div></div>)
                          }

                        </div>
                      </div>) : (
                      <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                          {link.title}
                        </p>

                      </Link>
                    )
                  }
                </li>
              ))
            }
          </ul>
        </nav>

        {/*  login/signup/Dashboard*/}
        <div className="flex gap-x-4 items-center">
          {
            user && user?.accountType != "Instructor" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart />
                {
                  totalItems > 0 && (
                    <span>
                      {totalItems}
                    </span>
                  )
                }
              </Link>
            )
          }

          {
            token === null && (
              <Link to="/Login">
                <Button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Login in
                </Button>

              </Link>
            )
          }
          {
            token === null && (
              <Link to="/signup">
                <Button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                  Sign Up
                </Button>
              </Link>
            )
          }
          {
            token != null && <ProfileDropdown />
          }
        </div>

      </div>
    </div>
  )
}

export default Navbar