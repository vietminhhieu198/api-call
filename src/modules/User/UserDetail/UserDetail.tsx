import { Check } from "@mui/icons-material";
import { Button, Container, FormGroup, Grid, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routerPath } from "../../../common/constants/routerPath";
import { capitalizeFirstLetter } from "../../../common/helper/string";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../common/hooks/ReduxHook";
import { IUser } from "../../../common/interfaces/UserModel";
import { GoBack } from "../../../components/GoBack/GoBack";
import { CustomTextField } from "../../../components/MuiStyling/MuiStyling";
import { Navbar } from "../../../components/Navbar/Navbar";
import {
  changeUserInputValue,
  changeUserLevelTwoInputValue,
  changeUserLevelThreeInputValue,
  updateUserById,
} from "../../../redux/features/user/userSlice";
import { RootState } from "../../../redux/store";

export const UserDetail = () => {
  const { userDetail, isLoading } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeUserInputValue({
        inputName: e.target.name,
        inputValue: e.target.value,
      })
    );
  };

  const handleChangeLevelTwoTextField = (
    e: React.ChangeEvent<HTMLInputElement>,
    attributeName: string
  ) => {
    dispatch(
      changeUserLevelTwoInputValue({
        inputName: e.target.name,
        inputValue: e.target.value,
        attributeName,
      })
    );
  };

  const handleChangeLevelThreeTextField = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(
      changeUserLevelThreeInputValue({
        inputName: e.target.name,
        inputValue: e.target.value,
      })
    );
  };

  const handleClickUpdateUserList = async (e: React.MouseEvent) => {
    e.preventDefault();
    await dispatch(
      updateUserById({
        updatedUser: userDetail,
        userId: parseInt(id as string),
      })
    );
    !isLoading && navigate(routerPath.data.USER_LIST);
  };

  const renderLeftUserDetail = () => {
    return Object.entries(userDetail as IUser).map((item, index) => {
      if (typeof item[1] === "string" || typeof item[1] === "number") {
        if (item[0] === "id") {
          return (
            <CustomTextField
              key={index}
              label={item[0].toUpperCase()}
              value={item[1]}
              variant="outlined"
              disabled
            />
          );
        } else {
          return (
            <CustomTextField
              key={index}
              label={capitalizeFirstLetter(item[0])}
              value={item[1]}
              name={item[0]}
              onChange={handleChangeTextField}
              variant="outlined"
            />
          );
        }
      }
      if (item[0] === "company") {
        return (
          <Fragment key={index}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: ".1rem",
              }}
            >
              {capitalizeFirstLetter(item[0])}
            </Typography>
            {Object.entries(item[1]).map((el, elIndex) => {
              return (
                <CustomTextField
                  key={elIndex}
                  label={capitalizeFirstLetter(el[0])}
                  value={el[1]}
                  name={el[0]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeLevelTwoTextField(e, item[0])
                  }
                  variant="outlined"
                />
              );
            })}
          </Fragment>
        );
      }
      return <Fragment key={index}></Fragment>;
    });
  };

  const renderRightUserDetail = () => {
    return Object.entries(userDetail as IUser).map((item, index) => {
      if (item[0] === "address") {
        return (
          <Fragment key={index}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: ".1rem",
              }}
            >
              {capitalizeFirstLetter(item[0])}
            </Typography>
            <FormGroup>
              {Object.entries(item[1]).map((el, elIndex) => {
                if (typeof el[1] === "string") {
                  return (
                    <CustomTextField
                      key={elIndex}
                      label={capitalizeFirstLetter(el[0])}
                      value={el[1]}
                      name={el[0]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeLevelTwoTextField(e, item[0])
                      }
                      variant="outlined"
                    />
                  );
                }
                return (
                  <Fragment key={elIndex}>
                    <Typography variant="body1">
                      {capitalizeFirstLetter(el[0])}
                    </Typography>
                    {Object.entries(el[1] as any).map((geo, geoIndex) => {
                      return (
                        <CustomTextField
                          key={geoIndex}
                          label={capitalizeFirstLetter(geo[0])}
                          value={geo[1]}
                          name={geo[0]}
                          onChange={handleChangeLevelThreeTextField}
                          variant="outlined"
                        />
                      );
                    })}
                  </Fragment>
                );
              })}
            </FormGroup>
          </Fragment>
        );
      }
      return <Fragment key={index}></Fragment>;
    });
  };

  return (
    <>
      <Navbar />
      <GoBack pageLink={routerPath.data.USER_LIST} />
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
              User Detail
            </Typography>
            <Grid container spacing={10}>
              <Grid item xs={8} md={6}>
                <FormGroup>{renderLeftUserDetail()}</FormGroup>
              </Grid>
              <Grid item xs={8} md={6}>
                {renderRightUserDetail()}
                <Button
                  sx={{
                    marginTop: "2rem",
                  }}
                  onClick={handleClickUpdateUserList}
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
