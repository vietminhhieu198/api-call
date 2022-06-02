import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../common/interfaces/UserModel";
import adminService from "../../../services/adminService";

export const getUserList = createAsyncThunk("users/getUserList", async () => {
  const response = await adminService.getUserList();
  return response;
});

export const deleteUserById = createAsyncThunk(
  "users/deleteUserById",
  async (userId: number) => {
    const response = await adminService.deleteUserById(userId);
    return response;
  }
);

export const getUserDetailById = createAsyncThunk(
  "users/getUserDetailById",
  async (userId: number) => {
    const response = await adminService.getUserDetailById(userId);
    return response;
  }
);

export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async (params: { updatedUser: IUser; userId: number }) => {
    const response = await adminService.updateUserById(
      params.updatedUser,
      params.userId
    );
    return response;
  }
);

export const addNewUserToDB = createAsyncThunk(
  "users/addNewUserToDB",
  async (newUser: IUser) => {
    const response = await adminService.addNewUser(newUser);
    return response;
  }
);

export interface UserState {
  userList: IUser[];
  newUser: IUser | null;
  editedUser: IUser | null;
  userDetail: IUser | any;
  isLoading: boolean;
}

const initialState: UserState = {
  userList: [],
  newUser: null,
  editedUser: null,
  userDetail: {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",

      geo: {
        lat: "",
        lng: "",
      },
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  },
  isLoading: true,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeUserInputValue: (
      state: UserState,
      action: PayloadAction<{ inputName: string; inputValue: string }>
    ) => {
      const { inputName, inputValue } = action.payload;
      state.userDetail[inputName] = inputValue;
    },
    changeUserLevelTwoInputValue: (
      state: UserState,
      action: PayloadAction<{
        inputName: string;
        inputValue: string;
        attributeName: string;
      }>
    ) => {
      const { inputName, inputValue, attributeName } = action.payload;
      state.userDetail[attributeName][inputName] = inputValue;
    },
    changeUserLevelThreeInputValue: (
      state: UserState,
      action: PayloadAction<{
        inputName: string;
        inputValue: string;
      }>
    ) => {
      const { inputName, inputValue } = action.payload;
      state.userDetail.address.geo[inputName] = inputValue;
    },
  },
  extraReducers: {
    //getUserList
    [getUserList.pending.toString()]: (state: UserState) => {
      state.isLoading = true;
    },
    [getUserList.fulfilled.toString()]: (
      state: UserState,
      action: PayloadAction<IUser[]>
    ) => {
      if (state.newUser) {
        state.userList = [state.newUser, ...action.payload];
        state.isLoading = false;
      }
      if (state.editedUser) {
        const updatedUserList = state.userList.map((userItem: IUser) => {
          if (userItem.id === state.editedUser?.id) return state.editedUser;
          return userItem;
        });
        state.userList = updatedUserList;
        state.isLoading = false;
      }
      state.userList = [...action.payload];
      state.isLoading = false;
    },
    [getUserList.rejected.toString()]: (state: UserState) => {
      state.isLoading = false;
    },

    //deleteUserById
    [deleteUserById.pending.toString()]: (state: UserState) => {
      state.isLoading = true;
    },
    [deleteUserById.fulfilled.toString()]: (
      state: UserState,
      action: PayloadAction<number>
    ) => {
      const userListAfterDeleting = state.userList.filter(
        (userItem: IUser) => userItem.id !== action.payload
      );
      state.userList = [...userListAfterDeleting];
      state.isLoading = false;
    },
    [deleteUserById.rejected.toString()]: (state: UserState) => {
      state.isLoading = false;
    },

    //getUserDetailById
    [getUserDetailById.pending.toString()]: (state: UserState) => {
      state.isLoading = true;
    },
    [getUserDetailById.fulfilled.toString()]: (
      state: UserState,
      action: PayloadAction<IUser>
    ) => {
      state.userDetail = { ...action.payload };
      state.isLoading = false;
    },
    [getUserDetailById.rejected.toString()]: (state: UserState) => {
      state.isLoading = false;
    },

    //updateUserById
    [updateUserById.pending.toString()]: (state: UserState) => {
      state.isLoading = true;
    },
    [updateUserById.fulfilled.toString()]: (
      state: UserState,
      action: PayloadAction<IUser>
    ) => {
      state.editedUser = { ...action.payload };
      state.isLoading = false;
    },
    [updateUserById.rejected.toString()]: (state: UserState) => {
      state.isLoading = false;
    },

    //addNewUser
    [addNewUserToDB.pending.toString()]: (state: UserState) => {
      state.isLoading = true;
    },
    [addNewUserToDB.fulfilled.toString()]: (
      state: UserState,
      action: PayloadAction<IUser>
    ) => {
      state.newUser = { ...action.payload };
      state.isLoading = false;
    },
    [addNewUserToDB.rejected.toString()]: (state: UserState) => {
      state.isLoading = false;
    },
  },
});

export const {
  changeUserInputValue,
  changeUserLevelTwoInputValue,
  changeUserLevelThreeInputValue,
} = userSlice.actions;

export default userSlice.reducer;
