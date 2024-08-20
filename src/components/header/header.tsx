'use client'
import Link from 'next/link';
import Image from 'next/image';
import classes from './header.module.css';
// import logoImg from '../../../public/images/logo3.png';
import MainHeaderBackground from './main-header-background';
import { usePathname } from 'next/navigation';
import NavLink from './nav-link';

const MainHeader: React.FC = () => {
  const path = usePathname();
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image  height={30} width={80}  src="https://foodapp-images.s3.us-east-2.amazonaws.com/logo3.png" alt="A plate with food" />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink  href="/community"> Food Community</NavLink>
            </li>
             
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
