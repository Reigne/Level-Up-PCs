import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { message, Button, Image } from "antd";

export default function BrandList({ brands, toggleUpdate, deleteHandler }) {
  const imageBodyTemplate = (rowData) => {
    return (
      <Image
        src={rowData?.image?.url}
        alt={rowData.name}
        className="rounded"
        style={{ width: "50px", height: "auto" }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row gap-2">
        {/* <Link to={`/brands/edit/${rowData.id}`}> */}
        <Button type="primary" onClick={() => toggleUpdate(rowData._id)}>
          Edit
        </Button>
        {/* </Link> */}
        <Button danger onClick={() => deleteHandler(rowData._id)}>Delete</Button>
      </div>
    );
  };

  return (
    <DataTable
      value={brands}
      className="p-datatable-striped"
      stripedRows
      paginator
      rows={8}
      rowsPerPageOptions={[8, 25, 50]}
      emptyMessage="No brands found."
      tableStyle={{ minWidth: "50rem" }}
    >
      <Column field="name" header="Name" style={{ minWidth: "20rem" }}></Column>
      <Column
        field="image"
        header="Image"
        body={imageBodyTemplate}
        style={{ minWidth: "20rem" }}
      ></Column>
      <Column
        header="Actions"
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "10rem" }}
      ></Column>
    </DataTable>
  );
}
