import React, { useEffect, useState } from "react";
import LeaveRequestItem from "./LeaveRequestItem";
import LeaveRequestCreateModal from "./LeaveRequestCreateModal";
import Cookies from "js-cookie";
import axios from "axios";
import { FaSort } from "react-icons/fa";

const LeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [role, setRole] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    setRole(Cookies.get("role"));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (Cookies.get("role") === "Employee") {
        const response = await axios.get(
          "http://localhost:3001/leave_request/by_employee?Employee=" +
            Cookies.get("id")
        );
        setRequests(response.data);
      } else {
        const response = await axios.get("http://localhost:3001/leave_request");
        setRequests(response.data);
      }
    } catch (error) {
      setRequests([]);
    }
  };

  const handleUpdateRequests = () => {
    fetchData();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    handleUpdateRequests();
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedRequests = [...requests];
  if (sortConfig.key) {
    sortedRequests.sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  return (
    <div className="p-4 relative h-full">
      <div className="overflow-x-auto h-full">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">
                <button
                  className="flex  flex-1 items-center"
                  onClick={() => handleSort("ID")}
                >
                  ID
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">
                <button
                  className="flex  flex-1 items-center"
                  onClick={() => handleSort("Leave_Request_Employee.Full_Name")}
                >
                  Employee
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">
                <button
                  className="flex  flex-1 items-center"
                  onClick={() =>
                    handleSort("Leave_Request_Absence_Reason.Title")
                  }
                >
                  Absence Reason
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">
                <button
                  className="flex  flex-1 items-center"
                  onClick={() => handleSort("Start_Date")}
                >
                  Start Date
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">
                <button
                  className="flex  flex-1 items-center"
                  onClick={() => handleSort("End_Date")}
                >
                  End Date
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">Comment</th>
              <th className="border px-4 py-2">
                <button
                  className="flex  flex-1 items-center"
                  onClick={() => handleSort("Leave_Request_Status.Title")}
                >
                  Status
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests.map((request) => (
              <LeaveRequestItem
                key={request.ID}
                id={request.ID}
                employee={request.Leave_Request_Employee.Full_Name}
                absenceReason={request.Leave_Request_Absence_Reason.Title}
                startDate={request.Start_Date}
                endDate={request.End_Date}
                comment={request.Comment}
                status={request.Leave_Request_Status.Title}
                statusId={request.Leave_Request_Status.ID}
                role={role}
                onUpdate={handleUpdateRequests}
              />
            ))}
          </tbody>
        </table>
      </div>
      {role === "Employee" && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleModalOpen}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg transition duration-300"
          >
            Create New Leave Request
          </button>
        </div>
      )}
      <LeaveRequestCreateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleUpdateRequests}
      />
    </div>
  );
};

export default LeaveRequests;
