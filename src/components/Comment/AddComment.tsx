import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { TodoComment, TodoProps } from "../../types/todo";

interface Props {
  todo: TodoProps;
  // comment?: TodoComment;
  onAddComment: () => void;
}

function AddComment(props: Props) {
  const { onAddComment, todo } = props;

  const { data, getData, setData } = useLocalStorage<TodoComment[]>();

  const [value, setValue] = useState<{ comment: string }>({
    comment: "",
  });

  const handleChange = (event: any) => {
    setValue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let comments = data || [];
    let newComments = comments.concat([
      {
        ...value,
        time: new Date().toLocaleTimeString(),
        id: Math.random(),
        todoId: todo.id,
      },
    ]);
    // console.log(newComments);
    setData("comments", newComments);
    onAddComment();
    getData("comments");
  };

  useEffect(() => {
    getData("comments");
  }, []);
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{
            width: "100%",
          }}
          id="outlined-basic"
          label="Comment"
          onChange={handleChange}
          name="comment"
          value={value?.comment}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar
                  sx={{ width: "15px", height: "15px" }}
                  alt="Remy Sharp"
                  src="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100"
                />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <br />
        <br />
        <Button
          sx={{
            alignItems: "center",
            ml: "70px",
          }}
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default AddComment;
