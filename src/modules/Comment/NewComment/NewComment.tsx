import { Check } from "@mui/icons-material";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik as FormValidation } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routerPath } from "../../../common/constants/routerPath";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/ReduxHook";
import CommentModel, {
  IComment,
  ICommentWithoutId,
} from "../../../common/interfaces/CommentModel";
import { GoBack } from "../../../components/GoBack/GoBack";
import { Navbar } from "../../../components/Navbar/Navbar";
import { addNewCommentToDB } from "../../../redux/features/comment/commentSlice";
import { RootState } from "../../../redux/store";

export const NewComment = () => {
  const { commentList, isLoading } = useAppSelector(
    (state: RootState) => state.comment
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const lastCommentId = commentList[commentList.length - 1].id;
  const handleSubmitNewCommentForm = async (values: ICommentWithoutId) => {
    const newCommentObj: IComment = {
      id: lastCommentId + 1,
      postId: values.postId,
      name: values.name,
      email: values.email,
      body: values.body,
    };
    await dispatch(addNewCommentToDB(newCommentObj));
    !isLoading && navigate(routerPath.data.COMMENT_LIST);
  };

  return (
    <>
      <Navbar />
      <GoBack pageLink={routerPath.data.COMMENT_LIST} />
      {!isLoading && (
        <Container className="px-4 py-12">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: ".1rem",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Add New Comment
          </Typography>
          <FormValidation
            initialValues={{
              postId: 0,
              name: "",
              email: "",
              body: "",
            }}
            validationSchema={CommentModel.commentSchema}
            onSubmit={(values: ICommentWithoutId, { setSubmitting }) => {
              handleSubmitNewCommentForm(values);
              setSubmitting(false);
            }}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              errors,
              values,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={8} md={6}>
                    <TextField
                      fullWidth
                      id="post-id"
                      className="post-id"
                      name="postId"
                      label="PostId"
                      type="text"
                      variant="outlined"
                      value={values.postId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="1"
                      error={touched.postId && Boolean(errors.postId)}
                      helperText={touched.postId && errors.postId}
                    />
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <TextField
                      fullWidth
                      id="name"
                      className="name"
                      name="name"
                      label="Name"
                      type="text"
                      variant="outlined"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="id labore ex et quam laborum"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <TextField
                      fullWidth
                      id="email"
                      className="email"
                      name="email"
                      label="Email"
                      type="text"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Eliseo@gardner.biz"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <TextField
                      fullWidth
                      id="body"
                      className="body"
                      name="body"
                      label="Body"
                      type="text"
                      variant="outlined"
                      value={values.body}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
                      error={touched.body && Boolean(errors.body)}
                      helperText={touched.body && errors.body}
                    />
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <Button
                      sx={{
                        marginTop: "1rem",
                      }}
                      type="submit"
                      color="success"
                      variant="contained"
                      startIcon={<Check />}
                    >
                      Confirm add new
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </FormValidation>
        </Container>
      )}
    </>
  );
};
