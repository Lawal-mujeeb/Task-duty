import { TASK_PRIORITY } from "@/Utils/constants";
import { useState, useEffect } from "react";
// import { TASK_PRIORITY } from "@/utils/constants";

export default function TaskForm({ initialData, onSubmit, buttonText }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Urgent",
  });

  // ✅ Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || initialData.tag || "Urgent",
      });
    }
  }, [initialData]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    if (!formData.title.trim()) {
      alert("Task title is required");
      return;
    }

    onSubmit(formData); // send to parent (API call happens there)
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
          className="w-full h-20 border border-gray-300 rounded p-4 pt-6 text-[12px] font-semibold]"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="relative w-full mt-10">
        <label className="absolute -top-2 left-4 bg-white px-1 text-[12px] font-normal text-gray-700">
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

      {/* PRIORITY */}
      <div className="w-full mt-10 relative">
        <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700 z-10">
          Tags
        </label>

        {/* Display selected priority */}
        <textarea
          value={formData.priority}
          readOnly
          className="w-full h-20 border border-gray-300 rounded-md p-4 pt-6 text-sm"
        />

        {/* Dropdown */}
        <div className="absolute top-4 right-5 dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className=" md:text-3xl  hover:translate-y-1"
          >
        ⌄
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
          {buttonText || "Submit"}
        </button>
      </div>
    </form>
  );
}