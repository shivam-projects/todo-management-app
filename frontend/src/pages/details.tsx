import React from "react";
import ReactDOM from "react-dom/client";
import { useEffect, useState } from "react";
import api from "../services/todo.api";
import type { Todo } from "../types/todo";
import "../styles/style.css";

export default function TodoDetails() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const fetchTodo = async () => {
    try {
      const response = await api.get(`/todos/${id}`);
      setTodo(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch todo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="container">
        <h2>Todo not found</h2>

        <button onClick={() => (window.location.href = "/")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>Todo Details</h1>

     <div className="details-card">

        <h2>{todo.title}</h2>

        <p>
          <strong>Description :</strong>
          <br />
          {todo.description}
        </p>

        <p>
          <strong>Priority :</strong> {todo.priority}
        </p>

        <p>
          <strong>Status :</strong>{" "}
          {todo.completed ? "Completed" : "Pending"}
        </p>

        <p>
          <strong>Created :</strong>{" "}
          {new Date(todo.created_at).toLocaleString()}
        </p>

        <p>
          <strong>Updated :</strong>{" "}
          {new Date(todo.updated_at).toLocaleString()}
        </p>

        <button
  className="back-btn"
  onClick={() => (window.location.href = "/")}
>
          Back to Todos
        </button>

      </div>

    </div>
  );
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoDetails />
  </React.StrictMode>
);