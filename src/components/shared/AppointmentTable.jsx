import { DataGrid } from "@mui/x-data-grid";
import { Chip, Button, Box } from "@mui/material";

const AppointmentTable = ({appointments,onApprove,onCancel,showActions = false,role}) => {

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "warning";
    }
  };

  const columns = [
    {
      field: role === "teacher" ? "studentName" : "teacherName",
      headerName: role === "teacher" ? "Student" : "Teacher",
      flex: 1
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "message",
      headerName: "Purpose",
      flex: 1.5
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value)}
        />
      )
    }
  ];

  if (showActions) {
    columns.push({
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            size="small"
            variant="contained"
            color="success"
            disabled={params.row.status !== "pending"}
            onClick={() => onApprove(params.row.id)}
          >
            Approve
          </Button>

          <Button
            size="small"
            variant="contained"
            color="error"
            disabled={params.row.status !== "pending"}
            onClick={() => onCancel(params.row.id)}
          >
            Cancel
          </Button>
        </Box>
      )
    });
  }

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={appointments}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } }
        }}
      />
    </div>
  );
};

export default AppointmentTable;