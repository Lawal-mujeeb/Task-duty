import { useState } from "react";
import { TASK_PRIORITY } from "@/utils/constants";

export default function TaskForm({ initialData, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    priority: initialData?.priority || "Urgent",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      
      {/* TASK TITLE */}
      <div className="relative w-full mt-10">
        <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700">
          Task Title
        </label>
        <textarea
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your task here..."
          className="w-full h-20 border border-gray-300 rounded p-4 pt-6 text-sm"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="relative w-full mt-10">
        <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Briefly describe your task..."
          className="w-full h-60 border border-gray-300 rounded p-4 pt-6 text-sm"
        />
      </div>

      {/* TAGS / PRIORITY */}
      <div className="w-full mt-10 relative">
        <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700 z-10">
          Tags
        </label>

        {/* DISPLAY SELECTED PRIORITY */}
        <textarea
          value={formData.priority}
          readOnly
          className="w-full h-20 border border-gray-300 rounded-md p-4 pt-6 text-sm"
        />

        {/* DROPDOWN */}
        <div className="absolute top-2 right-2 dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
          >
            ⬇️
          </div>

          <ul
            tabIndex={-1}
            className="dropdown-content menu bg-base-100 rounded-box w-40 p-2 shadow-md"
          >
            {TASK_PRIORITY.map((tag, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: tag,
                    }))
                  }
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-center mt-12">
        <button
          type="submit"
          className="w-full max-w-[600px] py-4 bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold rounded-lg"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}