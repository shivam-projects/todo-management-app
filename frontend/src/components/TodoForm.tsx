import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";

interface TodoFormProps {
  onSubmit: (todo: {
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
  }) => void;

  editingTodo?: Todo | null;

  onCancelEdit?: () => void;
}

export default function TodoForm({
  onSubmit,
  editingTodo,
  onCancelEdit,
}: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<
    "Low" | "Medium" | "High"
  >("Medium");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setPriority(editingTodo.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onSubmit({
      title,
      description,
      priority,
    });

    if (!editingTodo) {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(
            e.target.value as "Low" | "Medium" | "High"
          )
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button type="submit">
          {editingTodo ? "Update Todo" : "Add Todo"}
        </button>

        {editingTodo && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={{
              background: "#999",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}