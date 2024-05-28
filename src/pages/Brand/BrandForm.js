import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Input, message } from "antd";
import {
  createBrand,
  allBrands,
  singleBrand,
  updateBrand,
  clearErrors,
  resetUpdateBrand,
} from "../../actions/brandActions";
import { CREATE_BRAND_RESET } from "../../constants/brandConstants";

export default function BrandForm({ setShowForm, brandId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const { loading, error, success } = useSelector(
    (state) => state.createBrand
  );

  const { brand } = useSelector((state) => state.singleBrand);
  const { updateSuccess, errorUpdate } = useSelector(
    (state) => state.updateBrand
  );

  useEffect(() => {
    if (brandId) {
      dispatch(singleBrand(brandId));

      setName(brand.name);
      setImage(brand?.image?.url);
      setItem(brand);
    } else {
      setName("");
      setImage(null);
      setItem(null);
    }
  }, [dispatch, brandId]);

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Brand name is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const fileProps = {
    name: "image",
    multiple: false,
    listType: "picture",
    beforeUpload: () => false,
    onChange: (info) => {
      if (info.file.status !== "uploading") {
        const file = info.file;
        const reader = new FileReader();

        reader.onload = (e) => {
          setImage(e.target.result);
        };

        reader.readAsDataURL(file);
      }
    },
  };

  const submitHandler = async () => {
    console.log("image", image)
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
      console.log(formData);
    }

    if (brandId) {
      console.log("update", brand._id);
      dispatch(updateBrand(brand._id, formData));
      setIsloading(true);
    } else {
      console.log("create brand");
      dispatch(createBrand(formData));
      setIsloading(true);
    }
  };

  useEffect(() => {
    if (success) {
      message.success("Brand created successfully");
      dispatch({ type: CREATE_BRAND_RESET });
      dispatch(allBrands());
      setShowForm(false);
      setIsloading(false);
    }

    if (updateSuccess) {
      message.success("Brand updated successfully");
      dispatch(resetUpdateBrand());
      dispatch(allBrands());
      setShowForm(false);
      setIsloading(false);
    }

    if (error) {
      message.error(error);
      setIsloading(false);
      dispatch(clearErrors());
    }
  }, [updateSuccess, success, error, dispatch, setShowForm]);

  const toggleForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[28rem] p-4 bg-white sticky top-0">
      <div className="flex-1 flex-col items-center gap-4 p-3">
        <div className="flex flex-col space-y-8">
          <div className="flex items-center flex-shrink-0">
            <span className="font-extrabold text-3xl tracking-normal">
              <span className="text-blue-500">
                {item ? "Update Brand" : "Create Brand"}
              </span>
            </span>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <p>
                Name <span className="text-red-500">*</span>
              </p>
              <Input
                placeholder="Brand name"
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

            <div className="space-y-1">
              <p>Upload Image</p>

              <div>
                <Upload {...fileProps} maxCount={1}>
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
          onClick={submitHandler}
          loading={isLoading}
        >
          Submit
        </Button>

        <Button size="large" onClick={toggleForm}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
