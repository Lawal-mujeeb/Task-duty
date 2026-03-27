import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api/task";
import { LazyLoader } from "@/Components/LazyLoader";
import Search from "@/Components/Search";
import TaskCard from "./TaskCard";

export default function MyTasks() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const handleNew = () => {
    navigate("/newtask");
  };

  // ✅ Fetch tasks using search query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", query],
    queryFn: () => getTasks(query),
  });

  const tasks = data?.data || [];

  return (
    <>
      {/* SEARCH BAR */}
      <div className="mx-auto max-w-[1100px] px-4 mt-25 md:mt-6 flex justify-end">
        <Search id="task-search" />
      </div>

      {/* HEADER */}
      <div className="mx-auto max-w-[1100px] px-4 mt-6 flex items-center justify-between font-semibold">
        <h1 className="text-2xl font-semibold">My Task</h1>

        <button
          onClick={handleNew}
          className="hover:text-[#1E5FCC] text-[#974FD0]"
        >
          &lt; Add New Task
        </button>
      </div>

      {/* STATES */}
      <div className="mx-auto max-w-[1100px] px-4 mt-6">
        {isLoading && <LazyLoader />}
        {isError && <p>Error fetching tasks</p>}

        {!isLoading && tasks.length === 0 && (
          <p>{query ? "No matching tasks found." : "No tasks yet. Create one!"}</p>
        )}

        {/* TASK LIST */}
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}

        <NavLink
          to="/alltask"
          className="flex justify-center mt-15 mb-10 underline"
        >
          Back To Top
        </NavLink>
      </div>
    </>
  );
}


// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router"
// ;

// // import AddTaskModal from "../Features/AddTaskModal";
// import TaskCard from "./TaskCard";

// export default function MyTasks() {
//   const navigate = useNavigate();
//   // ✅ dynamic tasks (replace your static cards)
//   const handleNew = () => {
//     navigate("/newtask");;
//   };
  

//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       title: "FinTech Website Update",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.",
//       priority: "Urgent",
//     },
//     {
//       id: 2,
//       title: "Agro Website Update",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.",
//       priority: "Important",
//     },
//     {
//       id: 3,
//       title: "Mobile App Fix",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.",
//       priority: "Urgent",
//     },
//     {
//       id: 4,
//       title: "UI Improvements",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.",
//       priority: "Important",
//     },
//   ]);

//   return (
//     <>
    
//       <div className="mx-auto max-w-[1100px] px-4 mt-8 flex items-center justify-between font-semibold">
//         <h1 className="text-2xl font-semibold">My Task</h1>
//         <button
//           onClick={handleNew}
//           className="  hover:text-[#1E5FCC] text-[#974FD0]"
//         >
//            &lt;Add New Task
//         </button>

//         {/* <AddTaskModal setTasks={setTasks} /> */}
//       </div>

//       {/* Tasks List */}
//       <div className="px-4">
//         {tasks.map((task) => (
//           <TaskCard
//             key={task.id}
//             task={task}
//             tasks={tasks}
//             setTasks={setTasks}
//           />
//         ))}

      
//         <NavLink
//           to="/tasks"
//           className="flex justify-center mt-15 mb-10 underline"
//         >
//           Back To Top
//         </NavLink>
//       </div>
//     </>
//   );
// }