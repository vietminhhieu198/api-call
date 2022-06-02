import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../../common/interfaces/CommentModel";
import adminService from "../../../services/adminService";

export const getCommentList = createAsyncThunk(
  "comments/getCommentList",
  async () => {
    const response = await adminService.getCommentList();
    return response;
  }
);

export const deleteCommentById = createAsyncThunk(
  "comments/deleteCommentById",
  async (commentId: number) => {
    const response = await adminService.deleteCommentById(commentId);
    return response;
  }
);

export const getCommentDetailById = createAsyncThunk(
  "comments/getCommentDetailById",
  async (commentId: number) => {
    const response = await adminService.getCommentDetailById(commentId);
    return response;
  }
);

export const updateCommentById = createAsyncThunk(
  "comments/updateCommentById",
  async (params: { updatedComment: IComment; commentId: number }) => {
    const response = await adminService.updateCommentById(
      params.updatedComment,
      params.commentId
    );
    return response;
  }
);

export const addNewCommentToDB = createAsyncThunk(
  "comments/addNewCommentToDB",
  async (newComment: IComment) => {
    const response = await adminService.addNewComment(newComment);
    return response;
  }
);

export interface CommentState {
  commentList: IComment[];
  newComment: IComment | null;
  editedComment: IComment | null;
  commentDetail: IComment | any;
  isLoading: boolean;
}

const initialState: CommentState = {
  commentList: [],
  newComment: null,
  editedComment: null,
  commentDetail: {
    postId: 0,
    id: 0,
    name: "",
    email: "",
    body: "",
  },
  isLoading: true,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    changeCommentInputValue: (
      state: CommentState,
      action: PayloadAction<{ inputName: string; inputValue: string }>
    ) => {
      const { inputName, inputValue } = action.payload;
      state.commentDetail[inputName] = inputValue;
    },
  },
  extraReducers: {
    //getCommentList
    [getCommentList.pending.toString()]: (state: CommentState) => {
      state.isLoading = true;
    },
    [getCommentList.fulfilled.toString()]: (
      state: CommentState,
      action: PayloadAction<IComment[]>
    ) => {
      if (state.newComment) {
        state.commentList = [state.newComment, ...action.payload];
        state.isLoading = false;
      }
      if (state.editedComment) {
        const updatedCommentList = state.commentList.map(
          (commentItem: IComment) => {
            if (commentItem.id === state.editedComment?.id)
              return state.editedComment;
            return commentItem;
          }
        );
        state.commentList = updatedCommentList;
        state.isLoading = false;
      }
      state.commentList = [...action.payload];
      state.isLoading = false;
    },
    [getCommentList.rejected.toString()]: (state: CommentState) => {
      state.isLoading = false;
    },

    //deleteComentById
    [deleteCommentById.pending.toString()]: (state: CommentState) => {
      state.isLoading = true;
    },
    [deleteCommentById.fulfilled.toString()]: (
      state: CommentState,
      action: PayloadAction<number>
    ) => {
      const commentListAfterDeleting = state.commentList.filter(
        (commentItem: IComment) => commentItem.id !== action.payload
      );
      state.commentList = [...commentListAfterDeleting];
      state.isLoading = false;
    },
    [deleteCommentById.rejected.toString()]: (state: CommentState) => {
      state.isLoading = false;
    },

    //getCommentDetailById
    [getCommentDetailById.pending.toString()]: (state: CommentState) => {
      state.isLoading = true;
    },
    [getCommentDetailById.fulfilled.toString()]: (
      state: CommentState,
      action: PayloadAction<IComment>
    ) => {
      state.commentDetail = { ...action.payload };
      state.isLoading = false;
    },
    [getCommentDetailById.rejected.toString()]: (state: CommentState) => {
      state.isLoading = false;
    },

    //updateComentById
    [updateCommentById.pending.toString()]: (state: CommentState) => {
      state.isLoading = true;
    },
    [updateCommentById.fulfilled.toString()]: (
      state: CommentState,
      action: PayloadAction<IComment>
    ) => {
      state.editedComment = { ...action.payload };
      state.isLoading = false;
    },
    [updateCommentById.rejected.toString()]: (state: CommentState) => {
      state.isLoading = false;
    },

    //addNewComment
    [addNewCommentToDB.pending.toString()]: (state: CommentState) => {
      state.isLoading = true;
    },
    [addNewCommentToDB.fulfilled.toString()]: (
      state: CommentState,
      action: PayloadAction<IComment>
    ) => {
      state.newComment = { ...action.payload };
      state.isLoading = false;
    },
    [addNewCommentToDB.rejected.toString()]: (state: CommentState) => {
      state.isLoading = false;
    },
  },
});

export const { changeCommentInputValue } = commentSlice.actions;

export default commentSlice.reducer;
