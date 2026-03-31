import { useState } from "react";
import { RiDeleteBinLine } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Modal from "./Modal";
import { deleteTask } from "@/api/task";
import { useAuth } from "../store";

export default function DeleteTask({ task }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: () => deleteTask(task._id, accessToken), // pass token for auth
    onSuccess: () => {
      toast.success("Task deleted successfully");
     
      queryClient.invalidateQueries(["tasks"]);
      setIsOpen(false);
      setError(null); // clear error on success
    },
    onError: (err) => {
      console.error(err);
      const msg = err?.response?.data?.message || "Failed to delete task";
      setError(msg);
   
    },
  });

  const handleDelete = () => {
    setError(null); // clear any previous error before deleting
    mutation.mutate();
  };

  return (
    <>
      <button
        className="btn btn-outline  bg-white-500 hover:bg-red-600 text-[#974FD0] w-full md:w-[150px] mt-5"
        onClick={() => setIsOpen(true)}
      >
        <RiDeleteBinLine size={20} /> Delete
      </button>

      <Modal
        id={`delete-task-${task._id}`}
        isOpen={isOpen}
        classname="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <RiDeleteBinLine size={40} className="text-red-500" />
          <h1 className="text-2xl font-bold">Delete Task</h1>
          <p className="text-center">
            Are you sure you want to delete <strong>{task.title}</strong>?
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-4 mb-2 flex gap-2">
            <button
              type="button"
              className="btn btn-outline w-[150px] border-gray-500"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn bg-red-500 hover:bg-red-600 text-white w-[150px]"
              onClick={handleDelete}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
