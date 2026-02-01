import AuthGate from "@/components/Auth/AuthGate";
import Layout from "@/layouts/Layout";
import Notes from "@/pages/Notes";
import SharedNotePage from "@/pages/SharedNotePage";
import Tags from "@/pages/Tags";
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/share/:token",
    element: <SharedNotePage />,
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
