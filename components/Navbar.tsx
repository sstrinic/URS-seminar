"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";

export type Page = {
  href: string;
  title: string;
};

const pages: Page[] = [
  { href: "/login", title: "Log In" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="containerHeader font-semibold tracking-wider max-md:py-4">
        <Link href={"/"}>
          <h2 className="linerz text-white font-thin tracking-[2.96px] [text-shadow:0px_5px_4px_#000000bd]">
            Attendance app<span className="relative text-xs align-top">®</span>
          </h2>
        </Link>
        <div
          className={`self-end top-[19px] absolute ${styles.hamburgerBar} ${
            isOpen && styles.openHamburgerBar
          }`}
          onClick={toggleMenu}
        >
          <div className={`${styles.menuIconLine} ${isOpen ? styles.menuIconLineFirstX : styles.menuIconLineFirstXClose}`}></div>
          <div className={`${styles.menuIconLine} ${isOpen ? styles.menuIconLineSecondHidden : styles.menuIconLineSecond}`}></div>
          <div className={`${styles.menuIconLine} ${isOpen ? styles.menuIconLineThirdHidden : styles.menuIconLineThird}`}></div>
          <div className={`${styles.menuIconLine} ${isOpen ? styles.menuIconLineSecondX : styles.menuIconLineSecondXClose}`}></div>
        </div>
        <nav className={`md:block ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex gap-4 max-md:flex-col max-md:text-2xl max-lg:text-sm">
            {pages.map(({ href, title }) => (
              <li key={href}>
                <Link href={href} onClick={toggleMenu}>
                  <span
                    className={cn(
                      "py-[8px] px-[11px] rounded-lg text-white transition-all duration-300", 
                      {
                        "bg-[#2980b9] pointer-events-none": pathname === href,
                        "bg-[#1563B2] hover:bg-[#2980b9]": pathname !== href,
                      }
                    )}
                  >
                    {title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
