// src/components/TodoList.tsx
import type { Todo } from "../types";
import TodoItem from "./TodoItem";

type Props = { todos: Todo[] };

export default function TodoList({ todos }: Props) {
  return (
    <ul style={{ marginTop: 20 }}>
      {todos.map((t) => (
        <TodoItem key={t._id} todo={t} />
      ))}
    </ul>
  );
}
