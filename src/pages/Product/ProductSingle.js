import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProduct } from "../../actions/productActions";
import { Breadcrumb } from "antd";

export default function ProductSingle() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.singleProduct
  );

  useEffect(() => {
    dispatch(singleProduct(id));
  }, [dispatch, id]);

  console.log(product, "product single");
  return (
    <div className="flex-1 bg-zinc-100">
      <div className="container mx-auto bg py-4">
        <Breadcrumb
          items={[
            {
              title: "Home",
            },
            {
              title: <a href="/">Shop</a>,
            },
            {
              title: <a href="">{product.category.name}</a>,
            },
            {
              title: <p href="">{product.brand.name}</p>,
            },
          ]}
        />

        <div className="flex gap-4">
            
        </div>
      </div>
    </div>
  );
}
