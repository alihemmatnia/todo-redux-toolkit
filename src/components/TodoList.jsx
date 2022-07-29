import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeTodo, changeStatus, getById } from "../redux/todos";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import DoneAllIcon from "@mui/icons-material/DoneAll";
const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const todosList = [...todos];
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todosList
              .sort(function (a, b) {
                return Number(b.date) - Number(a.date);
              })
              .map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.text}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {(() => {
                      if (row.isDone) {
                        return <span className="badge bg-success">Done</span>;
                      } else {
                        return (
                          <span className="badge  bg-warning text-dark">
                            unDone
                          </span>
                        );
                      }
                    })()}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton
                      onClick={() => dispatch(getById({ id: row.id }))}
                      size="small"
                    >
                      <EditIcon></EditIcon>
                    </IconButton>
                    {(() => {
                      if (!row.isDone) {
                        return (
                          <IconButton
                            onClick={() =>
                              dispatch(changeStatus({ id: row.id }))
                            }
                            size="small"
                          >
                            <DoneAllIcon></DoneAllIcon>
                          </IconButton>
                        );
                      } else {
                        return (
                          <IconButton
                            onClick={() =>
                              dispatch(changeStatus({ id: row.id }))
                            }
                            size="small"
                          >
                            <RemoveDoneIcon></RemoveDoneIcon>
                          </IconButton>
                        );
                      }
                    })()}

                    <IconButton
                      onClick={() => dispatch(removeTodo({ id: row.id }))}
                      size="small"
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default TodoList;
