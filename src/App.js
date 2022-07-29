import TodoList from "./components/TodoList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TodoAdd from "./components/TodoAdd";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="col-12 d-flex justify-content-around mt-3 row">
        <div className="col-8 ">
          <TodoList />
        </div>
        <div className="col-3">
          <TodoAdd />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
