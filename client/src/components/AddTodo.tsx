import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todos";
import { useAuthStore } from "../stores/useAuthStore";

export default function AddTodo() {
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (title: string) => createTodo(token!, { title }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <form
      className="add-todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        const input = (e.target as HTMLFormElement).todo as HTMLInputElement;
        const value = input?.value?.toString().trim();
        if (!value) return;
        mutation.mutate(value);
        input.value = "";
      }}
    >
      <input name="todo" placeholder="Add todo..." />
      <button type="submit" disabled={mutation.status === "pending"}>
        {mutation.status === "pending" ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
