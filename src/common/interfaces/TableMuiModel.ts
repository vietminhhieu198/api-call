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

export type IFunction = "empty" | "add new" | "edit" | "delete";
