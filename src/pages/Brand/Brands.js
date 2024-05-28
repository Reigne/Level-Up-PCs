import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Navbar/Sidebar";
import BrandForm from "./BrandForm";
import { Button, message } from "antd";
import BrandList from "./BrandList";
import {
  allBrands,
  clearErrors,
  deleteBrand,
  resetDeleteBrand,
  singleBrand,
} from "../../actions/brandActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Brands() {
  const [showForm, setShowForm] = useState(false);
  const [brandId, setBrandId] = useState("");

  const dispatch = useDispatch();

  const { error, loading, success, brands } = useSelector(
    (state) => state.brands
  );

  const { errorDelete, isDeleted } = useSelector(
    (state) => state.deleteBrand
  );

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBrand(id));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    if (isDeleted) {
      message.success("Brand deleted successfully");
      dispatch(allBrands());
      dispatch(resetDeleteBrand());
    }

    if (errorDelete) {
      message.error(errorDelete);
    }
  }, [isDeleted, errorDelete, dispatch]);

  useEffect(() => {
    dispatch(allBrands());

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [success, error, dispatch]);

  const toggleCreate = () => {
    setBrandId("");
    setShowForm(true);
  };

  const toggleUpdate = async (id) => {
    await dispatch(singleBrand(id));
    setBrandId(id);
    setShowForm(true);
  };

  return (
    <div className="flex relative bg-zinc-100">
      <div className="sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out">
        <div className="p-8 space-y-4">
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-bold">All Brands</span>

            <Button onClick={toggleCreate} type="primary">
              + Create Brand
            </Button>
          </div>

          <div className="bg-white rounded p-4">
            <BrandList
              brands={brands}
              toggleUpdate={toggleUpdate}
              deleteHandler={deleteHandler}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="sticky top-0 w-full max-w-[24rem]">
          <BrandForm setShowForm={setShowForm} brandId={brandId} />
        </div>
      )}
    </div>
  );
}
