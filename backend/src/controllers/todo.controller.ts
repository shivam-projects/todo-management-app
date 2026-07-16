import { Request, Response } from "express";
import * as todoService from "../services/todo.service.js";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, priority } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // 👇 YAHAN ADD KARO
    const allowedPriorities = ["Low", "Medium", "High"];

    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority value",
      });
    }

    const todo = await todoService.createTodo({
      title,
      description,
      priority,
    });

    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTodos = async (_req: Request, res: Response) => {
  try {
    const todos = await todoService.getTodos();

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.getTodoById(Number(req.params.id));

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { priority } = req.body;

    const allowedPriorities = ["Low", "Medium", "High"];

    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority value",
      });
    }

    const todo = await todoService.updateTodo(
      Number(req.params.id),
      req.body
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.deleteTodo(Number(req.params.id));

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};