import { createContext, useContext, useReducer } from "react";
import todoReduser from "../Redusers/todoReduser";

export const TodoContext = createContext([]);

const TodoProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(todoReduser, []);
  return (
    <TodoContext.Provider value={{ todos: todos, dispatch: todosDispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
export const useTodos = () => {
  return useContext(TodoContext);
};

export default TodoProvider;
