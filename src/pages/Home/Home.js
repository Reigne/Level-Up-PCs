import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allProducts,
  clearErrors,
  singleProduct,
} from "../../actions/productActions";
import {
  Button,
  Image,
  message,
  Divider,
  Form,
  Radio,
  Skeleton,
  Space,
  Switch,
} from "antd";

export default function Home() {
  const dispatch = useDispatch();

  const { error, loading, success, products } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(allProducts());

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  console.log(products);
  return (
    <div className="flex-1 bg-zinc-100 ">
      <div className="flex flex-col container mx-auto">
        <p className="text-2xl font-bold">Products</p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto gap-10 p-2">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-3 ">
                <Skeleton.Image active style={{ height: '22rem', width: '22rem', objectFit: 'cover' }} />


                <Skeleton active />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto gap-4 p-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="w-full bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 shadow-lg"
              >
                <div className="">
                  <img
                    src={
                      product?.images[0]?.url || "/images/product-default.png"
                    }
                    alt={product.name}
                    className="object-cover  w-full h-[22rem]"
                  />

                  <div className="flex flex-col space-y-2 p-3">
                    <p className="font-semibold">{product.name}</p>
                    <div className="h-10">
                      <p className="text-sm font-light text-pretty line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex ">
                      <p className="font-semibold">${product.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
