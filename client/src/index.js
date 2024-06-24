import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LogIn from "./components/LogIn";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Employees from "./components/Employees";
import LeaveRequests from "./components/leave_request/LeaveRequests";
import ApprovalRequest from "./components/ApprovalRequest";
import Projects from "./components/project/Projects";
import ProtectedRoute from "./components/ProtectedRoute";
import Cookies from "js-cookie";

const router = createBrowserRouter([
  { path: "/", element: <LogIn />, errorElement: <ErrorPage /> },
  {
    path: "lists",
    element: <Home />,
    children: [
      {
        path: "employees",
        element: (
          <ProtectedRoute allowedRoles={["Project Manager", "Manager"]}>
            <Employees />
          </ProtectedRoute>
        ),
      },
      {
        path: "leave_requests",
        element: (
          <ProtectedRoute
            allowedRoles={["Employee", "Project Manager", "HR Manager"]}
          >
            <LeaveRequests />
          </ProtectedRoute>
        ),
      },
      {
        path: "approval_requests",
        element: (
          <ProtectedRoute allowedRoles={["Project Manager", "HR Manager"]}>
            <ApprovalRequest />
          </ProtectedRoute>
        ),
      },
      {
        path: "projects",
        element: (
          <ProtectedRoute
            allowedRoles={["Employee", "Project Manager", "HR Manager"]}
          >
            <Projects />
          </ProtectedRoute>
        ),
      },
      {
        path: "logout",
        element: <Navigate to="/" replace />,
        loader: () => {
          Cookies.remove("user");
          Cookies.remove("role");
          return null;
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
