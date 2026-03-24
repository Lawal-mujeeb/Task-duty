import TaskForm from "@/Components/TaskForm";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSingleTask, updateTask } from "../../api/task";
import { toast } from "sonner";
import { LazyLoader } from "@/Components/LazyLoader";

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch task by ID
  const { data: task, isLoading, isError } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getSingleTask(id),
  });

  // Mutation to update task
  const mutation = useMutation({
  mutationFn: (data) => updateTask({ id, data }), // ✅ pass as object
  onSuccess: () => {
    toast.success("Task updated successfully");
    queryClient.invalidateQueries(["tasks"]);
    navigate("/alltask");
  },
  onError: () => toast.error("Failed to update task"),
});
  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <LazyLoader />;
  if (isError) return <p>Error fetching task</p>;

  return (
    <div className="mx-auto max-w-[1100px] px-4 mt-15">
      <a className="font-semibold text-2xl" href="/alltask">&lt; Edit</a>
      

      <TaskForm
        initialData={task}
        onSubmit={handleSubmit}
        buttonText="Update Task"
      />
    </div>
  );
}
// import { useState, useEffect } from "react";
// import { TASK_PRIORITY } from "../../Utils/constants";
// import { Link, NavLink } from "react-router";
// import { RiArrowDownSLine } from "@remixicon/react";

// export default function EditTask({ initialData, onSubmit }) {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     priority: "Urgent",
//   });

//   // ✅ VERY IMPORTANT: sync initialData like your tutor’s setValue
//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         title: initialData.title || "",
//         description: initialData.description || "",
//         priority: initialData.priority || "Urgent",
//       });
//     }
//   }, [initialData]);

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
      
//       {/* Back */}
//       <Link to="/alltask" className="font-semibold text-2xl">
//         &lt; Edit Tasks
//       </Link>

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

//         {/* PRIORITY */}
//         <div className="w-full mt-10 relative">
//           <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700 z-10">
//             Tags
//           </label>

//           <textarea
//             value={formData.priority}
//             readOnly
//             className="w-full h-20 border border-gray-300 rounded-md p-4 pt-6 text-sm"
//           />

//           {/* DROPDOWN */}
//           <div className="absolute top-4 right-4 dropdown dropdown-end">
//             <div tabIndex={0} role="button">
//               <RiArrowDownSLine size={30} />
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

//         {/* SUBMIT */}
//         <div className="flex justify-center mt-12">
//           <button
//             type="submit"
//             className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold rounded-lg"
//           >
//             Done
//           </button>
//         </div>
//       </form>

//       <NavLink
//         to="/alltask"
//         className="flex justify-center mt-15 mb-10 underline"
//       >
//         Back To Tasks
//       </NavLink>
//     </div>
//   );
// }




// // import { useState } from "react";
// // import { TASK_PRIORITY } from "../../Utils/constants";
// // import { Link, NavLink} from "react-router";
// // import { RiArrowDownSLine } from "@remixicon/react";


// // export default function TaskForm({ initialData, onSubmit }) {
// //   const [formData, setFormData] = useState({
// //     title: initialData?.title || "",
// //     description: initialData?.description || "",
// //     priority: initialData?.priority || "Urgent, ",
// //   });

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit(formData);
// //   };

// //   return (
// //       <div className="mx-auto max-w-[1100px] px-4 mt-15 ">
// //          <Link to="/alltask" className="font-semibold text-2xl">
// //           &lt; Edit Tasks
// //         </Link>
        
// //     <form onSubmit={handleSubmit}>
      
// //       {/* TASK TITLE */}
// //       <div className="relative w-full mt-10">
        
// //         <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700">
// //           Task Title
// //         </label>
// //         <textarea
// //           name="title"
// //           value={formData.title}
// //           onChange={handleChange}
// //           placeholder="Enter your task here..."
// //           className="w-full h-20 border border-gray-300 rounded p-4 pt-6 text-sm"
// //         />
// //       </div>

// //       {/* DESCRIPTION */}
// //       <div className="relative w-full mt-10">
// //         <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700">
// //           Description
// //         </label>
// //         <textarea
// //           name="description"
// //           value={formData.description}
// //           onChange={handleChange}
// //           placeholder="Briefly describe your task..."
// //           className="w-full h-60 border border-gray-300 rounded p-4 pt-6 text-sm"
// //         />
// //       </div>

// //       {/* TAGS / PRIORITY */}
// //       <div className="w-full mt-10 relative">
// //         <label className="absolute -top-2 left-4 bg-white px-1 text-sm text-gray-700 z-10">
// //           Tags
// //         </label>

       
// //         <textarea
// //           value={formData.priority}
// //           readOnly
// //           className="w-full h-20 border border-gray-300 rounded-md p-4 pt-6 text-sm"
// //         />

// //         {/* DROPDOWN */}
// //         <div className="absolute top-4 right-4 dropdown dropdown-end">
// //           <div
// //             tabIndex={0}
// //             role="button"
// //             className="btn-lg  "
// //           >
// //             <RiArrowDownSLine size={40} />
// //           </div>

// //           <ul
// //             tabIndex={-1}
// //             className="dropdown-content menu bg-base-100 rounded-box w-40 p-2 shadow-md"
// //           >
// //             {TASK_PRIORITY.map((tag, index) => (
// //               <li key={index}>
// //                 <button
// //                   type="button"
// //                   onClick={() =>
// //                     setFormData((prev) => ({
// //                       ...prev,
// //                       priority: tag,
// //                     }))
// //                   }
// //                 >
// //                   {tag}
// //                 </button>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>

// //       {/* SUBMIT BUTTON */}
// //       <div className="flex justify-center mt-12">
// //         <button
// //           type="submit"
// //           className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white text-lg font-semibold rounded-lg"
// //         >
// //         Done
// //         </button>
// //       </div>
// //     </form>
// //      <NavLink to="/tasks" className=" flex justify-center mt-15 mb-10 underline">  Back To Top </NavLink>
// //     </div>
// //   );
// // }