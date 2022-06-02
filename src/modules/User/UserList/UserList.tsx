import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components/Navbar/Navbar";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/ReduxHook";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";

import {
  IUserDataTable,
  IdUserType,
  IUserColumn,
  IFunction,
} from "../../../common/interfaces/TableMuiModel";
import { capitalizeFirstLetter } from "../../../common/helper/string";
import { USER_TABLE_HEAD } from "../../../common/constants";
import { Link } from "react-router-dom";
import { routerPath } from "../../../common/constants/routerPath";
import { RootState } from "../../../redux/store";
import {
  deleteUserById,
  getUserDetailById,
  getUserList,
} from "../../../redux/features/user/userSlice";
import { SnackbarMUI } from "../../../components/Snackbar/Snackbar";

export const UserList = () => {
  const { userList, isLoading } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [functionSnackbar, setFunctionSnackbar] = useState<IFunction>("empty");

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const userColumns = USER_TABLE_HEAD.map((item): IUserColumn => {
    const userLabel =
      item === "id" ? item.toUpperCase() : capitalizeFirstLetter(item);
    return { id: item as IdUserType, label: userLabel };
  });

  function createUserData(
    id: number,
    name: string,
    username: string,
    email: string,
    address: string,
    phone: string
  ): IUserDataTable {
    return { id, name, username, email, address, phone };
  }

  const userRows = userList?.map((item) => {
    return createUserData(
      item.id,
      item.name,
      item.username,
      item.email,
      item.address.city,
      item.phone
    );
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickEditButton = (userId: number) => {
    dispatch(getUserDetailById(userId));
  };

  const handleClickDeleteButton = async (userId: number) => {
    await dispatch(deleteUserById(userId));
    await dispatch(getUserList());
    setOpenSnackbar(true);
    setFunctionSnackbar("delete");
  };

  const handleClickAddButton = () => {};

  return (
    <>
      <Navbar />
      {!isLoading && (
        <Paper
          sx={{
            width: "80%",
            paddingBlock: "3rem",
            paddingInline: "1rem",
            margin: "auto",
            marginBlock: "2.5rem",
          }}
        >
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontSize: "2rem" }}
                    align="center"
                    colSpan={7}
                  >
                    User List
                  </TableCell>
                </TableRow>
                <TableRow>
                  {userColumns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {userRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {userColumns.map((column) => {
                          const value = row[column.id];
                          if (value) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id}>
                                <Link
                                  to={`${routerPath.data.USER_LIST}${row.id}`}
                                  onClick={() => handleClickEditButton(row.id)}
                                >
                                  <Button
                                    sx={{
                                      marginRight: "1rem",
                                    }}
                                    color="info"
                                    variant="contained"
                                    startIcon={<Edit />}
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() =>
                                    handleClickDeleteButton(row.id)
                                  }
                                  color="error"
                                  variant="contained"
                                  startIcon={<Delete />}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Link to={routerPath.data.NEW_USER}>
            <Button
              sx={{ marginLeft: "1rem", marginTop: "1rem" }}
              color="warning"
              variant="contained"
              startIcon={<Add />}
              onClick={handleClickAddButton}
            >
              Add new
            </Button>
          </Link>

          <TablePagination
            rowsPerPageOptions={[5, 25, 100]}
            component="div"
            count={userRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
      <SnackbarMUI
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        functionSB={functionSnackbar}
      />
    </>
  );
};
