import React, { useEffect, useState } from "react";
import { AutoComplete, Avatar, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allProducts, clearErrors } from "../../actions/productActions";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  ChevronDoubleLeftIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { BsBoxSeam, BsBoxSeamFill } from "react-icons/bs";

export default function Navbar() {
  const { error, success, products } = useSelector((state) => state.products);
  const { user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allProducts());

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [success, error, dispatch]);

  const options = products.map((product) => ({
    value: product.name, // Assuming each product has a 'name' property
    id: product._id, // Assuming each product has a unique '_id' property
  }));

  const handleSelect = (value, option) => {
    navigate(`/product/${option.id}`);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap shadow-lg py-3 px-14">
      <a className="flex flex-col" href="/">
        <div className="flex items-center flex-shrink-0">
          <span className="font-extrabold text-3xl tracking-normal">
            <span className="text-blue-500">Level Up</span>
          </span>
        </div>
        <span className="text-xs">Power Up Your Game</span>
      </a>

      <div>
        <AutoComplete
          style={{
            width: 500,
          }}
          options={options}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onSelect={handleSelect}
        >
          <Input.Search size="large" placeholder="Search" enterButton />
        </AutoComplete>
      </div>

      <div className="flex flex-row space-x-8 items-center">
        <div>
          <a className="" href="/">
            Shop
          </a>
        </div>
        <div>
          <a className="">Cart</a>
        </div>

        {user ? (
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-full bg-blue-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-blue-500/90 data-[focus]:outline-1 data-[focus]:outline-white">
              <Avatar
                src={user?.avatar?.url}
                icon={<UserIcon className="w-4 h-4" />}
              />
              <span>{user.fullname}</span>
              <ChevronDownIcon className="size-4 fill-white/60" />
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl bg-blue-500/90 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none mt-1"
              >
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <UserIcon className="size-4 fill-white/30" />
                    Profile
                    {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘E
                    </kbd> */}
                  </button>

                  {/* <div className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <Avatar
                      src={user?.avatar?.url}
                      icon={<UserIcon className="w-4 h-4" />}
                    />
                    <span>{user.fullname}</span>
                  </div> */}
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <BsBoxSeamFill className="size-4 fill-white/30" />
                    My Orders
                    {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘A
                    </kbd> */}
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <ArrowLeftStartOnRectangleIcon className="size-4 fill-white/30" />
                    Logout
                    {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘D
                    </kbd> */}
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        ) : (
          <>
            <a className="bg-blue-500 py-2 px-6 rounded-full" href="/signup">
              <span className=" text-white">Sign Up</span>
            </a>
            <div>
              <a className="" href="/login">
                Sign In
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
