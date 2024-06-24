import React, { useState } from "react";
import LeaveRequestEditModal from "./LeaveRequestEditModal";
import LeaveRequestDetailsModal from "./LeaveRequestDetailsModal";
import axios from "axios";

const LeaveRequestItem = ({
  id,
  employee,
  absenceReason,
  startDate,
  endDate,
  comment,
  status,
  statusId,
  role,
  onUpdate,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsDetailsModalOpen(true);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCancel = async () => {
    try {
      await axios.put("http://localhost:3001/leave_request/status", {
        id,
        status: "Canceled",
      });
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put("http://localhost:3001/leave_request/status", {
        id,
        status: "Submitted",
      });
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveChanges = async (
    id,
    newComment,
    newStartDate,
    newEndDate,
    newAbsenceReason
  ) => {
    try {
      await axios.put("http://localhost:3001/leave_request", {
        id,
        absenceReason: newAbsenceReason,
        startDate: newStartDate,
        endDate: newEndDate,
        comment: newComment,
      });
      onUpdate();
      setIsEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const renderComment = (comment) => {
    const maxLength = 30;
    if (comment.length > maxLength) {
      return `${comment.substring(0, maxLength)}...`;
    }
    return comment;
  };

  return (
    <tr className="bg-white hover:bg-gray-100">
      <td className="border px-4 py-2">{id}</td>
      <td className="border px-4 py-2">{employee}</td>
      <td className="border px-4 py-2">{absenceReason}</td>
      <td className="border px-4 py-2">{startDate}</td>
      <td className="border px-4 py-2">{endDate}</td>
      <td className="border px-4 py-2 whitespace-wrap">
        {renderComment(comment)}
      </td>
      <td className="border px-4 py-2">{status}</td>
      <td className="border px-4 py-2">
        {role === "Employee" && (
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={handleOpen}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded"
            >
              Open
            </button>
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={status !== "New"}
            >
              Edit
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={status !== "New"}
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={status === "Canceled" || status === "Declined"}
            >
              Cancel
            </button>
          </div>
        )}
        {(role === "Project Manager" || role === "HR Manager") && (
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={handleOpen}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded"
            >
              Open
            </button>
          </div>
        )}
      </td>
      {isEditModalOpen && (
        <LeaveRequestEditModal
          id={id}
          initialComment={comment}
          initialStartDate={startDate}
          initialEndDate={endDate}
          initialAbsenceReason={absenceReason}
          onSave={handleSaveChanges}
          onClose={handleCloseEditModal}
        />
      )}
      {isDetailsModalOpen && (
        <LeaveRequestDetailsModal
          id={id}
          comment={comment}
          startDate={startDate}
          endDate={endDate}
          absenceReason={absenceReason}
          employee={employee}
          status={status}
          onClose={handleCloseDetailsModal}
        />
      )}
    </tr>
  );
};

export default LeaveRequestItem;
