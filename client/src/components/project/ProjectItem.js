import React, { useState } from "react";
import ProjectEditModal from "./ProjectEditModal";
import ProjectDetailModal from "./ProjectDetailModal";
import axios from "axios";

const ProjectItem = ({
  id,
  projectType,
  startDate,
  endDate,
  projectManager,
  comment,
  status,
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

  const handleDeactivate = async () => {
    try {
      await axios.put("http://localhost:3001/project/status", {
        id,
        status: "Deactivated",
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
    newProjectType
  ) => {
    try {
      await axios.put("http://localhost:3001/project", {
        id,
        projectType: newProjectType,
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
      <td className="border px-4 py-2">{projectType}</td>
      <td className="border px-4 py-2">{startDate}</td>
      <td className="border px-4 py-2">{endDate}</td>
      <td className="border px-4 py-2">{projectManager}</td>
      <td className="border px-4 py-2 whitespace-wrap">
        {renderComment(comment)}
      </td>
      <td className="border px-4 py-2">{status}</td>
      <td className="border px-4 py-2">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={handleOpen}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded"
          >
            Open
          </button>
          {role === "Project Manager" && (
            <>
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={status !== "Active"}
              >
                Edit
              </button>
              <button
                onClick={handleDeactivate}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={status === "Deactivated"}
              >
                Deactivate
              </button>
            </>
          )}
        </div>
      </td>
      {isEditModalOpen && (
        <ProjectEditModal
          id={id}
          initialComment={comment}
          initialStartDate={startDate}
          initialEndDate={endDate}
          initialProjectType={projectType}
          onSave={handleSaveChanges}
          onClose={handleCloseEditModal}
        />
      )}
      {isDetailsModalOpen && (
        <ProjectDetailModal
          id={id}
          comment={comment}
          startDate={startDate}
          endDate={endDate}
          projectType={projectType}
          projectManager={projectManager}
          status={status}
          onClose={handleCloseDetailsModal}
        />
      )}
    </tr>
  );
};

export default ProjectItem;
