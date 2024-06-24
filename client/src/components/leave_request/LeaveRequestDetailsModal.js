import React from "react";

const LeaveRequestDetailsModal = ({
  id,
  comment,
  startDate,
  endDate,
  absenceReason,
  employee,
  status,
  onClose,
}) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Leave Request Details
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Employee
                  </label>
                  <p className="text-sm text-gray-500">{employee}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <p className="text-sm text-gray-500">{startDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <p className="text-sm text-gray-500">{endDate}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Absence Reason
                  </label>
                  <p className="text-sm text-gray-500">{absenceReason}</p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Comment
                  </label>
                  <p className="text-sm text-gray-500">{comment}</p>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <p className="text-sm text-gray-500">{status}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestDetailsModal;
