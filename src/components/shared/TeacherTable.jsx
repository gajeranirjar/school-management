// import { DataGrid } from "@mui/x-data-grid";

// const TeacherTable = ({ teachers }) => {
//   const columns = [
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "department", headerName: "Department", flex: 1 },
//     { field: "subject", headerName: "Subject", flex: 1 },
//   ];

//   return (
//     <div style={{ height: 400}}>
//       <DataGrid rows={teachers} columns={columns} pageSizeOptions={[10, 25, 50, 100]}
//         initialState={{
//           pagination: {
//             paginationModel: { pageSize: 10, page: 0 },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default TeacherTable;





import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Box, useMediaQuery, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo } from "react";

const TeacherTable = ({ teachers = [], onEdit, onDelete, isAction }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = useMemo(() => {
    const base = [
      { field: "name", headerName: "Name", flex: 1, minWidth: isMobile ? 50 : 120, sortable: true },
      { field: "department", headerName: "Department", flex: 1, minWidth: isMobile ? 50 : 120, sortable: true },
      { field: "subject", headerName: "Subject", flex: 1, minWidth: isMobile ? 40 : 120, sortable: true }
    ];

    if (isAction) {
      base.push({
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: isMobile ? 90 : isTablet ? 130 : 180,
        renderCell: (params) => (
          <Box sx={{ display: "flex", gap: isMobile ? 0.1 : 2 }}>
            <IconButton
              size={isMobile ? "small" : "medium"}
              color="primary"
              onClick={() => onEdit?.(params.row)}
            >
              <EditIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>

            <IconButton
              size={isMobile ? "small" : "medium"}
              color="error"
              onClick={() => onDelete?.(params.row.id)}
            >
              <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>
        )
      });
    }

    return base;
  }, [isAction, onEdit, onDelete, isMobile, isTablet]);

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        rows={teachers}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 }
          },
          sorting: {
            sortModel: [{ field: "name", sort: "asc" }]
          }
        }}
        disableRowSelectionOnClick
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          fontSize: isMobile ? "12px" : "14px",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
            fontSize: isMobile ? "12px" : "14px"
          },

          "& .MuiDataGrid-cell": {
            fontSize: isMobile ? "12px" : "14px"
          }
        }}
      />
    </Box>
  );
};

export default TeacherTable;