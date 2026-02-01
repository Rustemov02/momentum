import AuthGate from "@/components/Auth/AuthGate";
import Layout from "@/layouts/Layout";
import Notes from "@/pages/Notes";
import Tags from "@/pages/Tags";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/share/:token",
    element: <p>Public note</p>,
  },
  {
    path: "/",
    element: (
      <AuthGate>
        <Layout />
      </AuthGate>
    ),
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
