import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { message, Button, Image } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";

export default function ProductList({ products, toggleUpdate, deleteHandler }) {
  const imageBodyTemplate = (rowData) => {
    return (
      <Image
        src={rowData?.images[0]?.url}
        alt={rowData.name}
        className="rounded"
        style={{ width: "50px", height: "auto" }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row gap-2 ">
        <Button
          type="primary"
          shape="circle"
          // onClick={() => toggleUpdate(rowData._id)}
          icon={<EyeOutlined />}
        ></Button>
        <Button type="primary" onClick={() => toggleUpdate(rowData._id)}>
          Edit
        </Button>
        <Button danger onClick={() => deleteHandler(rowData._id)}>
          Delete
        </Button>
      </div>
    );
  };

  const category = (value) => {
    return value.category.name;
  };

  const brand = (value) => {
    return value.brand.name;
  };

  const formatCurrency = (value) => {
    return value.price.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };

  return (
    <DataTable
      value={products}
      className="p-datatable-striped"
      stripedRows
      paginator
      rows={8}
      rowsPerPageOptions={[8, 25, 50]}
      emptyMessage="No products found."
      // tableStyle={{ minWidth: "10rem" }}
    >
      <Column
        className="font-semibold"
        field="name"
        header="Name"
        style={{ minWidth: "10rem" }}
      ></Column>
      <Column
        // className="font-semibold "
        field="brand"
        header="Brand"
        body={brand}
        style={{ minWidth: "10rem" }}
      ></Column>
      <Column
        // className="font-semibold "
        field="category"
        header="Category"
        body={category}
        style={{ minWidth: "10zrem" }}
      ></Column>
      <Column
        className="font-semibold"
        field="price"
        header="Price"
        body={formatCurrency}
        style={{ minWidth: "10rem" }}
      ></Column>
      <Column
        field="image"
        header="Image"
        body={imageBodyTemplate}
        style={{ minWidth: "5rem" }}
      ></Column>
      <Column
        header="Actions"
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "5rem" }}
      ></Column>
    </DataTable>
  );
}
