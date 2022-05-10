import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { TodoFormProps, TodoProps } from "../../types/todo";

interface Props {
  todo?: TodoProps;
  onEdit: (val: TodoFormProps) => void;
}

function TodoForm(props: Props) {
  const { todo, onEdit } = props;
  const { data, getData, setData } = useLocalStorage<TodoProps[]>();
  const [value, setValue] = useState<TodoFormProps>({
    title: "",
    description: "",
  });

  const handleChange = (event: any) => {
    setValue((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // let todos = value || [];
    console.log([value]);
    // let todos = onEdit(value);
    // setData("todos", todos);
  };

  useEffect(() => {
    if (todo) {
      setValue({ title: todo.title, description: todo.description });
    }
    getData("todos");
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          id="outlined-basic"
          label="Title Here"
          name="title"
          onChange={handleChange}
          value={value.title}
          fullWidth
        />

        <TextField
          id="outlined-multiline"
          multiline
          rows={4}
          value={value.description}
          placeholder="Description Here"
          name="description"
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Edit Todo
        </Button>
      </Stack>
    </form>
  );
}

export default TodoForm;
