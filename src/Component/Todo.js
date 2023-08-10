import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useToast } from "../Contexts/ToastContext";
import { useTodos } from "../Contexts/TodoContext";

// ICONS
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";

export default function Todo({
  todo,
  handelDeleteClicked,
  handelOpenUpdateDialog,
}) {
  // const { todos, setTodos } = useContext(TodoContext);
  const { todos, dispatch } = useTodos();
  const { showHideToast } = useToast();

  // EVENT HANDELERS
  function handelIconClick() {
    dispatch({ type: "toggleComplete", payload: todo });
    showHideToast("تم تعديل المهمة");
  }

  // Delete dailog handeler
  function deleteIconClicked() {
    handelDeleteClicked(todo);
  }

  // UPDATE HANDELERS
  function updateIconClicked() {
    handelOpenUpdateDialog(todo);
  }

  // EVENT HANDELERS //

  return (
    <>
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
                onClick={updateIconClicked}
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
                onClick={deleteIconClicked}
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
