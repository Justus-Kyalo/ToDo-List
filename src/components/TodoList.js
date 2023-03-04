import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    fetch("http://localhost:9292/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activity: todo.text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, { id: data.id, text: data.activity }]);
      })
      .catch((error) => console.error(error));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^s*$/.test(newValue.text)) {
      return;
    }
    fetch(`http://localhost:9292/task/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activity: newValue.text }),
    })
      .then((response) => response.json())
      .then(() => {
        setTodos((prev) =>
          prev.map((item) => (item.id === todoId ? { id: item.id, text: newValue.text } : item))
        );
      })
      .catch((error) => console.error(error));
  };

  const removeTodo = (id) => {
    fetch(`http://localhost:9292/task/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => console.error(error));
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        fetch(`http://localhost:9292/task/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ activity: todo.text, isComplete: todo.isComplete }),
        })
          .then((response) => response.json())
          .then(() => console.log("Task updated"))
          .catch((error) => console.error(error));
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  React.useEffect(() => {
    fetch("http://localhost:9292/task")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.map((item) => ({ id: item.id, text: item.activity, isComplete: item.is_complete })));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
    </div>
  );
}

export default TodoList;
