import { useState } from "react";
import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import { RiCloseLine } from "@remixicon/react";

export default function AddTaskModal({ setTasks }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "Urgent",
    },
  });

  const onSubmit = (data) => {
    setTasks((prev) => [
      ...prev,
      {
        ...data,
        id: Date.now(),
      },
    ]);

    reset();
    setIsOpen(false);
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        className=" hover:bg-blue-100 text-[#974FD0] px-4 py-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        + Add New Task
      </button>

      {/* MODAL */}
      <Modal
        isOpen={isOpen}
        classname="bg-white p-6 rounded-xl shadow w-[90%] md:max-w-[550px] mx-auto relative"
      >
        {/* CLOSE BUTTON */}
        <button
          className="absolute right-3 top-3"
          onClick={() => setIsOpen(false)}
        >
          <RiCloseLine size={22} />
        </button>

        <h1 className="text-2xl font-bold mb-6">Create Task</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* TITLE */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              {...register("title", { required: true })}
              placeholder="Enter task title"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Enter task description"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 h-[120px]"
            />
          </div>

          {/* PRIORITY */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              {...register("priority")}
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="Urgent">Urgent</option>
              <option value="Important">Important</option>
              <option value="Normal">Normal</option>
            </select>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}