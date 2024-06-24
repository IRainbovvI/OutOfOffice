import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = Cookies.get("role");
    setRole(userRole);

    if (userRole === "Employee") {
      navigate("/lists/leave_requests");
    } else if (userRole === "Project Manager" || userRole === "HR Manager") {
      navigate("/lists/employees");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="inset-y-0 left-0 flex items-center">
              <span className="text-white text-lg font-bold">
                Out of Office
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start ml-5">
              <div className="flex space-x-4">
                {role === "Employee" && (
                  <>
                    <NavLink
                      to="/lists/leave_requests"
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                          : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      Leave Requests
                    </NavLink>
                    <NavLink
                      to="/lists/projects"
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                          : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      Projects
                    </NavLink>
                  </>
                )}
                {(role === "Project Manager" || role === "HR Manager") && (
                  <>
                    <NavLink
                      to="/lists/employees"
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                          : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      Employees
                    </NavLink>
                    <NavLink
                      to="/lists/leave_requests"
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                          : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      Leave Requests
                    </NavLink>
                    <NavLink
                      to="/lists/approval_requests"
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                          : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      Approval Requests
                    </NavLink>
                    <NavLink
                      to="/lists/projects"
                      className={({ isActive }) =>
                        isActive
                          ? "text-white bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                          : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      }
                    >
                      Projects
                    </NavLink>
                  </>
                )}

                <NavLink
                  to="/lists/logout"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                      : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  }
                >
                  LogOut
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
