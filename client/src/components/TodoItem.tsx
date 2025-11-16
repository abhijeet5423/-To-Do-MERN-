import type { Todo } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo, deleteTodo } from "../api/todos";
import { useAuthStore } from "../stores/useAuthStore";

type Props = { todo: Todo };

export default function TodoItem({ todo }: Props) {
  const token = useAuthStore((s) => s.token);
  const qc = useQueryClient();

  const toggleMut = useMutation({
    mutationFn: () => updateTodo(token!, todo._id, { completed: !todo.completed }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteMut = useMutation({
    mutationFn: () => deleteTodo(token!, todo._id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleMut.mutate()}
        disabled={toggleMut.status === "pending"}
      />
      <span>{todo.title}</span>
      <button onClick={() => deleteMut.mutate()} disabled={deleteMut.status === "pending"}>
        {deleteMut.status === "pending" ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
}
