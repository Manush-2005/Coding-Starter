"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { useUser } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/clerk-react";

import { ICONS } from "../assets/icons/icons";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    // icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    // icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    // icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    // icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    // icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: ICONS.CIRCLE_PLAY },
  { name: "Contact sales", href: "#", icon: ICONS.PHONE },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  return (
    <header className="bg-white border-b-2 border-hr">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 mx-auto lg:px-8"
      >
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <ICONS.BARS aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="w-auto h-8"
            />
          </Link>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center font-semibold text-black border-none outline-none hover:text-helper gap-x-1 text-sm/6">
              Find Talent
              <ICONS.ARROW_DOWN
                aria-hidden="true"
                className="flex-none text-gray-400 size-5"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute z-10 w-screen max-w-md mt-3 overflow-hidden transition bg-white shadow-lg top-full -left-8 rounded-3xl ring-1 ring-gray-900/5 data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="relative flex items-center p-4 rounded-lg group gap-x-6 text-sm/6 hover:bg-bg"
                  >
                    {/* <div className="flex items-center justify-center flex-none rounded-lg size-11 bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="text-gray-600 size-6 group-hover:text-indigo-600"
                      />
                    </div> */}
                    <div className="flex-auto">
                      <Link
                        to={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="flex-none text-gray-400 size-5"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <Popover className="relative">
            <PopoverButton className="flex items-center font-semibold text-black border-none outline-none gap-x-1 text-sm/6 hover:text-helper">
              Find Work
              <ICONS.ARROW_DOWN
                aria-hidden="true"
                className="flex-none text-gray-400 size-5"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute z-10 w-screen max-w-md mt-3 overflow-hidden transition bg-white shadow-lg top-full -left-8 rounded-3xl ring-1 ring-gray-900/5 data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="relative flex items-center p-4 rounded-lg group gap-x-6 text-sm/6 hover:bg-bg"
                  >
                    {/* <div className="flex items-center justify-center flex-none rounded-lg size-11 bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="text-gray-600 size-6 group-hover:text-indigo-600"
                      />
                    </div> */}
                    <div className="flex-auto">
                      <Link
                        to={item.href}
                        className="block font-semibold text-gray-900"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="flex-none text-gray-400 size-5"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          {/* 
          <Link
            to="/"
            className="font-semibold text-black text-sm/6 hover:text-helper"
          >
            Why Upork
          </Link> */}
          <Link
            to="/"
            className="font-semibold text-black text-sm/6 hover:text-helper"
          >
            What's new
          </Link>
        </PopoverGroup>
        <div className="items-center block gap-5 lg:flex lg:flex-1 lg:justify-end">
          {isSignedIn ? (
            <>
              <Menu as="div" className="relative">
                <div>
                  <MenuButton className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user.hasImage
                            ? user.imageUrl
                            : "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
                      <AvatarFallback>USER</AvatarFallback>
                    </Avatar>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in cursor-pointer"
                >
                  <MenuItem>
                    <div className="data-[focus]:bg-gray-100 data-[focus]:outline-none">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-text data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Hello, <br />
                        {user?.fullName}
                      </Link>
                      <hr />
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="text-text data-[focus]:bg-gray-100 data-[focus]:outline-none flex items-center justify-between">
                      <Link
                        to="/main-profile"
                        className="block px-4 py-2 text-sm "
                      >
                        My Profile
                      </Link>
                      <ICONS.PROFILE size={25} className="mr-3" />
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="text-text data-[focus]:bg-gray-100 data-[focus]:outline-none flex items-center justify-between">
                      <Link
                        to="/my-projects"
                        className="block px-4 py-2 text-sm text-text data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        All Projects
                      </Link>
                      <ICONS.FOLDER size={25} className="mr-3" />
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="text-text data-[focus]:bg-gray-100 data-[focus]:outline-none flex items-center justify-between">
                      <Link
                        to="/chats"
                        className="block px-4 py-2 text-sm text-text data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Chat
                      </Link>
                      <ICONS.MESSAGECIRCLE size={25} className="mr-3" />
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="text-text data-[focus]:bg-gray-100 data-[focus]:outline-none flex items-center justify-between">
                      <Link className="block px-4 py-2 text-sm text-text data-[focus]:bg-gray-100 data-[focus]:outline-none">
                        <SignOutButton />
                      </Link>
                      <ICONS.SIGNOUT size={25} className="mr-3" />
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </>
          ) : (
            <div className="data-[focus]:bg-gray-100 data-[focus]:outline-none">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="-mx-3 block rounded-lg text-center px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-btnhover bg-btn"
              >
                Log in
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-4 py-4 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex flex-row-reverse items-center justify-between">
            <Link
              to="/"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="w-auto h-8"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-text"
            >
              <span className="sr-only">Close menu</span>
              <ICONS.CLOSE aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="flex flex-col justify-between h-[90%] mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Find Talent
                    <ICONS.ARROW_DOWN
                      aria-hidden="true"
                      className="flex-none size-5 group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block py-2 pl-6 pr-3 font-semibold text-gray-900 rounded-lg text-sm/7 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Find Work
                    <ICONS.ARROW_DOWN
                      aria-hidden="true"
                      className="flex-none size-5 group-data-open:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        to={item.href}
                        className="block py-2 pl-6 pr-3 font-semibold text-black rounded-lg text-sm/7 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 -mx-3 font-semibold text-black rounded-lg text-base/7 hover:bg-gray-50"
                >
                  Why Upwork
                </Link>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 -mx-3 font-semibold text-black rounded-lg text-base/7 hover:bg-gray-50"
                >
                  What's new
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
