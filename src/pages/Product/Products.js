import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Navbar/Sidebar";
import ProductForm from "./ProductForm";
import { Button, message } from "antd";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  allProducts,
  clearErrors,
  deleteProduct,
  resetDeleteProduct,
  singleProduct,
} from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./ProductList";
import Swal from "sweetalert2";

export default function Products() {
  const [showForm, setShowForm] = useState(false);
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();

  const { error, loading, success, products } = useSelector(
    (state) => state.products
  );

  const { product } = useSelector((state) => state.singleProduct);

  const { errorDelete, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  useEffect(() => {
    dispatch(allProducts());

    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [success, error, dispatch]);

  const toggleUpdate = async (id) => {
    await dispatch(singleProduct(id));
    setProductId(id);
    setShowForm(true);
  };

  const toggleCreate = () => {
    setProductId("");
    setShowForm(true);
  };

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
        dispatch(deleteProduct(id));

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
      message.success("Product deleted successfully");
      dispatch(allProducts());
      dispatch(resetDeleteProduct());
    }

    if (errorDelete) {
      message.error(errorDelete);
    }
  }, [isDeleted, errorDelete, dispatch]);

  return (
    <div className="flex relative  bg-zinc-100">
      <div className="sticky top-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out">
        <div className="p-8 space-y-4">
          <div className="flex flex-row justify-between items-center">
            <span className="text-2xl font-bold">All Products</span>

            <Button onClick={() => toggleCreate()} type="primary">
              + Create Product
            </Button>
          </div>

          <div className="bg-white rounded p-4">
            <div className="card">
              <ProductList
                products={products}
                toggleUpdate={toggleUpdate}
                setShowForm={setShowForm}
                deleteHandler={deleteHandler}
              />
              {/* <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
                <Column field="name" header="Name"></Column>
                <Column field="price" header="Price"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
              </DataTable> */}
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="sticky top-0 w-full max-w-[24rem]">
          <ProductForm setShowForm={setShowForm} product={product} productId={productId}/>
        </div>
      )}
    </div>
  );
}
