import { FormControlLabel, Switch, Zoom } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import EditTodo from "../../pages/EditTodo/EditTodo";
import { TodoComment, TodoProps } from "../../types/todo";
import Todo from "../Todo/Todo";
import DeleteTodo from "./DeleteTodo";
import LoadingSkeleton from "./LoadingSkeleton";
import styles from "./TodoList.module.css";

type DeleteModalProps = {
  open: boolean;
  id: number | null;
};

type EditModalProps = {
  todo: TodoProps | null;
  open: boolean;
};

type CommentModalProps = {
  comment: TodoComment | null;
  open: boolean;
};

const defaultDeleteModalState: DeleteModalProps = {
  open: false,
  id: null,
};

const defaultEditModalState: EditModalProps = {
  open: false,
  todo: null,
};

const defaultCommentModalState: CommentModalProps = {
  open: false,
  comment: null,
};

export default function TodoList() {
  const { data, getData, setData } = useLocalStorage<TodoProps[]>();

  const [todos, setTodos] = useState<TodoProps[]>();

  const [deleteModal, setDeleteModal] = useState<DeleteModalProps>(
    defaultDeleteModalState
  );

  const [editModal, setEditModal] = useState<EditModalProps>(
    defaultEditModalState
  );

  const [commentModal, setCommentModal] = useState<CommentModalProps>(
    defaultCommentModalState
  );

  const openCommentModal = () => {
    // setCommentModal({ open: true, comment });
  };

  const closeCommentModal = () => {
    setCommentModal(defaultCommentModalState);
  };

  const openEditModal = (todo: TodoProps) => {
    setEditModal({ open: true, todo });
  };

  const closeEditModal = () => {
    setEditModal(defaultEditModalState);
  };

  const openDeleteModal = (id: number) => {
    setDeleteModal({ open: true, id });
  };

  const closeDeleteModal = () => {
    setDeleteModal(defaultDeleteModalState);
  };

  const handleDelete = () => {
    let todosInstance = data || [];
    let todoIndex = todosInstance.findIndex(
      (todo) => todo.id === deleteModal.id
    );
    todosInstance.splice(todoIndex, 1);
    setData("todos", todosInstance);
    setTodos(todosInstance);
  };

  const handleUpdateTodos = () => {
    let todos = data || [];
    setData("todos", todos);
  };

  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  // const [videos, setVideos] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      getData("todos");
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Typography sx={{ textAlign: "center" }} variant="h2" gutterBottom>
        Todo List
      </Typography>
      <hr />
      <div>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Display TodoList"
        />
        <br />
        <Zoom
          in={checked}
          style={{ transitionDelay: checked ? "500ms" : "0ms" }}
        >
          <div>
            {data && !data.length && (
              <Box sx={{ textAlign: "center" }}>Sorry No Todo is Added Yet</Box>
            )}
          </div>
        </Zoom>

        {loading && (
              <LoadingSkeleton />
        )}

        <ul>
          <Zoom
            in={checked}
            style={{ transitionDelay: checked ? "500ms" : "0ms" }}
          >
            <Box className={styles.list}>
              {data?.map((todo) => (
                <Todo
                  todo={todo}
                  key={todo.id}
                  onDelete={openDeleteModal}
                  onEdit={openEditModal}
                  onCommentTodo={openCommentModal}
                />
              ))}
            </Box>
          </Zoom>
          {/* <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
            <Box className={styles.list}>
              {data?.map((todo) => (
                <Todo
                  todo={todo}
                  key={todo.id}
                  onDelete={openDeleteModal}
                  onEdit={openEditModal}
                  onCommentTodo={openCommentModal}
                />
              ))}
            </Box>
          </Slide> */}
        </ul>

        <EditTodo
          open={editModal.open}
          todo={editModal.todo}
          onClose={closeEditModal}
          onUpdate={handleUpdateTodos}
        />

        <DeleteTodo
          onDelete={handleDelete}
          onClose={closeDeleteModal}
          open={deleteModal.open}
        />
      </div>
    </div>
  );
}
