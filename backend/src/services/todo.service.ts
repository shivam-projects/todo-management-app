import pool from "../config/db.js";
import { Todo } from "../models/todo.model.js";

export const createTodo = async (todo: Todo) => {
  const { title, description, priority = "Medium" } = todo;

  const result = await pool.query(
    `INSERT INTO todos (title, description, priority)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, description, priority]
  );

  return result.rows[0];
};

export const getTodos = async () => {
  const result = await pool.query(
    `SELECT * FROM todos ORDER BY created_at DESC`
  );

  return result.rows;
};

export const getTodoById = async (id: number) => {
  const result = await pool.query(
    `SELECT * FROM todos WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const updateTodo = async (
  id: number,
  todo: Partial<Todo>
) => {
  const { title, description, completed, priority } = todo;

  const result = await pool.query(
    `UPDATE todos
     SET
       title = COALESCE($1, title),
       description = COALESCE($2, description),
       completed = COALESCE($3, completed),
       priority = COALESCE($4, priority),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [title, description, completed, priority, id]
  );

  return result.rows[0];
};

export const deleteTodo = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM todos
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};