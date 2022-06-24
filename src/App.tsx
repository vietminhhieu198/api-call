import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { routerList } from "./common/config/routers/routerList";
import { routerPath } from "./common/constants/routerPath";
import { IRoute } from "./common/interfaces/RouterModel";
import "./common/sass/App.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008c7a",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {routerList.map((route: IRoute, index: number) => {
            return (
              <Route path={route.path} element={route.element} key={index} />
            );
          })}
          <Route path="*" element={<Navigate to={routerPath.common.HOME} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
