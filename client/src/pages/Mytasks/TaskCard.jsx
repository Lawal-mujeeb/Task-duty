// components/TaskCard.jsx
import React from "react";
import { useNavigate } from "react-router";
import Delete from "../../Components/Delete";
import { RiEditBoxLine } from "@remixicon/react";

export default function TaskCard({ task, tasks, setTasks }) {
  const navigate = useNavigate();

 const handleEdit = () => {
  navigate(`/edittask/${task._id}`);
};


  return (
    <div className="w-full mx-auto card bg-base-100 border border-gray-300 md:max-w-[1100px] mt-8 rounded-xl overflow-hidden">
      <div className="card-body overflow-hidden">
        <h2 className="card-title flex md:flex-row md:justify-between gap-3 border-b border-gray-300 pb-5">
          <span
            className={`text-sm font-semibold ${
              task.priority === "Urgent"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {task.tag || task.priority}
          </span>

          <div className="card-actions flex gap-3 flex-wrap">
            {/* Replace modal with a button */}
            <button
              onClick={handleEdit}
              className="btn flex items-center md:mt-5 gap-1 text-white bg-fuchsia-400 hover:text-blue-700"
            >
              <RiEditBoxLine size={20} /> Edit
            </button>

            <Delete task={task} tasks={tasks} setTasks={setTasks} />
          </div>
        </h2>

        <h1 className="text-2xl font-semibold">{task.title}</h1>
        <p>{task.description}</p>
      </div>
    </div>
  );
}