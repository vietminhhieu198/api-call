import { Add, Delete, Edit } from "@mui/icons-material";
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
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COMMENT_TABLE_HEAD } from "../../../common/constants";
import { routerPath } from "../../../common/constants/routerPath";
import { capitalizeFirstLetter } from "../../../common/helper/string";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/ReduxHook";
import {
  ICommentColumn,
  ICommentDataTable,
  IdCommentType,
  IFunctionSB,
} from "../../../common/interfaces/TableMuiModel";
import { Navbar } from "../../../components/Navbar/Navbar";
import { SnackbarMUI } from "../../../components/Snackbar/Snackbar";
import {
  deleteCommentById,
  getCommentDetailById,
  getCommentList,
} from "../../../redux/features/comment/commentSlice";
import { RootState } from "../../../redux/store";

export const CommentList = () => {
  const { commentList, isLoading } = useAppSelector(
    (state: RootState) => state.comment
  );
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [functionSnackbar, setFunctionSnackbar] =
    useState<IFunctionSB>("empty");

  useEffect(() => {
    dispatch(getCommentList());
  }, [dispatch]);

  const commentColumns = COMMENT_TABLE_HEAD.map((item): ICommentColumn => {
    const commentLabel =
      item === "id" ? item.toUpperCase() : capitalizeFirstLetter(item);
    return { id: item as IdCommentType, label: commentLabel };
  });

  function createCommentData(
    id: number,
    postId: number,
    name: string,
    email: string,
    body: string
  ): ICommentDataTable {
    return { id, postId, name, email, body };
  }

  const commentRows = commentList?.map((item) => {
    return createCommentData(
      item.id,
      item.postId,
      item.name,
      item.email,
      item.body
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

  const handleClickEditButton = (commentId: number) => {
    dispatch(getCommentDetailById(commentId));
  };

  const handleClickDeleteButton = async (commentId: number) => {
    await dispatch(deleteCommentById(commentId));
    await dispatch(getCommentList());
    setOpenSnackbar(true);
    setFunctionSnackbar("delete");
  };

  return (
    <>
      <Navbar />
      {!isLoading && (
        <Container maxWidth="xl">
          <Paper
            sx={{
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
                      Comment List
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {commentColumns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commentRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {commentColumns.map((column) => {
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
                                    to={`${routerPath.data.COMMENT_LIST}${row.id}`}
                                    onClick={() =>
                                      handleClickEditButton(row.id)
                                    }
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
            <Link to={routerPath.data.COMMENT_NEW}>
              <Button
                sx={{ marginLeft: "1rem", marginTop: "1rem" }}
                color="warning"
                variant="contained"
                startIcon={<Add />}
              >
                Add new
              </Button>
            </Link>

            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={commentRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      )}
      <SnackbarMUI
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        functionSB={functionSnackbar}
      />
    </>
  );
};
