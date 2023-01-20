import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useCallback } from "react"
import { GRID_TABLE_COLS } from "../constants"

const AllMembersList = ({
  members = [],
  setMemberModalOpen,
  setDeleteMemberModalOpen,
  setMemberId,
}) => {
  const editField = {
    field: "Edit",
    headerName: "Edit",
    minWidth: 110,
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        <div>
          <Button
            onClick={() => {
              setMemberModalOpen(true);
              setMemberId(params.id);
            }}
          >
<EditIcon/>          </Button>
        </div>
      );
    },
  };
  const deleteField = {
    field: "Delete",
    headerName: "Delete",
    minWidth: 110,
    align: "center",
    headerAlign: "center",
    flex: 1,
    renderCell: (params) => {
      return (
        <div>
          <Button
            onClick={() => {
              setDeleteMemberModalOpen(true);
              setMemberId(params.id);
            }}
          >
            <DeleteForeverIcon color="error" />
          </Button>
        </div>
      );
    },
  };
  const newCols = useCallback(
    () => [...GRID_TABLE_COLS, editField, deleteField],
    []
  );
  return (
    <div style={{  flex:"1 1 auto",width:"100%",height:"calc(100vh - 100px)"}} >
      <DataGrid
        // autoHeight
        sx={{}}
        rows={members||[]}
        columns={newCols()}
        components={{
          Toolbar: GridToolbar,
        }}
        pageSize={5}
        rowHeight={170}
        rowSpacingType="margin"
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default AllMembersList;
