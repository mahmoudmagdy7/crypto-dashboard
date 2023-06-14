/* eslint-disable no-unused-vars */
import { RouterProvider, createHashRouter } from "react-router-dom";
import React from "react";
import Layout from "./Components/Layout";
import Transactions from "./Components/Home";
import Dashboard from "./Dashboard";
import Data from "./Data";
import Notfound from "./Notfound";
export default function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Transactions />,
        },
        {
          path: "/:walletId",
          element: <Dashboard />,
        },
      ],
    },
    { path: "*", element: <Notfound /> },
  ]);

  return (
    <>
      <Data>
        <RouterProvider router={router} />
      </Data>
    </>
  );
}
