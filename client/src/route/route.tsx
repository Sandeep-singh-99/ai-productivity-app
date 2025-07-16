import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "@/page/Home";
import Dashboard from "@/page/Dashboard";
import AppHome from "@/page/AppHome";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <AppHome />,
      },
    ],
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default routes;
