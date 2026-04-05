"use client";

import React from "react";
import LOCAL_DATA from "@/conststants/localData";
import { ButtonDemo } from "@/components/index.js";
import { NavigationMenuDemo } from "./NavigationMenuDemo";
import { SidebarNavigationMenuDemo } from "./SidebarNavigationMenuDemo";
import { useProductStore } from "@/modules/products/products";
import Link from "next/link";

const { logo } = LOCAL_DATA.images;
const { shopIcon } = LOCAL_DATA.svgs;

export const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Shop", href: "/shop" },
];

// export const dropdownLinksModules: { title: string; href: string; description: string }[] = [
//   {
//     title: "item 1",
//     href: "/modules/item-1",
//     description: "",
//   },
//   {
//     title: "item 2",
//     href: "/modules/item-2",
//     description: "",
//   },
//   {
//     title: "item 3",
//     href: "/modules/item-3",
//     description: "",
//   },
// ];

export default function Navbar() {
     const products = useProductStore((s) => s.products)
  return (
    <nav className="navbar fixed top-0 w-[100vw] bg-white z-3 shadow pr-[10px]">
      <div className="container  py-3 flex items-center justify-between ">
        <a href="/">
          <img src={logo} alt="" className="max-w-[50px] h-auto " />
        </a>

        <NavigationMenuDemo />

        <SidebarNavigationMenuDemo />

        <div className="btn-group  gap-2 hidden lg:flex">
          <Link href="/cart">
            <ButtonDemo className="rounded-full relative [&>svg]:!w-[25px] [&>svg]:!h-[25px]" variant={"ghost"} size="icon" icon={shopIcon}>
              <div className="badge absolute text-xs top-0 right-0 bg-green-700 rounded-full flex items-center justify-center w-[16px] h-[16px] text-white">
                {products.filter((product) => product.isInCart).length || "0"}
              </div>
            </ButtonDemo>
          </Link>
        </div>
      </div>
    </nav>
  );
}
