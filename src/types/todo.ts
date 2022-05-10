export type TodoProps = {
  title: string;
  description: string;
  createdAt: string;
  id: number;
};

export type TodoComment = {
  comment: string;
  time: string;
  id: number;
  todoId: number | undefined;
};

export type TodoCommentFormProps = {
  comment: string;
};

export type TodoFormProps = {
  title: string;
  description: string;
};

export type CommentReactionProps = {
  count: number;
  id: number;
  todoId: number | undefined;
  icon?: JSX.Element;
  checkedIcon?: JSX.Element;
  name?: string;
};

export type UserProps = {
  username: string;
  email: string;
  password: string;
};
