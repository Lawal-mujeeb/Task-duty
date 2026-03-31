import TaskForm from "@/Components/TaskForm";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSingleTask, updateTask } from "../../api/task";
import { toast } from "sonner";
import { LazyLoader } from "@/Components/LazyLoader";
import { useAuth } from "@/store";


export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  // Fetch task by ID
  const { data: task, isLoading, isError } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getSingleTask(id, accessToken),
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
