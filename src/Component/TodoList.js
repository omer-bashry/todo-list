import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../Contexts/TodoContext";

// Component
import Todo from "./Todo";

//Laibarys
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);
  const [titleInput, setTitleInput] = useState("");
  const [todosToBeDisplay, setTodosToBeDisplay] = useState("all");

  // DISPLAY TODOS

  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const nonCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });
  const allTodos = todos;

  let displayedTodos = allTodos;
  if (todosToBeDisplay == "completed") {
    displayedTodos = completedTodos;
  } else if (todosToBeDisplay == "non-completed") {
    displayedTodos = nonCompletedTodos;
  }

  const todosJsx = displayedTodos.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function selectTodoToDisplay(e) {
    setTodosToBeDisplay(e.target.value);
  }

  function handelAddBtnClicked() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    setTitleInput("");
  }
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, height: "85vh", overflow: "auto" }}>
        <CardContent>
          <Typography variant="h3" component="h2">
            مهامي
          </Typography>
          <Divider />
          {/* FILTER BUTTONS */}
          <ToggleButtonGroup
            style={{ direction: "ltr", paddingTop: "30px" }}
            value={todosToBeDisplay}
            exclusive
            onChange={(e) => {
              selectTodoToDisplay(e);
            }}
            aria-label="text alignment"
          >
            <ToggleButton value="non-completed" aria-label="left aligned">
              غير منجزة
            </ToggleButton>
            <ToggleButton value="completed" aria-label="centered">
              منجزة
            </ToggleButton>
            <ToggleButton value="all" aria-label="right aligned">
              الكل
            </ToggleButton>
          </ToggleButtonGroup>
          {/* ==== FILTER BUTTONS ====*/}
          {/* DISPLY TODO */}
          {todosJsx}
          {/* ==== DISPLY TODO ===*/}
          <Grid container spacing={2} style={{ marginTop: "10px" }}>
            <Grid xs={8}>
              <TextField
                id="outlined-basic"
                label="اضافة مهمة"
                variant="outlined"
                style={{ width: "100%" }}
                onKeyPress={(e) => {
                  if (e.key == "Enter" && titleInput != 0) {
                    handelAddBtnClicked();
                  }
                }}
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid xs={4}>
              <Button
                variant="outlined"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {
                  handelAddBtnClicked();
                }}
                disabled={titleInput == 0}
              >
                اضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
