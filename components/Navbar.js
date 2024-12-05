'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname

const NavbarLink = ({ children, href, isActive, onClick }) => {
    return (
        <li className={`w-full ${isActive ? 'bg-white/10' : ''}`}>
            <a
                className='block py-4 px-6 text-white text-lg font-medium transition-colors duration-200 hover:bg-white/5'
                href={href}
                onClick={onClick}
            >
                {children}
            </a>
        </li>
    );
};

const Navbar = () => {
    const pathname = usePathname(); // Get the current pathname
    const [isOpen, setIsOpen] = useState(false);
    const navbarRef = useRef(null);

    const handleHamburgerClick = () => {
        setIsOpen(!isOpen);
        const navbarLinks = document.querySelector('.navbar-links');

        if (navbarLinks.style.maxHeight === '' || navbarLinks.style.maxHeight === '0px') {
            navbarLinks.style.maxHeight = navbarLinks.scrollHeight + 'px';
        } else {
            navbarLinks.style.maxHeight = '0px';
        }
    };

    const handleLinkClick = () => {
        setIsOpen(false);
        const navbarLinks = document.querySelector('.navbar-links');
        navbarLinks.style.maxHeight = '0px';
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsOpen(false); // Close the navbar if clicked outside
                const navbarLinks = document.querySelector('.navbar-links');
                navbarLinks.style.maxHeight = '0px';
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <nav ref={navbarRef} className='z-10 relative w-full bg-purple'>
            <div className='h-[80px] flex items-center px-4 justify-between'>
                <a href="/" onClick={handleLinkClick}>
                    <img className='w-[90px]' src='/img/logo.png' alt="Logo" />
                </a>
                <button
                    onClick={handleHamburgerClick}
                    className={`relative w-7 h-7 focus:outline-none ${isOpen ? 'hamburger-active' : ''}`}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
                    <span className="block absolute h-0.5 w-7 bg-white transition-all duration-300 ease-in-out transform origin-left-center"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: isOpen ? 'translateX(-50%) translateY(-50%) rotate(45deg)' : 'translateX(-50%) translateY(-8px)',
                        }}
                    ></span>
                    <span className="block absolute h-0.5 w-7 bg-white transition-all duration-300 ease-in-out"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                            opacity: isOpen ? 0 : 1,
                        }}
                    ></span>
                    <span className="block absolute h-0.5 w-7 bg-white transition-all duration-300 ease-in-out transform origin-left-center"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: isOpen ? 'translateX(-50%) translateY(-50%) rotate(-45deg)' : 'translateX(-50%) translateY(6px)',
                        }}
                    ></span>
                </button>
            </div>
            <div className='navbar-links absolute left-0 top-[80px] w-full bg-purple transition-all duration-300 overflow-hidden' style={{ maxHeight: '0px' }}>
                <div className="h-px bg-white/20 w-full" />
                <ul className='flex flex-col'>
                    <NavbarLink href='/' isActive={pathname === '/'} onClick={() => handleLinkClick()}>
                        Points
                    </NavbarLink>
                    <NavbarLink href='/team' isActive={pathname === '/team'} onClick={() => handleLinkClick()}>
                        Team
                    </NavbarLink>
                    <NavbarLink href='/standings' isActive={pathname === '/standings'} onClick={() => handleLinkClick()}>
                        Standings
                    </NavbarLink>
                    <NavbarLink href='/matches' isActive={pathname === '/matches'} onClick={() => handleLinkClick()}>
                        Matches
                    </NavbarLink>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
