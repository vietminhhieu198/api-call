import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routerPath } from "../../common/constants/routerPath";
import { Navbar } from "../../components/Navbar/Navbar";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(routerPath.data.USER_LIST);
  }, [navigate]);

  return <Navbar />;
};
