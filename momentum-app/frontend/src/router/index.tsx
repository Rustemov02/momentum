import Layout from "@/layouts/Layout";
import Notes from "@/pages/Notes";
import Tags from "@/pages/Tags";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/notes" replace />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "tags",
        element: <Tags />,
      },
    ],
  },
]);
