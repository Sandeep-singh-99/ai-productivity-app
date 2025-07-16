import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "@/page/Home";
import Dashboard from "@/page/Dashboard";
import AppHome from "@/page/AppHome";
import ArticlePage from "@/page/ArticlePage";
import BlogPage from "@/page/BlogPage";
import GImagePage from "@/page/GImagePage";
import RBackground from "@/page/RBackground";
import RObject from "@/page/RObject";
import ResumePage from "@/page/ResumePage";
import CommunityPage from "@/page/CommunityPage";

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
      {
        path: "article",
        element: <ArticlePage />
      },
      {
        path: "blog",
        element: <BlogPage />
      },
      {
        path: "g-image",
        element: <GImagePage />
      },
      {
        path: "r-background",
        element: <RBackground />
      },
      {
        path: "r-object",
        element: <RObject />
      },
      {
        path: "resume",
        element: <ResumePage />
      },
      {
        path: "community",
        element: <CommunityPage />
      }
    ],
  },
]);

export default routes;
