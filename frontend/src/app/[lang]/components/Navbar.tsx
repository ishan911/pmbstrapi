"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from "react";
import HeaderBottomMenu from "@/app/[lang]/components/header/HeaderBottomMenu";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink ) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  }
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-900 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

const HeaderTopMenu = () => {
  return (
      <div className="main-header__menu-box-top">
        <ul className="list-unstyled main-header__contact-list">
          <li>
            <div className="icon">
              <i className="icon-email"></i>
            </div>
            <div className="text">
              <p><a href="mailto:support@pmb.gov.lk">support@pmb.gov.lk</a></p>
            </div>
          </li>
          <li>
            <div className="icon">
              <i className="icon-pin"></i>
            </div>
            <div className="text">
              <p>6th Floor, Sir Chittampalam A. Gardiner Mw,
                Colombo 02</p>
            </div>
          </li>
        </ul>
        <div className="main-header__social">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-pinterest-p"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
  )
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  if(1 < 2){
    return <header className="main-header">
      <div className="main-header__wrapper">
        <div className="main-header__wrapper-inner">
          <div className="main-header__logo">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
          </div>
          <div className="main-header__menu-box">
            <HeaderTopMenu/>
            <HeaderBottomMenu/>
          </div>
          <div className="main-header__phone-contact-box">
            <div className="main-header__phone-number">
              <a href="tel:9200886823">+92 (0088) 6823</a>
            </div>
            <div className="main-header__call-box">
              <div className="main-header__call-inner">
                <div className="main-header__call-icon">
                  <span className="fas fa-phone"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  }

  return (
    <div className="p-4 ">
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
        </Logo>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          <ul className="items-stretch hidden space-x-3 lg:flex">
            {links.map((item: NavLink) => (
              <NavLink key={item.id} {...item} />
            ))}
          </ul>
        </div>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Strapi</span>
                {logoUrl &&
                <img
                  className="h-8 w-auto"
                  src={logoUrl}
                  alt=""
                />
                }
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200/10">
                <div className="space-y-2 py-6">
                {links.map((item) => (
                    <MobileNavLink
                      key={item.id}
                      closeMenu={closeMenu}
                      {...item} />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
          </Dialog>
        <button
        className="p-4 lg:hidden"
        onClick={() => setMobileMenuOpen(true)} >
          <Bars3Icon className="h-7 w-7 text-gray-100" aria-hidden="true"/>
        </button>
      </div>
    </div>
  );
}
