// import Modal from "@/components/Modal";
// import { useEffect, useState } from "react";
// import { RiCloseLine, RiEditBoxLine } from "@remixicon/react";
// import { useForm } from "react-hook-form";

// export default function EditTaskModal({ task, tasks, setTasks }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [msg, setMsg] = useState("");

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { isSubmitting },
//   } = useForm();

//   // preload values
//   useEffect(() => {
//     if (task) {
//       setValue("title", task.title);
//       setValue("description", task.description);
//       setValue("priority", task.priority);
//     }
//   }, [task, setValue]);

//   const toggleDrawer = () => setIsOpen(!isOpen);

//   const priorities = ["Urgent", "Important", "Normal"];

//   const onSubmit = (data) => {
//     const updatedTasks = tasks.map((t) =>
//       t.id === task.id ? { ...t, ...data } : t
//     );

//     setTasks(updatedTasks);
//     setMsg("Task updated successfully!");
//     setSuccess(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setSuccess(false);
//   };

//   return (
//     <>
//       {/* 🔥 THIS MATCHES YOUR UI BUTTON */}
//       <button
//         className="flex items-center gap-2 border px-4 py-1 rounded-md btn  bg-[#974FD0] text-white    mt-5  "
//         onClick={() => setIsOpen(true)}
//       >
//         <RiEditBoxLine />
//         Edit
//       </button>

//       <Modal
//         isOpen={isOpen}
//         classname="bg-white p-4 rounded-xl shadow w-[90%] md:max-w-[500px] mx-auto"
//       >
//         {success ? (
//           <div className="p-4 text-center">
//             <img src="/Success.svg" alt="success" className="w-full h-[200px]" />
//             <h1 className="text-2xl font-bold">Done!</h1>
//             <p className="text-gray-600">{msg}</p>
//             <button
//               className="btn my-4 bg-blue-500 hover:bg-blue-600 text-white"
//               onClick={handleClose}
//             >
//               Continue
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
//             <h1 className="text-xl font-semibold">Edit Task</h1>

//             {/* Title */}
//             <div>
//               <label className="text-sm text-gray-600">Task Title</label>
//               <input
//                 {...register("title")}
//                 className="mt-1 w-full border rounded-lg px-3 py-2"
//                 placeholder="Task title"
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="text-sm text-gray-600">Description</label>
//               <textarea
//                 {...register("description")}
//                 className="mt-1 w-full border rounded-lg px-3 py-2"
//                 placeholder="Task description"
//               />
//             </div>

//             {/* Priority */}
//             <div>
//               <label className="text-sm text-gray-600">Priority</label>
//               <select
//                 {...register("priority")}
//                 className="mt-1 w-full border rounded-lg px-3 py-2"
//               >
//                 {priorities.map((p) => (
//                   <option key={p} value={p}>
//                     {p}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Close icon */}
//             <button
//               type="button"
//               className="absolute right-2 top-4"
//               onClick={toggleDrawer}
//             >
//               <RiCloseLine size={20} />
//             </button>

//             {/* Actions */}
//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 type="button"
//                 onClick={() => setIsOpen(false)}
//                 className="border px-4 py-2 rounded-md"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
//                 disabled={isSubmitting}
//               >
//                 Update
//               </button>
//             </div>
//           </form>
//         )}
//       </Modal>
//     </>
//   );
// }