import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Button, Input } from "antd";

export default function Login() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="bg-red-200 absolute top-[-6rem] -z-10 right-[11rem] h-[31.24rem] w-[31.25rem] rounded-full blur-[10rem]"></div>

      <div className="bg-[#dbd7fb] absolute top-[-5rem] -z-10 left-[35rem] h-[31.24rem] w-[31.25rem] rounded-full blur-[10rem] md:left-[-32rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>

      <div className="bg-blue-200 absolute top-[24rem] -z-10 left-[4rem] h-[31.24rem] w-[31.25rem] rounded-full blur-[10rem] md:left-[-32rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[24rem]"></div>

      <div className="flex-1 flex items-center justify-center ">
        <div className="flex flex-col shadow-xl  w-[500px] overflow-hidden bg-white">
          {/* <div className="overflow-hidden rounded-t-xl">
            <img
              src="/images/levelup.jpeg"
              className="w-full h-56 object-cover object-top"
              alt="Level Up"
            />
          </div> */}
{/*           
          <div className=" p-8">
            <p className="text-center text-4xl font-extrabold text-white">
              Level Up
            </p>
          </div> */}

          <div className="p-6 space-y-8">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-4xl font-extrabold text-blue-500">Sign In</p>

              <span className="">It's Time to Quest. Login to Begin.</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>Email</p>
                <Input
                  placeholder="levelup@example.com"
                  variant="filled"
                  size="large"
                />
              </div>

              <div className="space-y-1">
                <p>Password</p>
                <Input.Password
                  placeholder="password"
                  variant="filled"
                  size="large"
                />

                <a className="flex flex-row justify-end" href="">
                  <span className="text-sm text-red-500">Forgot Password?</span>
                </a>
              </div>
            </div>

            <div className="space-y-2">
              {/* <a
                className="flex items-center justify-center rounded p-3 font-bold bg-gradient-to-r from-cyan-500 to-blue-500"
                href=""
                as="button"
              >
                <a className="text-white r">Login</a>
              </a> */}

              <Button
                type="primary"
                block
                size="large"
                // icon={<SearchOutlined />}
                // iconPosition={position}
              >
                Login
              </Button>
              <div>
                <span className="text-sm">
                  Don't have account?{" "}
                  <a href="/signup" className="text-blue-500">
                    Sign Up
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
