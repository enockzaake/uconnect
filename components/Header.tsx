"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// @ts-ignore
import { Link as LinkScroll } from "react-scroll";
import ButtonOutline from "./ButtonOutline";
import Logo from "./Logo";
import { createClient } from "@/lib/supabase/client";

const Header = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
    }
    checkAuth();
  }, []);

  return (
    <header
      className={
        "fixed top-0 w-full z-30 bg-white transition-all " +
        (scrollActive ? " shadow-md pt-0" : " pt-4")
      }
    >
      <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-3">
        <div className="col-start-1 col-end-2 flex items-center">
          <Logo />
        </div>

        <ul className="hidden lg:flex col-start-4 col-end-8 text-black-500  items-center">
          <LinkScroll
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => {
              setActiveLink("about");
            }}
            className={
              "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
              (activeLink === "about"
                ? " text-red-500 animation-active "
                : " text-black-500 hover:text-red-500 a")
            }
          >
            About
          </LinkScroll>
          <LinkScroll
            activeClass="active"
            to="feature"
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => {
              setActiveLink("feature");
            }}
            className={
              "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
              (activeLink === "feature"
                ? " text-red-500 animation-active "
                : " text-black-500 hover:text-red-500 ")
            }
          >
            Feature
          </LinkScroll>
          <LinkScroll
            activeClass="active"
            to="pricing"
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => {
              setActiveLink("pricing");
            }}
            className={
              "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
              (activeLink === "pricing"
                ? " text-red-500 animation-active "
                : " text-black-500 hover:text-red-500 ")
            }
          >
            Pricing
          </LinkScroll>
          <LinkScroll
            activeClass="active"
            to="testimoni"
            spy={true}
            smooth={true}
            duration={1000}
            onSetActive={() => {
              setActiveLink("testimoni");
            }}
            className={
              "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
              (activeLink === "testimoni"
                ? " text-red-500 animation-active "
                : " text-black-500 hover:text-red-500 ")
            }
          >
            Testimonial
          </LinkScroll>
        </ul>

        <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="text-black mx-2 sm:mx-4 border border-3 p-1 rounded capitalize tracking-wide hover:text-red-500 transition-all"
            >
              Dashboard
            </Link>
          ) : (
            <div className="">
              <Link
                href="/login"
                className="text-black mx-2 sm:mx-4 capitalize tracking-wide hover:text-red-500 transition-all"
              >
                LogIn
              </Link>

              <Link href="/sign-up">
                <ButtonOutline>Sign Up</ButtonOutline>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
