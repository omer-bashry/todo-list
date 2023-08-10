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
import { useState, useEffect, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "../Contexts/ToastContext";

// Component
import Todo from "./Todo";
import { useTodos } from "../Contexts/TodoContext";

export default function TodoList() {
  // Reduser
  const { todos, dispatch } = useTodos();
  const [titleInput, setTitleInput] = useState("");
  const [todosToBeDisplay, setTodosToBeDisplay] = useState("all");
  // DAILOGS STATES
  const [openDailog, setOpenDailog] = useState(false); // Open Delete Dailog
  const [deletedTodo, setDeletedTodo] = useState({}); // To Link
  const [openUpdateDailog, setOpenUpdateDailog] = useState(false);
  // Toast Context
  const { showHideToast } = useToast();
  // DISPLAY TODOS
  const allTodos = todos;
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const nonCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let displayedTodos = allTodos;
  if (todosToBeDisplay == "completed") {
    displayedTodos = completedTodos;
  } else if (todosToBeDisplay == "non-completed") {
    displayedTodos = nonCompletedTodos;
  }

  const todosJsx = displayedTodos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        handelDeleteClicked={handelDeleteClicked}
        handelOpenUpdateDialog={handelOpenUpdateDialog}
      />
    );
  });

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function selectTodoToDisplay(e) {
    setTodosToBeDisplay(e.target.value);
  }

  function handelAddBtnClicked() {
    dispatch({ type: "add", payload: { newTitle: titleInput } });
    setTitleInput("");
    showHideToast("تم اضافة مهمة بنجاح");
  }

  // DAILOGS HANDELERS
  function handelDeleteClicked(todo) {
    setDeletedTodo(todo);
    setOpenDailog(true);
  }
  function handelCloseDailog() {
    // Delete Close
    setOpenDailog(false);
  }
  function handelDeleteConfirm() {
    dispatch({ type: "delete", payload: { deletdTodo: deletedTodo } });
    setOpenDailog(false);
    showHideToast("تم حذف المهمة بنجاح");
  }
  // UPDATE DAILOGS
  function handelOpenUpdateDialog(todo) {
    setOpenUpdateDailog(true);
    setDeletedTodo(todo);
  }
  function handelCloseUpdateDialog() {
    setOpenUpdateDailog(false);
  }
  function handeleUpdateSubmit() {
    dispatch({ type: "update", payload: { deletdTodo: deletedTodo } });
    setOpenUpdateDailog(false);
    showHideToast("تم تحديث المهمة بنجاح");
  }
  // DAILOGS HANDELERS//
  return (
    <>
      {/* DELETE DAILOG */}
      <Dialog
        style={{ direction: "rtl" }}
        open={openDailog}
        onClose={handelCloseDailog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل انت متاكد من حذف هذه المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لن تكون قادر على استعادة هذه المهمة مرة اخرى
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelCloseDailog}>اغلاق</Button>
          <Button
            style={{ color: "#b23c17" }}
            autoFocus
            onClick={handelDeleteConfirm}
          >
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* === DELETE DAILOG === */}
      {/* UPDATE DAILOG */}
      <Dialog
        open={openUpdateDailog}
        onClose={handelCloseUpdateDialog}
        style={{ direction: "rtl" }}
      >
        <DialogTitle>تعديل مهمة</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={deletedTodo != null ? deletedTodo.title : ""}
            onChange={(e) => {
              setDeletedTodo({ ...deletedTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={deletedTodo != null ? deletedTodo.details : ""}
            onChange={(e) => {
              setDeletedTodo({ ...deletedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelCloseUpdateDialog}>اغلاق</Button>
          <Button onClick={handeleUpdateSubmit}>تعديل</Button>
        </DialogActions>
      </Dialog>
      {/* === UPDATE DAILOG === */}
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
    </>
  );
}
