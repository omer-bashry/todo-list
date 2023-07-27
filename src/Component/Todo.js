import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { TodoContext } from "../Contexts/TodoContext";
import { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// ICONS
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";

export default function Todo({ todo }) {
  const [openDailog, setOpenDailog] = useState(false);
  const [openUpdateDailog, setOpenUpdateDailog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const { todos, setTodos } = useContext(TodoContext);

  // EVENT HANDELERS
  function handelIconClick() {
    let updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handelDeleteClicked() {
    setOpenDailog(true);
  }

  function handelCloseDailog() {
    setOpenDailog(false);
  }
  function handelDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // UPDATE HANDELERS
  function handelOpenUpdateDialog() {
    setOpenUpdateDailog(true);
  }
  function handelCloseUpdateDialog() {
    setOpenUpdateDailog(false);
  }
  function handeleUpdateSubmit() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: updateTodo.title, details: updateTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setOpenUpdateDailog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // EVENT HANDELERS //

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
            value={updateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="تفاصيل المهمة"
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelCloseUpdateDialog}>اغلاق</Button>
          <Button onClick={handeleUpdateSubmit}>تعديل</Button>
        </DialogActions>
      </Dialog>
      {/* === UPDATE DAILOG === */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          color: "white",
          marginTop: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/* TEXT GRID */}
            <Grid xs={8} style={{ textAlign: "start" }}>
              <Typography
                variant="h5"
                component="h2"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography component="h2">{todo.details}</Typography>
            </Grid>
            {/* === TEXT GRID ===*/}
            {/* ICON GRID */}
            <Grid
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  handelIconClick();
                }}
                className="iconBtn"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  border: "3px solid #8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handelOpenUpdateDialog}
                className="iconBtn"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  border: "3px solid #1769aa",
                  backgroundColor: "white",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handelDeleteClicked}
                className="iconBtn"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  border: "3px solid #b23c17",
                  backgroundColor: "white",
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
            {/* ICON GRID */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
