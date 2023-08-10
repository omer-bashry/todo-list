import "./App.css";
import TodoList from "./Component/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastProvider } from "./Contexts/ToastContext";
import TodoProvider from "./Contexts/TodoContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Alex"],
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <TodoProvider>
          <ToastProvider>
            <div
              className="App"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "black",
                direction: "rtl",
                textAlign: "center",
              }}
            >
              <TodoList />
            </div>
          </ToastProvider>
        </TodoProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
