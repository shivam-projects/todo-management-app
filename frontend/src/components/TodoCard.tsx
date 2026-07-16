import type { Todo } from "../types/todo";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoCard({
  todo,
  onDelete,
  onToggle,
  onEdit,
}: TodoCardProps) {
  return (
    <div className="todo-card">
      <h3>{todo.title}</h3>

      <p>{todo.description}</p>

      <p>
  <strong>Priority:</strong>{" "}

  <span className={`priority ${todo.priority.toLowerCase()}`}>
    {todo.priority}
  </span>
</p>

      <p>
        <strong>Status:</strong>{" "}
        <span className={todo.completed ? "completed" : "pending"}>
          {todo.completed ? "Completed" : "Pending"}
        </span>
      </p>

      <div className="actions">
        <button onClick={() => onToggle(todo)}>
          {todo.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        <button onClick={() => onEdit(todo)}>
          Edit
        </button>

        <button
          onClick={() =>
            (window.location.href = `/todo.html?id=${todo.id}`)
          }
        >
          View
        </button>

        <button onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}