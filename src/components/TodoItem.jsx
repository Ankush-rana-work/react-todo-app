import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Fade } from "@mui/material";

const TodoItem = (props) => {
  const { todo, allowEdit, changesStatus,deleteTodo, } = props;

  return (
    <Fade in={true} unmountOnExit>
    <div className="todo-list-item" key={todo.id}>
      <div className={`item-text ${todo.status === "Completed" ? "text-line" : ""}`}>
        {todo.title}
      </div>
      <div className="item-action">
        <p
          variant="text"
          className={`item-status ${ todo.status === "Pending" ? "text-red" : "text-green" }`}
          onClick={() => changesStatus(todo.id, todo.status)}
          style={{ cursor: "pointer" }}
        >
          {todo.status === "Pending" ? "Pending" : "Completed"}
        </p>
        
        <Button
          variant="text"
          className={`${(todo.status === "Completed") ? 'background-grey':'background-green'}`}
          onClick={() => allowEdit(todo.id)}
          disabled={todo.status === "Completed" ? true : false}
        >
          <EditIcon style={{ color: "white" }} />
        </Button>

        <Button
          variant="text"
          className="background-red"
          onClick={() => deleteTodo(todo.id)}
        >
          <DeleteIcon style={{ color: "white" }} />
        </Button>
      </div>
    </div>
    </Fade>
  );
};

export default TodoItem;
