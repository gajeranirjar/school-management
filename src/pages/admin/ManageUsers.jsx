import { useMemo, useState, useCallback } from "react";
import { Box, Typography, Card, CardContent, MenuItem, Select, CircularProgress, Snackbar, Alert, useMediaQuery, useTheme } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { updateUserRole } from "../../services/adminService";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../constants/roles";

const roles = Object.values(ROLES);

const ManageUsers = ({ users, setUsers, loading }) => {

  const { user } = useAuth();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleRoleChange = useCallback(async (userId, newRole) => {
    try {

      await updateUserRole(user.uid, userId, newRole);

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: newRole } : u
        )
      );

      showSnackbar("Role updated");

    } catch {
      showSnackbar("Role update failed", "error");
    }

  }, [user.uid, setUsers]);

  const columns = useMemo(() => [

    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: isMobile ? 80 : 120
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: isMobile ? 120 : 200
    },

    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: isMobile ? 100 : 150,
      renderCell: (params) => (
        <Select
          size={isMobile ? "small" : "medium"}
          value={params.row.role || ROLES.USER}
          onChange={(e) =>
            handleRoleChange(params.row.id, e.target.value)
          }
          sx={{
            minWidth: isMobile ? 80 : 120,
            fontSize: isMobile ? "12px" : "14px"
          }}
        >
          {roles.map((role) => (
            <MenuItem
              key={role}
              value={role}
              sx={{ fontSize: isMobile ? "12px" : "14px" }}
            >
              {role}
            </MenuItem>
          ))}
        </Select>
      )
    }

  ], [isMobile, handleRoleChange]);

  return (

    <Box p={isMobile ? 0 : 3}>

      <Card sx={{ borderRadius: 3 }}>

        <CardContent>

          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            mb={2}
          >
            Manage Users
          </Typography>

          {loading ? (
            <CircularProgress />
          ) : (
            <Box sx={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.id}
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10, page: 0 }
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
          )}

        </CardContent>

      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default ManageUsers;