import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const StudentApprovalTable = ({ students, onApprove }) => {

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      renderCell: (params) => {
        return <Button
          variant="contained"
          onClick={() => onApprove(params.row.id)}>
          Approve
        </Button>;
      }
    }
  ];

  return (
    <div style={{ height: 400 }}>
      <DataGrid rows={students} columns={columns} pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
      />
    </div>
  );
};

export default StudentApprovalTable;
