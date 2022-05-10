import { CommentReactionProps, TodoComment } from "../types/todo";

export const getComments = (todoId?: number): TodoComment[] => {
  const data = localStorage.getItem("comments");
  if (data) {
    const allComments: TodoComment[] = JSON.parse(data) || [];

    return allComments.filter((comment) => comment.todoId === todoId);
  }
  return [];
};

export const getReactionOnComment = (
): CommentReactionProps[] => {
  const data = localStorage.getItem("reactionOnComment");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};
