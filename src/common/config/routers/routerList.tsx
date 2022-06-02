import { HomePage } from "../../../pages/Home/HomePage";
import { Test } from "../../../pages/Test/Test";
import { NewUserPage } from "../../../pages/User/NewUser/NewUserPage";
import { UserDetailPage } from "../../../pages/User/UserDetail/UserDetailPage";
import { UserListPage } from "../../../pages/User/UserList/UserListPage";
import { routerPath } from "../../constants/routerPath";
import { IRoute } from "../../interfaces/RouterModel";

export const routerList: IRoute[] = [
  {
    path: routerPath.common.HOME,
    element: <HomePage />,
  },
  {
    path: routerPath.data.USER_LIST,
    element: <UserListPage />,
  },
  {
    path: routerPath.data.USER_DETAIL,
    element: <UserDetailPage />,
  },
  {
    path: routerPath.data.NEW_USER,
    element: <NewUserPage />,
  },
  {
    path: routerPath.test.TEST,
    element: <Test />,
  },
];
