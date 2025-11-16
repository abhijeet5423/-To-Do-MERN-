import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todos";
import { useAuthStore } from "../stores/useAuthStore";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import type { Todo } from "../types";
import "../styles/todopage.css"; // Import the unified CSS

export default function TodosPage() {
  const token = useAuthStore((s) => s.token);

  const query = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(token!),
    enabled: !!token,
  });

  const todos = query.data ?? [];

  if (!token) return <p>Please login</p>;
  if (query.isLoading) return <p>Loading...</p>;

  return (
    <div className="todo-page-container">
      <div className="todo-card">
        <h2 className="todo-title">Your Todos</h2>
        <AddTodo />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}
