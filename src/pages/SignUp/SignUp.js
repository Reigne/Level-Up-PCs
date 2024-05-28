import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, clearErrors } from "../../actions/userActions";
import { Bounce, toast } from "react-toastify";

export default function SignUp() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { loading, error, success } = useSelector((state) => state.register);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      dispatch(clearErrors());
    }

    if (success) {
      toast.success(`Registration successful!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      navigate("/login");
    }
  }, [loading, error, success, dispatch]);

  const validateForm = () => {
    let errors = {};

    if (!fullname) errors.fullname = "Fullname is required";

    if (!email) {
      errors.email = "Email is required";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "Invalid email address";
      }
    }

    if (!password) errors.password = "Password is required";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const submitHandler = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.set("fullname", fullname);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(register(formData));
    // try {
    //   await dispatch(register(formData));

    //   if (success) {
    //     toast.success("Registration successful!", {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //       transition: Bounce,
    //     });

    //     navigate("/login");
    //   } else if (error) {
    //     toast.error(error, {
    //       position: "top-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //       transition: Bounce,
    //     });
    //   }
    // } catch (err) {
    //   toast.error(`${err.message}`, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //   });
    // }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="bg-red-200 absolute top-[-6rem] -z-10 right-[11rem] h-[31.24rem] w-[31.25rem] rounded-full blur-[10rem]"></div>

      <div className="bg-[#dbd7fb] absolute top-[-5rem] -z-10 left-[35rem] h-[31.24rem] w-[31.25rem] rounded-full blur-[10rem] md:left-[-32rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>

      <div className="bg-blue-200 absolute top-[24rem] -z-10 left-[4rem] h-[31.24rem] w-[31.25rem] rounded-full blur-[10rem] md:left-[-32rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[24rem]"></div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col shadow-xl w-[500px] overflow-hidden bg-white">
          <div className="p-6 space-y-8">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-4xl font-extrabold text-blue-500">Sign Up</p>
              <span className="">Forge Your Legend. Sign Up Today.</span>
            </div>

            <form encType="multipart/form-data">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p>Fullname *</p>
                  <Input
                    status={errors.fullname ? "error" : null}
                    placeholder="Juan Cruz"
                    variant="filled"
                    size="large"
                    type="text"
                    name="fullname"
                    onChange={(e) => setFullname(e.target.value)}
                    value={fullname}
                  />
                  {errors.fullname && (
                    <span className="text-red-500">{errors.fullname}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <p>Email *</p>
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
                  <p>Password *</p>
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
                </div>

                <div className="space-y-1">
                  <p>Confirm Password *</p>
                  <Input.Password
                    status={errors.confirmPassword ? "error" : null}
                    placeholder="confirm password"
                    variant="filled"
                    size="large"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
            </form>

            <div className="space-y-2">
              {/* <a
                onClick={submitHandler}
                className="cursor-pointer flex items-center justify-center rounded p-3 font-bold bg-gradient-to-r from-cyan-500 to-blue-500"
              >
                <span className="text-white">Sign Up</span>
              </a> */}

              <Button
                type="primary"
                size="large"
                block
                onClick={submitHandler}
                // icon={<SearchOutlined />}
                // iconPosition={position}
              >
                Register
              </Button>

              <div>
                <span className="text-sm">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-500">
                    Login
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
