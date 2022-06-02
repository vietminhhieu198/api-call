export const routerPath = {
  data: {
    USER_LIST: "/users/",
    USER_DETAIL: "/users/:id",
    USER_NEW: "/new/user",
    COMMENT_LIST: "/comments/",
    COMMENT_DETAIL: "/comments/:id",
    COMMENT_NEW: "/new/comment",
  },
  common: {
    HOME: "/",
  },
  test: {
    TEST: "/test",
  },
};

export const getAllPathArrayName = (): string[] => {
  const arrayResult: string[] = [];

  for (const [, value] of Object.entries(routerPath)) {
    if (typeof value === "object") {
      for (const [, secondValue] of Object.entries(value)) {
        arrayResult.push(secondValue);
      }
    } else if (typeof value === "string") {
      arrayResult.push(value);
    }
  }

  return arrayResult;
};
