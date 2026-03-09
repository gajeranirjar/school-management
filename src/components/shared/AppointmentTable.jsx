import { DataGrid } from "@mui/x-data-grid";
import { Chip, Button, Box, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";


const AppointmentTable = ({ appointments = [], onApprove, onCancel, showActions = false, role }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getStatusColor = (status) => {
    if (status === "approved") return "success";
    if (status === "cancelled") return "error";
    return "warning";
  };

  const columns = useMemo(() => {
    const base = [
      {
        field: role === "teacher" ? "studentName" : "teacherName",
        headerName: role === "teacher" ? "Student" : "Teacher",
        flex: 1,
        minWidth: isMobile ? 120 : 180
      },
      {
        field: "date",
        headerName: "Date",
        flex: 1,
        minWidth: isMobile ? 120 : 160
      },
      {
        field: "message",
        headerName: "Purpose",
        flex: 1.5,
        minWidth: isMobile ? 160 : 220
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 120,
        renderCell: (params) => (
          <Chip label={params.value} color={getStatusColor(params.value)} />
        )
      }
    ];

    if (showActions) {
      base.push({
        field: "actions",
        headerName: "Actions",
        sortable: false,
        minWidth: isMobile ? 160 : 220,
        renderCell: (params) => (
          <Box display="flex" gap={1}>
            <Button
              size="small"
              variant="contained"
              color="success"
              disabled={params.row.status !== "pending"}
              onClick={() => onApprove?.(params.row.id)}
            >
              Approve
            </Button>

            <Button
              size="small"
              variant="contained"
              color="error"
              disabled={params.row.status !== "pending"}
              onClick={() => onCancel?.(params.row.id)}
            >
              Cancel
            </Button>
          </Box>
        )
      });
    }

    return base;
  }, [role, showActions, onApprove, onCancel, isMobile]);


  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={appointments}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[10, 25, 50]}
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

export default AppointmentTable;