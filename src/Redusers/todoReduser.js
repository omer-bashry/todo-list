import { v4 as uuidv4 } from "uuid";
export default function todoReduser(currentTodos, action) {
  switch (action.type) {
    case "add": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "delete": {
      const updatedTodos = currentTodos.filter((t) => {
        return t.id != action.payload.deletdTodo.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "update": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.deletdTodo.id) {
          return {
            ...t,
            title: action.payload.deletdTodo.title,
            details: action.payload.deletdTodo.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }
    case "toggleComplete": {
      let updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          const updatedTodos = {
            ...t,
            isCompleted: !t.isCompleted,
          };
          return updatedTodos;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("Unknown action " + action.type);
    }
  }
}
