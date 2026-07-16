import request from "supertest";
import app from "../src/app";
import * as todoService from "../src/services/todo.service";

jest.mock("../src/services/todo.service");

describe("Todo API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a todo", async () => {
    (todoService.createTodo as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Learn Jest",
      description: "Write unit tests",
      priority: "High",
      completed: false,
    });

    const res = await request(app)
      .post("/todos")
      .send({
        title: "Learn Jest",
        description: "Write unit tests",
        priority: "High",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Learn Jest");
  });

  it("should return all todos", async () => {
    (todoService.getTodos as jest.Mock).mockResolvedValue([
      {
        id: 1,
        title: "Todo 1",
      },
    ]);

    const res = await request(app).get("/todos");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.count).toBe(1);
  });

  it("should return todo by id", async () => {
    (todoService.getTodoById as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Todo 1",
    });

    const res = await request(app).get("/todos/1");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(1);
  });

  it("should update todo", async () => {
    (todoService.updateTodo as jest.Mock).mockResolvedValue({
      id: 1,
      title: "Updated Todo",
    });

    const res = await request(app)
      .put("/todos/1")
      .send({
        title: "Updated Todo",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Updated Todo");
  });

  it("should delete todo", async () => {
    (todoService.deleteTodo as jest.Mock).mockResolvedValue({
      id: 1,
    });

    const res = await request(app).delete("/todos/1");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Todo deleted successfully");
  });
});