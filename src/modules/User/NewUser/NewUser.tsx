import React from "react";
import { Form, Formik as FormValidation } from "formik";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import UserModel, {
  IUser,
  IUserInputAttributes,
} from "../../../common/interfaces/UserModel";
import { GoBack } from "../../../components/GoBack/GoBack";
import { routerPath } from "../../../common/constants/routerPath";
import { CustomTextField } from "../../../components/MuiStyling/MuiStyling";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/ReduxHook";
import { RootState } from "../../../redux/store";
import { addNewUserToDB } from "../../../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../components/Navbar/Navbar";

export const NewUser = () => {
  const { userList, isLoading } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const lastUserId = userList[userList.length - 1].id;
  const handleSubmitNewUserForm = async (values: IUserInputAttributes) => {
    const newUserObj: IUser = {
      id: lastUserId + 1,
      name: values.name,
      username: values.username,
      email: values.email,
      address: {
        street: values.addressStreet,
        suite: values.addressSuite,
        city: values.addressCity,
        zipcode: values.addressZipcode,
        geo: {
          lat: values.geoLat,
          lng: values.geoLng,
        },
      },
      phone: values.phone,
      website: values.website,
      company: {
        name: values.companyName,
        catchPhrase: values.companyCatchPhrase,
        bs: values.companyBs,
      },
    };
    await dispatch(addNewUserToDB(newUserObj));
    !isLoading && navigate(routerPath.data.USER_LIST);
  };

  return (
    <>
      <Navbar />
      <GoBack pageLink={routerPath.data.USER_LIST} />
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
            Add New User
          </Typography>
          <FormValidation
            initialValues={{
              name: "",
              username: "",
              email: "",
              addressStreet: "",
              addressSuite: "",
              addressCity: "",
              addressZipcode: "",
              geoLat: "",
              geoLng: "",
              phone: "",
              website: "",
              companyName: "",
              companyCatchPhrase: "",
              companyBs: "",
            }}
            validationSchema={UserModel.userSchema}
            onSubmit={(values: IUserInputAttributes, { setSubmitting }) => {
              handleSubmitNewUserForm(values);
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
                <Grid container spacing={10}>
                  <Grid item xs={8} md={6}>
                    <CustomTextField
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
                      placeholder="Leanne Graham"
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <CustomTextField
                      fullWidth
                      id="username"
                      className="username"
                      name="username"
                      label="Username"
                      type="text"
                      variant="outlined"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Bret"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                    <CustomTextField
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
                      placeholder="Sincere@april.biz"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <CustomTextField
                      fullWidth
                      id="phone"
                      className="phone"
                      name="phone"
                      label="Phone"
                      type="text"
                      variant="outlined"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="1-770-736-8031 x56442"
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                      }}
                    >
                      Company
                    </Typography>
                    <CustomTextField
                      fullWidth
                      id="company-name"
                      className="company-name"
                      name="companyName"
                      label="Name"
                      type="text"
                      variant="outlined"
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Romaguera-Crona"
                      error={touched.companyName && Boolean(errors.companyName)}
                      helperText={touched.companyName && errors.companyName}
                    />
                    <CustomTextField
                      fullWidth
                      id="catch-phrase"
                      className="catch-phrase"
                      name="companyCatchPhrase"
                      label="CatchPhrase"
                      type="text"
                      variant="outlined"
                      value={values.companyCatchPhrase}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Multi-layered client-server neural-net"
                      error={
                        touched.companyCatchPhrase &&
                        Boolean(errors.companyCatchPhrase)
                      }
                      helperText={
                        touched.companyCatchPhrase && errors.companyCatchPhrase
                      }
                    />
                    <CustomTextField
                      fullWidth
                      id="bs"
                      className="bs"
                      name="companyBs"
                      label="Bs"
                      type="text"
                      variant="outlined"
                      value={values.companyBs}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="harness real-time e-markets"
                      error={touched.companyBs && Boolean(errors.companyBs)}
                      helperText={touched.companyBs && errors.companyBs}
                    />
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <CustomTextField
                      fullWidth
                      id="website"
                      className="website"
                      name="website"
                      label="Website"
                      type="text"
                      variant="outlined"
                      value={values.website}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="hildegard.org"
                      error={touched.website && Boolean(errors.website)}
                      helperText={touched.website && errors.website}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                      }}
                    >
                      Address
                    </Typography>
                    <CustomTextField
                      fullWidth
                      id="street"
                      className="street"
                      name="addressStreet"
                      label="Street"
                      type="text"
                      variant="outlined"
                      value={values.addressStreet}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Kulas Light"
                      error={
                        touched.addressStreet && Boolean(errors.addressStreet)
                      }
                      helperText={touched.addressStreet && errors.addressStreet}
                    />
                    <CustomTextField
                      fullWidth
                      id="suite"
                      className="suite"
                      name="addressSuite"
                      label="Suite"
                      type="text"
                      variant="outlined"
                      value={values.addressSuite}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Apt. 556"
                      error={
                        touched.addressSuite && Boolean(errors.addressSuite)
                      }
                      helperText={touched.addressSuite && errors.addressSuite}
                    />
                    <CustomTextField
                      fullWidth
                      id="city"
                      className="city"
                      name="addressCity"
                      label="City"
                      type="text"
                      variant="outlined"
                      value={values.addressCity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Gwenborough"
                      error={touched.addressCity && Boolean(errors.addressCity)}
                      helperText={touched.addressCity && errors.addressCity}
                    />
                    <CustomTextField
                      fullWidth
                      id="zipcode"
                      className="zipcode"
                      name="addressZipcode"
                      label="Zipcode"
                      type="text"
                      variant="outlined"
                      value={values.addressZipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="92998-3874"
                      error={
                        touched.addressZipcode && Boolean(errors.addressZipcode)
                      }
                      helperText={
                        touched.addressZipcode && errors.addressZipcode
                      }
                    />
                    <CustomTextField
                      fullWidth
                      id="lat"
                      className="lat"
                      name="geoLat"
                      label="Lat"
                      type="text"
                      variant="outlined"
                      value={values.geoLat}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="-37.3159"
                      error={touched.geoLat && Boolean(errors.geoLat)}
                      helperText={touched.geoLat && errors.geoLat}
                    />
                    <CustomTextField
                      fullWidth
                      id="lng"
                      className="lng"
                      name="geoLng"
                      label="Lng"
                      type="text"
                      variant="outlined"
                      value={values.geoLng}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="81.1496"
                      error={touched.geoLng && Boolean(errors.geoLng)}
                      helperText={touched.geoLng && errors.geoLng}
                    />
                  </Grid>
                </Grid>

                <Button
                  sx={{
                    marginTop: "2rem",
                  }}
                  type="submit"
                  color="success"
                  variant="contained"
                  startIcon={<Check />}
                >
                  Confirm add new
                </Button>
              </Form>
            )}
          </FormValidation>
        </Container>
      )}
    </>
  );
};
