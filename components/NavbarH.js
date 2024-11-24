"use client"

import Link from "next/link"
import Image from 'next/image'
import { useState,useEffect } from 'react'
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'


const Navbar = ( ) => {
  const { data: session } = useSession();

  const [ providers,setProviders ]= useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(()=>{
    const setUpProviders = async () => {
      const response = await getProviders();
      
      setProviders(response)
    }

    setUpProviders();

  }, [])
  return (
    <div className=" flex flex-row items-center justify-between w-full text-6xl text-white font-jaldi ">
          <div className="ml-10 sm:ml-0 flex flex-row justify-start items-start">
            <img
              className="h-[40px] object-cover mx-10"
              alt=""
              src="/logo1@2x.png"
            />
          </div>
          
          <div className="flex flex-row items-center gap-[30px] px-[30px] mr-10 sm:mr-0 text-[18px]">

              {/* Desktop Navigation */}
            
              <Link href="/"
                className='relative tracking-wide md:hidden text-white no-underline '>
                HOME
              </Link>

              <Link href="/find-pets"
                className='relative tracking-wide md:hidden text-white no-underline'>
                SEARCH PETS
              </Link>

              <Link href="/create-adoption"
                  className='relative tracking-wide md:hidden text-white no-underline'>
                  CREATE ADOPTION LISTING
              </Link>

              {session?.user ?(
                <>
                
                <a type="button"
                  className='relative tracking-wide md:hidden text-white no-underline hover:cursor-pointer'
                  onClick={signOut}
                >
                  SIGN OUT
                </a>

                <Link href={`/profile/${session?.user.id}`}>
                  <Image 
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className="rounded-full md:hidden"
                    alt="profile"
                  />
                </Link>
                </>
                
                
              ):(
                <>
                {providers && 
                  Object.values(providers).map( (provider) => (
                    <a
                      type='button'
                      className=" md:hidden"
                      key={provider.name}
                      onClick={ () => signIn(provider.id) }                    >
                      SIGN IN
                    </a>
                  ))
                }
                </>
              )}
            
            

            {/* Mobile Navigation */}

            <div className="lg:hidden  md:flex relative">
              {session?.user ? (
                  <div className='flex z-10'>
                    <Image //dropdown
                      src={session?.user.image}
                      width={37}
                      height={37}
                      className="rounded-full hover:cursor-pointer"
                      alt="profile"
                      onClick={()=>setToggleDropdown(prev => !prev)}
                    />
                    { toggleDropdown && (
                      <div className='dropdown text-darkslategray text-sm'>
                        
                        <Link href="/"
                          className=' tracking-wide no-underline'>
                          HOME
                        </Link>

                        <Link href="/find-pets"
                          className=' tracking-wide no-underline'>
                          SEARCH PETS
                        </Link>

                        <Link href="/create-adoption"
                          className=' tracking-wide no-underline'>
                          CREATE ADOPTION LISTING
                        </Link>
                        <Link href={`/profile/${session?.user.id}`}
                          className=' tracking-wide no-underline'
                        >
                          VIEW PROFILE


                        </Link>

                        <a 
                          type='button'
                          onClick={() => {
                            setToggleDropdown(false);
                            signOut();
                          }}
                          className="tracking-wide no-underline hover:cursor-pointer"
                        >
                          SIGN OUT
                        </a>
                      </div>
                    )}
                  </div>
                ):(
                  <div className='flex z-10'>
                    <Image //dropdown
                      src="/notification.svg"
                      width={24}
                      height={24}
                      alt="profile"
                      className="hover:cursor-pointer"
                      onClick={()=>setToggleDropdown(prev => !prev)}
                    />
                    
                    { toggleDropdown && (
                      <div className='dropdown text-darkslategray text-sm'>
                        
                        <Link href="/"
                          className=' tracking-wide no-underline'>
                          HOME
                        </Link>

                        <Link href="/find-pets"
                          className=' tracking-wide no-underline'>
                          SEARCH PETS
                        </Link>

                        <Link href="/create-adoption"
                          className=' tracking-wide no-underline'>
                          CREATE ADOPTION LISTING
                        </Link>

                        {providers && 
                          Object.values(providers).map( (provider) => (
                            <a
                              type='button'
                              key={provider.name}
                              onClick={ () => signIn(provider.id) }
                              className="hover:cursor-pointer tracking-wide"
                            >
                              SIGN IN
                            </a>
                          ))
                        }
                      </div>
                    )}
                  </div>
                    

                    
                  
              )}
              
            </div>
            
          </div>
      </div>
  )
}

export default Navbar
