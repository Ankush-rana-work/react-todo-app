import { Button } from "@mui/material";
import React from "react";

const TodoFooter = (props) => {
    const { pendingTodos, clearAll} = props;
  return (
    <div className="todo-footer">
      <div>
        {pendingTodos.length ? `${pendingTodos.length} pending todo's` : ""}
      </div>
      <div>
        <Button variant="text" onClick={clearAll}>
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default TodoFooter;
