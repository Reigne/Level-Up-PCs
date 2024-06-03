import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Invalid email address";
      }
    }

    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const loginHandler = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);

    dispatch(login(formData));
  };

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

          <form className="p-6 space-y-8">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-4xl font-extrabold text-blue-500">Sign In</p>

              <span className="">It's Time to Quest. Login to Begin.</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p>Email</p>
                <Input
                  status={errors.email ? "error" : null}
                  placeholder="levelup@example.com"
                  variant="filled"
                  size="large"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>

              <div className="space-y-1">
                <p>Password</p>
                <Input.Password
                  status={errors.password ? "error" : null}
                  placeholder="password"
                  variant="filled"
                  size="large"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}

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
                onClick={() => loginHandler()}
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
          </form>
        </div>
      </div>
    </div>
  );
}
