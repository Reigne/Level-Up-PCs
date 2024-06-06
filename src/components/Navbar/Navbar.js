import React, { useEffect, useState } from "react";
import { AutoComplete, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { allProducts, clearErrors } from "../../actions/productActions";

export default function Navbar() {
  const { error, loading, success, products } = useSelector(
    (state) => state.products
  );

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
        <a className="bg-blue-500 py-2 px-6 rounded-full" href="/signup">
          <span className=" text-white">Sign Up</span>
        </a>
        <div>
          <a className="" href="/login">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
}
