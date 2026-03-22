// // components/TaskCard.jsx
// import React from "react";
// import EditTaskModal from "./EditTaskModal";
// import Delete from "../../Components/Delete";

// export default function TaskCard({ task, tasks, setTasks }) {
//   return (
//     <div className="w-full mx-auto card bg-base-100 border border-gray-300 md:max-w-[1100px] mt-8 rounded-xl overflow-hidden">
//       <div className="card-body overflow-hidden">
        
//         <h2 className="card-title flex md:flex-row md:justify-between gap-3 border-b border-gray-300 pb-5">
          
          
//           <span
//             className={`text-sm font-semibold ${
//               task.priority === "Urgent"
//                 ? "text-red-500"
//                 : "text-green-500"
//             }`}
//           >
//             {task.priority}
//           </span>

//           <div className="card-actions flex gap-3 flex-wrap">
//             <EditTaskModal task={task} tasks={tasks} setTasks={setTasks} />
//             <Delete task={task} tasks={tasks} setTasks={setTasks} />
//           </div>
//         </h2>

//         <h1 className="text-2xl font-semibold">{task.title}</h1>
//         <p>{task.description}</p>

//       </div>
//     </div>
//   );
// }