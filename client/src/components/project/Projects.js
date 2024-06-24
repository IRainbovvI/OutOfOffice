import React, { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
import ProjectCreateModal from "./ProjectCreateModal";
import Cookies from "js-cookie";
import axios from "axios";
import { FaSort } from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    setRole(Cookies.get("role"));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/project");
      setProjects(response.data);
    } catch (error) {
      setProjects([]);
    }
  };

  const handleUpdateProjects = () => {
    fetchData();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    handleUpdateProjects();
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

  const sortedProjects = [...projects];
  if (sortConfig.key) {
    sortedProjects.sort((a, b) => {
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
                  className="flex flex-1 items-center"
                  onClick={() => handleSort("ID")}
                >
                  ID
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">
                <button
                  className="flex flex-1 items-center"
                  onClick={() => handleSort("ProjectType.Title")}
                >
                  Project Type
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">
                <button
                  className="flex flex-1 items-center"
                  onClick={() => handleSort("Start_Date")}
                >
                  Start Date
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">
                <button
                  className="flex flex-1 items-center"
                  onClick={() => handleSort("End_Date")}
                >
                  End Date
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">
                <button
                  className="flex flex-1 items-center"
                  onClick={() => handleSort("ProjectManager.Full_Name")}
                >
                  Project Manager
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">Comment</th>
              <th className="border px-4 py-2">
                <button
                  className="flex flex-1 items-center"
                  onClick={() => handleSort("Status")}
                >
                  Status
                  <FaSort />
                </button>
              </th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((project) => (
              <ProjectItem
                key={project.ID}
                id={project.ID}
                projectType={project.ProjectType.Title}
                startDate={project.Start_Date}
                endDate={project.End_Date}
                projectManager={project.ProjectManager.Full_Name}
                comment={project.Comment}
                status={project.Status}
                role={role}
                onUpdate={handleUpdateProjects}
              />
            ))}
          </tbody>
        </table>
      </div>
      {role === "Project Manager" && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleModalOpen}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg transition duration-300"
          >
            Create New Project
          </button>
        </div>
      )}
      <ProjectCreateModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleUpdateProjects}
      />
    </div>
  );
};

export default Projects;
