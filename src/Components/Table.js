import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const Table = ({
  rows,
  columns,
  onCellEditStart,
  onRowSelectionModelChange,
  checkboxSelection,
}) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        onCellEditStart={onCellEditStart}
        onRowSelectionModelChange={onRowSelectionModelChange}
      />
    </Box>
  );
};
