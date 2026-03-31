import TaskForm from "@/Components/TaskForm";
import { createTask } from "../../api/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/store";

export default function NewTask() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: (data) => createTask(data, accessToken),

    onSuccess: () => {
      toast.success("Task created successfully");
      // ✅ go back to list
      navigate("/alltask");

      // ✅ refresh task list
      queryClient.invalidateQueries(["tasks"]);

      
    },

    onError: () => {
      toast.error("Failed to create task");
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data); // send to backend
  };

  return (
    <div className="mx-auto max-w-[1100px] px-4 mt-15">
      <TaskForm
        onSubmit={handleSubmit}
        buttonText={mutation.isPending ? "Creating..." : "Create Task"}
      />
    </div>
  );
}




// import { useState } from "react";
// import { RiArrowDownSLine } from "@remixicon/react";
// import { Link } from "react-router";
// // import { TASK_PRIORITY } from "@/utils/constants";
// import { TASK_PRIORITY } from "../../Utils/constants";

// export default function TaskForm({ initialData, onSubmit }) {
//   const [formData, setFormData] = useState({
//     title: initialData?.title || "",
//     description: initialData?.description || "",
//     priority: initialData?.priority || "Urgent, ",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div className="mx-auto max-w-[1100px] px-4 mt-15 ">
//       <h1 className="font-semibold text-2xl">
//         <Link to="/alltask"> &lt; New Task</Link>
//       </h1>

//       <form onSubmit={handleSubmit}>
//         {/* TASK TITLE */}
//         <div className="relative w-full mt-10">
//           <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700">
//             Task Title
//           </label>
//           <textarea
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter your task here..."
//             className="w-full h-20 border border-gray-300 rounded p-4 pt-6 text-sm"
//           />
//         </div>

//         {/* DESCRIPTION */}
//         <div className="relative w-full mt-10">
//           <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Briefly describe your task..."
//             className="w-full h-60 border border-gray-300 rounded p-4 pt-6 text-sm"
//           />
//         </div>

//         {/* TAGS  */}
//         <div className="w-full mt-10 relative">
//           <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700 z-10">
//             Tags
//           </label>

//           <textarea
//             value={formData.priority}
//             readOnly
//             className="w-full h-20 border border-gray-300 rounded-md p-4 pt-6 text-sm"
//           />

//           <div className="absolute top-4 right-4 dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn-lg  ">
//               <RiArrowDownSLine size={40} />
//             </div>

//             <ul
//               tabIndex={-1}
//               className="dropdown-content menu bg-base-100 rounded-box w-40 p-2 shadow-md"
//             >
//               {TASK_PRIORITY.map((tag, index) => (
//                 <li key={index}>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         priority: tag,
//                       }))
//                     }
//                   >
//                     {tag}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="flex justify-center mt-12">
//           <button
//             type="submit"
//             className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold rounded-lg"
//           >
//             Done
//           </button>
//         </div>
//       </form>
//       <Link to="/tasks" className=" flex justify-center mt-15 mb-10 underline">
//         {" "}
//         Back To Top{" "}
//       </Link>
//     </div>
//   );
// }
