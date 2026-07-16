import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useMemo, useState } from "react";
import api from "../services/todo.api";
import type { Todo } from "../types/todo";
import TodoForm from "../components/TodoForm";
import TodoCard from "../components/TodoCard";
import "../styles/style.css";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const response = await api.get("/todos");

      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

const handleSubmitTodo = async (todo: {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
}) => {
  try {
    if (editingTodo) {
      await api.put(`/todos/${editingTodo.id}`, todo);
      setEditingTodo(null);
    } else {
      await api.post("/todos", todo);
    }

    fetchTodos();
  } catch (error) {
    console.error(error);
    alert("Unable to save todo.");
  }
};

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Delete this todo?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/todos/${id}`);

      fetchTodos();
    } catch (error) {
      console.error(error);
      alert("Unable to delete todo.");
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await api.put(`/todos/${todo.id}`, {
        completed: !todo.completed,
      });

      fetchTodos();
    } catch (error) {
      console.error(error);
      alert("Unable to update todo.");
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(search.toLowerCase()) ||
        todo.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : filter === "Completed"
          ? todo.completed
          : !todo.completed;

      return matchesSearch && matchesFilter;
    });
  }, [todos, search, filter]);

  return (
    <div className="container">

      <h1>Todo Application</h1>
      <div className="stats">

  <div className="stat-card">
    <h2>{todos.length}</h2>
    <p>Total</p>
  </div>

  <div className="stat-card">
    <h2>{todos.filter(t => t.completed).length}</h2>
    <p>Completed</p>
  </div>

  <div className="stat-card">
    <h2>{todos.filter(t => !t.completed).length}</h2>
    <p>Pending</p>
  </div>

</div>

      <TodoForm
  onSubmit={handleSubmitTodo}
  editingTodo={editingTodo}
  onCancelEdit={() => setEditingTodo(null)}
/>

      <div className="toolbar">

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>

      </div>

      {loading ? (
        <div
  style={{
    padding: 40,
    textAlign: "center",
  }}
>
  <h2> Loading Todos...</h2>
</div>
      ) : filteredTodos.length === 0 ? (
        <h3>No Todos Found</h3>
      ) : (
        filteredTodos.map((todo) => (
          <TodoCard
  key={todo.id}
  todo={todo}
  onDelete={handleDelete}
  onToggle={handleToggle}
  onEdit={setEditingTodo}
/>
        ))
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>
);