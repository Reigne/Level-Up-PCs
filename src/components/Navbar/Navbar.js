import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap shadow-lg py-3 px-14">
      <div className="flex flex-col">
        <div className="flex items-center flex-shrink-0">
          <span className="font-extrabold text-3xl tracking-normal">
            <span className="text-blue-500">Level Up</span>
          </span>
        </div>

        <span className="text-xs">Power Up Your Game</span>
      </div>

      <div className="flex flex-row space-x-8">
        <div>
          <a className="">Home</a>
        </div>
        <div>
          <a className="">Shop</a>
        </div>
        <div>
          <a className="">Contact</a>
        </div>
      </div>

      <div className="flex flex-row space-x-8 items-center">
        <div className="bg-blue-500 py-2 px-6 rounded-full">
          <a className=" text-white">Sign Up</a>
        </div>
        <div>
          <a className="" href="/login">Sign In</a>
        </div>
      </div>
    </nav>
  );
}
