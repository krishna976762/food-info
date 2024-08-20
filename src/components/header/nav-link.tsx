'use client';
import Link from 'next/link';
import classes from './nav-link.module.css'
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link href={href} className={path.startsWith(href) ? `${classes.link} ${classes.active}` : "classes.link"}>
  
        {children}
  
    </Link>
  );
};

export default NavLink;
