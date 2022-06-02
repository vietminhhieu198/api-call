export const routerPath = {
  data: {
    USER_LIST: "/users/",
    USER_DETAIL: "/users/:id",
    TODO_LIST: "/todos/",
    TODO_DETAIL: "/todos/:id",
    NEW_TODO: "/new/todos",
    NEW_USER: "/new/users",
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
