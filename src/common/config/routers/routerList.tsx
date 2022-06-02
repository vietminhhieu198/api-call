import { CommentDetailPage } from "../../../pages/Comment/CommentDetail/CommentDetailPage";
import { CommentListPage } from "../../../pages/Comment/CommentList/CommentListPage";
import { NewCommentPage } from "../../../pages/Comment/NewComment/NewCommentPage";
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
    path: routerPath.data.USER_NEW,
    element: <NewUserPage />,
  },
  {
    path: routerPath.data.COMMENT_LIST,
    element: <CommentListPage />,
  },
  {
    path: routerPath.data.COMMENT_DETAIL,
    element: <CommentDetailPage />,
  },
  {
    path: routerPath.data.COMMENT_NEW,
    element: <NewCommentPage />,
  },
  {
    path: routerPath.test.TEST,
    element: <Test />,
  },
];
