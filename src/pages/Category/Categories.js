import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Navbar/Sidebar";
import CategoryForm from "./CategoryForm";
import { Button, message } from "antd";
import CategoryList from "./CategoryList";
import {
  allCategories,
  clearErrors,
  deleteCategory,
  resetDeleteCategory,
  singleCategory,
} from "../../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Categories() {
  const [showForm, setShowForm] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const dispatch = useDispatch();

  const { error, loading, success, categories } = useSelector(
    (state) => state.categories
  );

  const { errorDelete, isDeleted } = useSelector(
    (state) => state.deleteCategory
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
        dispatch(deleteCategory(id));

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
      message.success("Category deleted successfully");
      dispatch(allCategories());
      dispatch(resetDeleteCategory());
    }

    if (errorDelete) {
      message.error(errorDelete);
    }
  }, [isDeleted, errorDelete, dispatch]);

  useEffect(() => {
    dispatch(allCategories());

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [success, error, dispatch]);

  const toggleCreate = () => {
    setCategoryId("");
    setShowForm(true);
  };

  const toggleUpdate = async (id) => {
    await dispatch(singleCategory(id));
    setCategoryId(id);
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
            <span className="text-2xl font-bold">All Categories</span>

            <Button onClick={toggleCreate} type="primary">
              + Create Category
            </Button>
          </div>

          <div className="bg-white rounded p-4">
            <CategoryList
              categories={categories}
              toggleUpdate={toggleUpdate}
              deleteHandler={deleteHandler}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="sticky top-0 w-full max-w-[24rem]">
          <CategoryForm setShowForm={setShowForm} categoryId={categoryId} />
        </div>
      )}
    </div>
  );
}
