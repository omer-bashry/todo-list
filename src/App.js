import "./App.css";
import TodoList from "./Component/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "./Contexts/TodoContext";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alex"],
  },
});

let initialTodos = [
  {
    id: uuidv4(),
    title: "عنوان المهمة الاولى",
    details: "تفاصيل المهمة الاولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "عنوان المهمة الثانية",
    details: "تفاصيل المهمة الثانية",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "عنوان المهمة الثالثة",
    details: "تفاصيل المهمة الثالثة",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
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
        <TodoContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodoContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
