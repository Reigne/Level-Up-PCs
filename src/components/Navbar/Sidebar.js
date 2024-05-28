import { Avatar, Button, Divider } from "antd";
import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BsBoxSeam } from "react-icons/bs";
import { CiBoxes, CiDeliveryTruck } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { MdOutlineCategory } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { TbCategoryPlus } from "react-icons/tb";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation(); // Get the current location
  const isActive = location.pathname;
  return (
    // <div className="h-[calc(100vh-2rem)] w-full max-w-[16rem] p-4 bg-white ">
    <div className="min-h-screen w-full max-w-[16rem] p-4 bg-white sticky top-0">
      <div className="flex items-center gap-4 p-3 rounded-lg">
        {/* <Avatar size={48} /> */}

        <div className="flex flex-col">
          <div className="flex items-center flex-shrink-0">
            <span className="font-extrabold text-3xl tracking-normal">
              <span className="text-blue-500">Level Up PCs</span>
            </span>
          </div>

          <span className="text-sm">Power Up Your Game</span>
        </div>
      </div>

      <Divider />

      <div className="">
        <div className="space-y-3">
          <div className="hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <MdOutlineDashboard color="#0f172a" size={14} />

              <span className="">Dashboard</span>
            </div>
          </div>

          <Disclosure defaultOpen={isActive === "/products" ? true : false}>
            <DisclosureButton className="hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                <BsBoxSeam color="#0f172a" size={14} />

                <span className="">Products</span>
              </div>

              <ChevronDownIcon className="h-5 w-5 text-gray-900" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2">
              <a className="flex flex-col gap-2 pl-4" href="/products">
                <div
                  className={
                    isActive === "/products"
                      ? "bg-blue-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3"
                      : "hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3"
                  }
                >
                  <CiBoxes
                    color={isActive === "/products" ? "#1d4ed8" : "#0f172a"}
                    size={14}
                  />
                  <span
                    className={
                      isActive === "/products"
                        ? "text-blue-500 font-semibold"
                        : null
                    }
                  >
                    All Products
                  </span>
                </div>
                <div className="hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3">
                  <GoPlus color="#0f172a" size={14} />
                  <span>Create Product</span>
                </div>
              </a>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure defaultOpen={isActive === "/categories" ? true : false}>
            <DisclosureButton className="hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                <MdOutlineCategory color="#0f172a" size={14} />

                <span className="">Categories</span>
              </div>

              <ChevronDownIcon className="h-5 w-5 text-gray-900" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2">
              <a className="flex flex-col gap-2 pl-4" href="/categories">
                <div
                  className={
                    isActive === "/categories"
                      ? "bg-blue-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3"
                      : "hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3"
                  }
                >
                  <TbCategory2
                    color={isActive === "/categories" ? "#1d4ed8" : "#0f172a"}
                    size={14}
                  />
                  <span
                    className={
                      isActive === "/categories" ? "text-blue-500" : null
                    }
                  >
                    All Categories
                  </span>
                </div>
                <div className="hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3">
                  <TbCategoryPlus color="#0f172a" size={14} />
                  <span>Create Category</span>
                </div>
              </a>
            </DisclosurePanel>
          </Disclosure>

          <Disclosure defaultOpen={isActive === "/brands" ? true : false}>
            <DisclosureButton className="hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
              <div className="flex items-center gap-3">
                <MdOutlineCategory color="#0f172a" size={14} />

                <span className="">Brands</span>
              </div>

              <ChevronDownIcon className="h-5 w-5 text-gray-900" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2">
              <a className="flex flex-col gap-2 pl-4" href="/brands">
                <div
                  className={
                    isActive === "/brands"
                      ? "bg-blue-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3"
                      : "hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3"
                  }
                >
                  <TbCategory2
                    color={isActive === "/brands" ? "#1d4ed8" : "#0f172a"}
                    size={14}
                  />
                  <span
                    className={
                      isActive === "/brands" ? "text-blue-500" : null
                    }
                  >
                    All Brands
                  </span>
                </div>
                <div className="hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer flex items-center gap-3">
                  <TbCategoryPlus color="#0f172a" size={14} />
                  <span>Create Brands</span>
                </div>
              </a>
            </DisclosurePanel>
          </Disclosure>

          <div className="hover:bg-blue-100 py-2 px-3 rounded-lg cursor-pointer w-full flex flex-1 flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <LiaTruckLoadingSolid color="#0f172a" size={14} />

              <span className="">Orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
