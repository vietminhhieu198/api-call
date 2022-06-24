import { Check } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routerPath } from "../../../common/constants/routerPath";
import { capitalizeFirstLetter } from "../../../common/helper/string";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/ReduxHook";
import { IComment } from "../../../common/interfaces/CommentModel";
import { GoBack } from "../../../components/GoBack/GoBack";
import { Navbar } from "../../../components/Navbar/Navbar";
import {
  changeCommentInputValue,
  updateCommentById,
} from "../../../redux/features/comment/commentSlice";
import { RootState } from "../../../redux/store";

export const CommentDetail = () => {
  const { commentDetail, isLoading } = useAppSelector(
    (state: RootState) => state.comment
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeCommentInputValue({
        inputName: e.target.name,
        inputValue: e.target.value,
      })
    );
  };

  const handleClickUpdateCommentList = async (e: React.MouseEvent) => {
    e.preventDefault();
    await dispatch(
      updateCommentById({
        updatedComment: commentDetail,
        commentId: parseInt(id as string),
      })
    );
    !isLoading && navigate(routerPath.data.COMMENT_LIST);
  };

  const renderCommentDetail = () => {
    return Object.entries(commentDetail as IComment).map((item, index) => {
      if (item[0] === "id") {
        return (
          <Grid item xs={10} md={6}>
            <TextField
              fullWidth
              key={index}
              label={item[0].toUpperCase()}
              value={item[1]}
              variant="outlined"
              disabled
            />
          </Grid>
        );
      }
      return (
        <Grid item xs={10} md={6}>
          <TextField
            fullWidth
            key={index}
            label={capitalizeFirstLetter(item[0])}
            value={item[1]}
            name={item[0]}
            onChange={handleChangeTextField}
            variant="outlined"
          />
        </Grid>
      );
    });
  };

  return (
    <>
      <Navbar />
      <GoBack pageLink={routerPath.data.COMMENT_LIST} />
      {!isLoading && (
        <Container>
          <form className="px-4 py-12">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                letterSpacing: ".1rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              Comment Detail
            </Typography>
            <Grid container spacing={2}>
              {renderCommentDetail()}
              <Grid item xs={10} md={6}>
                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  onClick={handleClickUpdateCommentList}
                  color="success"
                  variant="contained"
                  startIcon={<Check />}
                >
                  Confirm update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </>
  );
};
