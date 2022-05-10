import { TodoProps } from "../types/todo";

export const getTodos = (): TodoProps[] => {
  const data = localStorage.getItem("todos");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const updateAllTodos = (todos: TodoProps[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const editTodo = (editedTodo: Omit<TodoProps, "createdAt">): void => {
  let todos = getTodos();

  let updatedTodo = todos.map((item) =>
    item.id === editedTodo.id ? { ...item, ...editedTodo } : item
  );

  updateAllTodos(updatedTodo);
};
