import axios from "axios";
import React, { useEffect, useState } from "react";

const LeaveRequestEditModal = ({
  id,
  initialComment,
  initialStartDate,
  initialEndDate,
  initialAbsenceReason,
  onSave,
  onClose,
}) => {
  const [comment, setComment] = useState(initialComment);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [absenceReason, setAbsenceReason] = useState(initialAbsenceReason);
  const [absenceReasons, setAbsenceReasons] = useState([]);

  useEffect(() => {
    fetchAbsenceReasons();
  }, []);

  const fetchAbsenceReasons = async () => {
    try {
      const response = await axios.get("http://localhost:3001/absence_reason");
      setAbsenceReasons(response.data); // Assuming the response data is an array of objects { id, name }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    const reasonId = absenceReasons.find((el) => el.Title === absenceReason).ID;
    onSave(id, comment, startDate, endDate, reasonId);
    onClose();
  };

  const handleAbsenceReasonChange = (e) => {
    setAbsenceReason(e.target.value);
  };

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
                  Edit Leave Request
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="3"
                    className="resize-none border rounded-md w-full py-2 px-3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      type="date"
                      className="border rounded-md w-full py-2 px-3"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      End Date
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      type="date"
                      className="border rounded-md w-full py-2 px-3"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="absenceReason"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Absence Reason
                  </label>
                  <select
                    id="absenceReason"
                    name="absenceReason"
                    className="border rounded-md w-full py-2 px-3"
                    value={absenceReason}
                    onChange={handleAbsenceReasonChange}
                  >
                    {absenceReasons.map((reason) => (
                      <option key={reason.ID} value={reason.Title}>
                        {reason.Title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSave}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestEditModal;
