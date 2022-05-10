import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CardActionArea, IconButton, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import { TodoComment, TodoProps } from "../../types/todo";
import AddCommentDialog from "../Comment/AddCommentDialog";
import TodoHeader from "../TodoList/TodoHeader";
import CommentContainer from "./CommentContainer";
import styles from "./Todo.module.css";
import TodoActionButtons from "./TodoActionButtons";

interface Props {
  todo: TodoProps;
  // comment: TodoComment;
  onDelete: (val: number) => void;
  onEdit: (todo: TodoProps) => void;
  onCommentTodo: (comment: TodoComment) => void;
}

export default function (props: Props) {
  const { todo, onDelete, onEdit } = props;

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  const [openCommentModal, setOpenCommentModal] = useState(false);
  const toggleOpenCommentModal = () => {
    setOpenCommentModal((prev) => !prev);
  };
  return (
    <div>
      <Box className={styles.card} key={todo.id}>
        <Stack display="flex" direction="column" spacing={2}>
          <TodoHeader />
          <Typography textAlign="center" variant="body2" color="text.primary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            tempora.
          </Typography>
          {/* <Typography textAlign="center" variant="body2" color="text.primary">
            1 seconds ago
          </Typography> */}
          <Card sx={{ maxWidth: 450 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100"
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  textAlign="center"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {todo.title}
                </Typography>
                <Typography
                  textAlign="center"
                  variant="body2"
                  color="text.secondary"
                >
                  {todo.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>

        <Stack spacing={2} direction="row" justifyContent="center">
          <Tooltip title="Edit Todos" placement="top">
            <IconButton onClick={handleEdit}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Todos" placement="top">
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Comment Todos" placement="top">
            <IconButton onClick={toggleOpenCommentModal}>
              <CommentIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Stack>
        <TodoActionButtons todo={todo} todoId={todo.id} />
        <CommentContainer todoId={todo.id} />
      </Box>
      <AddCommentDialog
        onClose={toggleOpenCommentModal}
        open={openCommentModal}
        todo={todo}
      />
    </div>
  );
}
