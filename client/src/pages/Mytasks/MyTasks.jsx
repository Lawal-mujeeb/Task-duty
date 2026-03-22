import { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router"
;

// import AddTaskModal from "../Features/AddTaskModal";
import TaskCard from "./TaskCard";

export default function MyTasks() {
  const navigate = useNavigate();
  // ✅ dynamic tasks (replace your static cards)
  const handleNew = () => {
    navigate("/newtask");;
  };
  

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "FinTech Website Update",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.",
      priority: "Urgent",
    },
    {
      id: 2,
      title: "Agro Website Update",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.",
      priority: "Important",
    },
    {
      id: 3,
      title: "Mobile App Fix",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.",
      priority: "Urgent",
    },
    {
      id: 4,
      title: "UI Improvements",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.",
      priority: "Important",
    },
  ]);

  return (
    <>
    
      <div className="mx-auto max-w-[1100px] px-4 mt-8 flex items-center justify-between font-semibold">
        <h1 className="text-2xl font-semibold">My Task</h1>
        <button
          onClick={handleNew}
          className="  hover:text-[#1E5FCC] text-[#974FD0]"
        >
           &lt;Add New Task
        </button>

        {/* <AddTaskModal setTasks={setTasks} /> */}
      </div>

      {/* Tasks List */}
      <div className="px-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
        ))}

      
        <NavLink
          to="/tasks"
          className="flex justify-center mt-15 mb-10 underline"
        >
          Back To Top
        </NavLink>
      </div>
    </>
  );
}