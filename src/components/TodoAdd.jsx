import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { addTodo, editTodo, cancelEditTodo } from "../redux/todos";
const TodoAdd = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [id, setId] = useState("");

  const todo = useSelector((state) => state.todo);
  const [isEdit, setEdit] = useState(false);

  const [isError, setError] = useState(false);
  useEffect(() => {
    if (todo.isEdit) {
      setText(todo.text);
      setId(todo.id);

      setEdit(true);
    }
  }, [todo.isEdit, todo.text]);
  const AddTodo = () => {
    if (text !== "") {
      if (isEdit) {
        dispatch(editTodo({ id, text }));
      } else {
        dispatch(addTodo(text));
      }
      setError(false);
      cancelEdit();
    } else {
      setError(true);
    }
  };
  const cancelEdit = () => {
    setEdit(false);
    setId("");
    setText("");

    dispatch(cancelEditTodo());
  };
  return (
    <div className="w-100">
      <Grid container direction="column">
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="Title">Title</InputLabel>
          <OutlinedInput
            error={isError}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                AddTodo();
              }
            }}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
            defaultValue={text}
            value={text}
            label="Title"
          />
        </FormControl>

        {(() => {
          if (isEdit) {
            return (
              <FormControl fullWidth sx={{ m: 1 }}>
                <Stack direction="row" className="col-12 w-100" spacing={2}>
                  <Button
                    className="mt-2 col-9"
                    onClick={() => AddTodo()}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Edit
                  </Button>
                  <Button
                    className="mt-2 col-2"
                    variant="outlined"
                    color="error"
                    onClick={() => cancelEdit()}
                  >
                    <CloseIcon />
                  </Button>
                </Stack>
              </FormControl>
            );
          } else {
            return (
              <Button
                fullWidth
                sx={{ m: 1 }}
                className="mt-2"
                onClick={() => AddTodo()}
                variant="contained"
                color="primary"
                type="submit"
              >
                Add
              </Button>
            );
          }
        })()}
      </Grid>
    </div>
  );
};

export default TodoAdd;
