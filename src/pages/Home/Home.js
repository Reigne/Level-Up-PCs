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
  Rate,
} from "antd";
import Carousel from "../../components/Navbar/CarouselProduct";
import CarouselProduct2 from "../../components/Navbar/CarouselProduct2";
import CarouselProduct3 from "../../components/Navbar/CarouselProduct3";

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(price);
  };

  console.log(products);
  return (
    <div className="flex-1 bg-zinc-100 ">
      <div className="flex flex-col container mx-auto">
        {/* <p className="text-2xl font-bold">Products</p> */}
        <div className="py-6 px-2">
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <div className="col-span-2 row-span-2">
              <Carousel />
            </div>

            <div className="col-start-3">
              <CarouselProduct2 />
            </div>

            <div className="col-start-3">
              <CarouselProduct3 />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto gap-10 p-2">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-3 ">
                <Skeleton.Image
                  active
                  style={{
                    height: "22rem",
                    width: "22rem",
                    objectFit: "cover",
                  }}
                />

                <Skeleton active />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto gap-4 p-2">
            {products.map((product) => (
              <a
                key={product._id}
                className="w-full bg-white transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 shadow-lg"
                href={`/product/${product._id}`}
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
                      <p className="font-semibold text-red-500">
                        {formatPrice(product?.price)}
                      </p>
                    </div>

                    <Divider />

                    <div className="flex gap-2 items-center">
                      <div>
                        <Rate
                          disabled
                          defaultValue={product.ratings}
                          style={{ fontSize: 16 }}
                        />
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs">
                          ({product?.reviews?.length})
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
