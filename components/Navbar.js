'use client';

import React from 'react';

const NavbarLink = ({ children, href }) => {
    return (
        <>
            <a className='mx-3' href={href}>
                <li className='flex flex-col text-lg p-2 py-4 text-white gap-2 items-center'>
                    {children}
                    {/* <span className='bg-gray-400 h-px w-full'></span> */}
                </li>
            </a>
        </>
    );
}

const Navbar = () => {

    const handleHamburgerClick = (event) => {
        document.querySelector('.hamburger').classList.toggle('active');
        const navbarLinks = document.querySelector('.navbar-links');

        if (navbarLinks.style.maxHeight === '' || navbarLinks.style.maxHeight === '0px') {
            navbarLinks.style.maxHeight = navbarLinks.scrollHeight + 'px';
        } else {
            navbarLinks.style.maxHeight = '0px';
        }
    };

    return (
        <>
            <nav className='z-10 relative w-screen bg-purple h-[80px] flex items-center px-4 gap-2 justify-between'>
                <div>
                    <a href="/">
                        <img className='w-[90px]' src='/img/logo.png' />
                    </a>
                </div>
                <div className='flex items-center gap-3'>
                    <div className="bg-white/20 h-[50px] w-px"></div>
                    <div onClick={(event) => handleHamburgerClick(event)} className="block xl:hidden w-7 h-7 hamburger">
                        <span></span>
                    </div>
                </div>
                <div className='navbar-links absolute left-0 border-t border-gray-400 max-h-0 top-[80px] w-screen bg-purple duration-300 overflow-hidden'>
                    <div className='w-2/3 mx-auto'>
                        <ul className='flex flex-col pb-5'>
                            <NavbarLink href='/'>Points</NavbarLink>
                            <span className='bg-gray-400 h-px w-full'></span>
                            <NavbarLink href="/team">Team</NavbarLink>
                            <span className='bg-gray-400 h-px w-full'></span>
                            <NavbarLink href="/standings">Standings</NavbarLink>
                            <span className='bg-gray-400 h-px w-full'></span>
                            <NavbarLink href='/matches'>Matches</NavbarLink>
                            <span className='bg-gray-400 h-px w-full'></span>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar