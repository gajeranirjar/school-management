import { DataGrid } from "@mui/x-data-grid";
import { Button, Box, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";

const StudentApprovalTable = ({ students = [], onApprove }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = useMemo(() => [
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 2, minWidth: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      minWidth: isMobile ? 120 : 160,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          onClick={() => onApprove?.(params.row.id)}
        >
          Approve
        </Button>
      )
    }
  ], [onApprove, isMobile]);

  return (
    <Box sx={{ width: "100%", height: 420 }}>
      <DataGrid
        rows={students}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } }
        }}
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          fontSize: isMobile ? "12px" : "14px"
        }}
      />
    </Box>
  );
};

export default StudentApprovalTable;