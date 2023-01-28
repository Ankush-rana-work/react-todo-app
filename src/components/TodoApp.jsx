import React, { useEffect, useMemo, useState } from "react";
import uuid from "react-uuid";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import TodoFooter from "./TodoFooter";

const TodoApp = () => {
  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("todoLists")) || [];
  });
  const [todoEditId, setTodoEditId] = useState(0);
  const [todoText, setTodoText] = useState("");

  const setTodoTextValue = (value) => {
    setTodoText(value);
  };

  // add todo's
  const addTodo = () => {
    if (todoText == "") {
      alert("Please enter the text");
      return false;
    }

    let todoObj = {
      id: uuid(),
      title: todoText,
      status: "Pending",
      createdAt: new Date(),
    };
    setTodoText("");
    setTodoList([...todoList, todoObj]);
  };

  const allowEdit = (todoId) => {
    let todo = todoList.find((list) => list.id === todoId);
    setTodoEditId(todoId);
    setTodoText(todo.title);
  };

  const editTodo = (todoId) => {
    const todoIndex = todoList.findIndex((todo) => todo.id == todoId);
    todoList[todoIndex].title = todoText;
    setTodoList([...todoList]);
    setTodoEditId(0);
    setTodoText("");
  };

  const changesStatus = (todoId, status) => {
    const todoIndex = todoList.findIndex((todo) => todo.id == todoId);
    todoList[todoIndex].status = status == "Pending" ? "Completed" : "Pending";
    setTodoList([...todoList]);
    setTodoEditId(0);
    setTodoText("");
  };

  // delete todo's
  const deleteTodo = (todoId) => {
    console.log('eeeecdede');
    const todos = todoList.filter((todo) => {
      return todo.id != todoId;
    });
    setTodoList(todos);
    setTodoEditId(0);
    setTodoText("");
  };

  // clear all
  const clearAll = () => {
    setTodoList([]);
    setTodoEditId(0);
    setTodoText("");
  };

  const resetForm = () => {
    setTodoEditId(0);
    setTodoText("");
    localStorage.setItem("todoLists");
  };

  const pendingTodos = useMemo(() => {
    const totalPendingTodos = todoList.filter((todo) => {
      return todo.status != "Completed";
    });
    return totalPendingTodos;
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="todo-container">
      <div className="todo-box">
        <TodoForm
          setTodoTextValue={(value) => setTodoTextValue(value)}
          todoText={todoText}
          todoEditId={todoEditId}
          editTodo={(todoId) => editTodo(todoId)}
          addTodo={addTodo}
          resetForm={resetForm}
        />
        <div className="todo-list-wrapper">
          <div className="todo-list">
            {todoList.length ? (
              todoList?.map((todo) => {
                return (
                  <TodoItem
                    todo={todo}
                    deleteTodo={(id) => deleteTodo(id)}
                    allowEdit={(id) => allowEdit(id)}
                    changesStatus={(id, status) => changesStatus(id, status)}
                    clearAll={clearAll}
                  />
                );
              })
            ) : (
              <div className="item-not-available">No todo's available.</div>
            )}
          </div>
          <TodoFooter pendingTodos={pendingTodos} clearAll={clearAll} />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
