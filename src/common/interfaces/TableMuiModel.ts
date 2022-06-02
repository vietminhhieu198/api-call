export type IdUserType =
  | "id"
  | "name"
  | "username"
  | "email"
  | "address"
  | "phone";

export interface IUserColumn {
  id: IdUserType;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface IUserDataTable {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
}

export type IdCommentType = "id" | "postId" | "name" | "email" | "body";

export interface ICommentColumn {
  id: IdCommentType;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface ICommentDataTable {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type IFunctionSB = "empty" | "add new" | "edit" | "delete";
