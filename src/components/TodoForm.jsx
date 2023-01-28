import { Button } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CachedIcon from "@mui/icons-material/Cached";

const TodoForm = (prop) => {
  const { setTodoTextValue, todoText, todoEditId, editTodo, addTodo, resetForm } = prop;
  return (
    <>
      <h3 className="todo-title">
        Todo App1
        {todoEditId ? (
          <Button variant="text" onClick={resetForm} style={{ float: "right" }}>
            <CachedIcon />
          </Button>
        ) : (
          ""
        )}
      </h3>
      <div className="todo-form">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoTextValue(e.target.value)}
        />
        {todoEditId ? (
          <Button variant="text" onClick={() => editTodo(todoEditId)}>
            <EditIcon />
          </Button>
        ) : (
          <Button variant="text" onClick={addTodo}>
            <ControlPointIcon />
          </Button>
        )}
      </div>
    </>
  );
};

export default TodoForm;
