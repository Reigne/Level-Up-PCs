import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, message, Select, Upload } from "antd";
import { allCategories, clearErrors } from "../../actions/categoryActions";
import { allBrands } from "../../actions/brandActions";
import { UploadOutlined } from "@ant-design/icons";
import { createProduct } from "../../actions/productActions";

export default function ProductForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const { TextArea } = Input;

  const {
    error: productError,
    loading: productLoading,
    success: productSuccess,
    products,
  } = useSelector((state) => state.createProduct);

  const {
    error: categoryError,
    loading: categoryLoading,
    success: categorySuccess,
    categories,
  } = useSelector((state) => state.categories);

  const {
    error: brandError,
    loading: brandLoading,
    success: brandSuccess,
    brands,
  } = useSelector((state) => state.brands);

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!price) errors.price = "Price is required";
    if (!quantity) errors.quantity = "Quantity is required";
    if (!description) errors.description = "Description is required";
    if (!stock) errors.stock = "Stock is required";
    if (!category) errors.category = "Category is required";
    if (!brand) errors.brand = "Brand is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    dispatch(allCategories());
    dispatch(allBrands()); // Dispatch action to fetch brands

    if (categoryError) {
      message.error(categoryError);
      dispatch(clearErrors());
    }

    if (brandError) {
      message.error(brandError);
      dispatch(clearErrors());
    }
  }, [categorySuccess, brandSuccess, categoryError, brandError, dispatch]);

  const onChangeCategory = (value) => {
    setCategory(value);
    console.log(`selected category ${value}`);
  };

  const onChangeBrand = (value) => {
    setBrand(value);
    console.log(`selected brand ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const brandOptions = brands.map((brand) => ({
    value: brand._id,
    label: brand.name,
  }));


  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImages((prevImages) => [...prevImages, e.target.result]);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const fileProps = {
    name: "image",
    multiple: true,
    listType: "picture",
    beforeUpload,
  };

  const submitHandler = async () => {
    console.log("images", images);

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("brand", brand);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(createProduct(formData));
    // setIsloading(true);

    // Here you can add the code to submit the form data to your server
  };

  const onChange = (e) => {
    console.log(e, "eeeeeee");
    const files = Array.from(e.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (productSuccess) {
      message.success("Product created successfully");
      // dispatch()
      setIsloading(false);
    }
  }, [productSuccess]);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[28rem] p-4 bg-white sticky top-0">
      <div className="flex-1 flex-col items-center gap-4 p-3">
        {/* <Avatar size={48} /> */}

        <div className="flex flex-1 flex-col space-y-8 ">
          <div className="flex items-center flex-shrink-0">
            <span className="font-extrabold text-3xl tracking-normal">
              <span className="text-blue-500">Create Product</span>
            </span>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <p>
                Name <span className="text-red-500">*</span>
              </p>
              <Input
                placeholder="Product name"
                variant="filled"
                size="large"
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                status={errors.name ? "error" : null}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-row gap-4">
              <div className="space-y-1">
                <p>
                  Price <span className="text-red-500">*</span>
                </p>
                <Input
                  placeholder="Product price"
                  variant="filled"
                  size="large"
                  type="text"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  status={errors.price ? "error" : null}
                />
                {errors.price && (
                  <span className="text-red-500 text-sm">{errors.price}</span>
                )}
              </div>

              <div className="space-y-1">
                <p>
                  Quantity <span className="text-red-500">*</span>
                </p>
                <Input
                  placeholder="Product quantity"
                  variant="filled"
                  size="large"
                  type="text"
                  name="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  status={errors.quantity ? "error" : null}
                />
                {errors.quantity && (
                  <span className="text-red-500 text-sm">
                    {errors.quantity}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <p>
                Description <span className="text-red-500">*</span>
              </p>
              <TextArea
                placeholder="Product description"
                variant="filled"
                size="large"
                type="text"
                name="description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                status={errors.description ? "error" : null}
              />
              {errors.quantity && (
                <span className="text-red-500 text-sm">
                  {errors.description}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <p>
                Stock <span className="text-red-500">*</span>
              </p>
              <Input
                placeholder="Product stock"
                variant="filled"
                size="large"
                type="text"
                name="stock"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                status={errors.stock ? "error" : null}
              />
              {errors.stock && (
                <span className="text-red-500 text-sm">{errors.stock}</span>
              )}
            </div>

            <div className="space-y-1">
              <p>
                Category <span className="text-red-500">*</span>
              </p>
              <Select
                showSearch
                optionFilterProp="children"
                onChange={onChangeCategory}
                onSearch={onSearch}
                filterOption={filterOption}
                options={categoryOptions}
                value={category}
                style={{ width: "100%" }}
                placeholder="Select category"
                variant="filled"
                size="large"
                status={errors.category ? "error" : null}
              />
              {errors.category && (
                <span className="text-red-500 text-sm">{errors.category}</span>
              )}
            </div>

            <div className="space-y-1">
              <p>
                Brand <span className="text-red-500">*</span>
              </p>
              <Select
                showSearch
                optionFilterProp="children"
                onChange={onChangeBrand}
                onSearch={onSearch}
                filterOption={filterOption}
                options={brandOptions}
                value={brand}
                style={{ width: "100%" }}
                placeholder="Select brand"
                variant="filled"
                size="large"
                status={errors.brand ? "error" : null}
              />
              {errors.brand && (
                <span className="text-red-500 text-sm">{errors.brand}</span>
              )}
            </div>

            <div className="space-y-1">
              <p>Upload Image</p>

              <div>
                <Upload
                  {...fileProps}
                  maxCount={10}
                  // onChange={() => onChange()}
                  // type="file"
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-2">
        <Button
          type="primary"
          size="large"
          onClick={() => submitHandler()}
          loading={isLoading}
        >
          Submit
        </Button>

        <Button size="large">Cancel</Button>
      </div>
    </div>
  );
}
