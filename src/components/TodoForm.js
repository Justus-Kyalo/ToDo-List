import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.edit) {
      fetch(`http://localhost:9292/task/${props.edit.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activity: input }),
      })
        .then((response) => response.json())
        .then((data) => {
          props.onSubmit(data);
          setInput("");
        })
        .catch((error) => console.error(error));
    } else {
      fetch("http://localhost:9292/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activity: input }),
      })
        .then((response) => response.json())
        .then((data) => {
          props.onSubmit(data);
          setInput("");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = () => {
    fetch(`http://localhost:9292/task${props.edit.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        props.onDelete(props.edit.id);
        setInput("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={props.edit ? "Update your item" : "Add a todo"}
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="todo-button">
        {props.edit ? "Update" : "Add Todo"}
      </button>
      {props.edit && (
        <button className="todo-button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </form>
  );
}

export default TodoForm;
