import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProduct } from "../../actions/productActions";
import { Breadcrumb, Button, Divider, Input, InputNumber, Rate } from "antd";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductSingle() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.singleProduct
  );

  useEffect(() => {
    dispatch(singleProduct(id));
  }, [dispatch, id]);

  const getImageItems = () => {
    return (
      product?.images?.map((image) => ({
        original: image.url,
        thumbnail: image.url,
      })) || []
    );
  };

  console.log(product, "product single");

  return (
    <div className="flex-1 bg-white">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <div className="container mx-auto bg py-4 space-y-4">
            <Breadcrumb
              items={[
                {
                  title: "Home",
                },
                {
                  title: <a href="/">Shop</a>,
                },
                {
                  title: <a href="">{product?.category?.name}</a>,
                },
                {
                  title: <p href="">{product?.brand?.name}</p>,
                },
              ]}
            />

            <div className="flex gap-8">
              <div className="bg-zinc-100">
                <ImageGallery
                  items={getImageItems()}
                  showPlayButton={false}
                  additionalClass="custom-gallery"
                  showFullscreenButton={false}
                  showBullets={true}
                  infinite={false}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-4xl font-bold">{product.name}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <Rate
                    disabled
                    defaultValue={product.ratings}
                    style={{ fontSize: 20 }}
                  />

                  <p className="text-zinc-500 text-sm">
                    ({product.reviews?.length} reviews)
                  </p>
                </div>

                <div>
                  <p className="text-xl text-red-500 font-semibold">
                    ₱{product.price}
                  </p>
                </div>

                <Divider />

                <div className="w-[50rem]">
                  <p className="font-semibold text-zinc-600">Description</p>
                  <p className="text-zinc-600">{product.description}</p>
                </div>

                <Divider />

                <div className="flex gap-4">
                  <InputNumber
                    size="large"
                    className="w-20"
                    defaultValue={1}
                    min={1}
                    max={product.stock}
                  />

                  <Button size="large" type="primary" className="font-semibold">
                    ADD TO CART
                  </Button>
                </div>

                <Divider />

                <div className="space-y-2">
                  <p className="text-zinc-600">
                    <span className="font-semibold">Category:</span>{" "}
                    {product.category?.name}
                  </p>
                  <p className="text-zinc-600">
                    <span className="font-semibold">Brand:</span>{" "}
                    {product.brand?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
