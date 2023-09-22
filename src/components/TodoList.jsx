import React from "react";
import TodoTable from "./TodoTable";

function TodoList() {
	//const [description, setDescription] = React.useState("");
	const [todo, setTodo] = React.useState({ date: "", description: "" });

	const [todos, setTodos] = React.useState([]);

	const handleClick = () => {
		setTodos([...todos, todo]);
		setTodo({ date: "", description: "" });
		//This worked as well: setTodo("");
	};

	const handleDelete = (row) => {
		//console.log("Delete: " + row);
		setTodos(todos.filter((todo, index) => index != row)); //index:0,1,2,4...., row:. Compares row to indexes.
	};
	return (
		<>
			<h3>My Todos</h3>

			<input
				placeholder="Description"
				value={todo.description}
				onChange={(event) =>
					setTodo({ ...todo, description: event.target.value })
				}
			/>
			<input
				type="date"
				placeholder="Date"
				value={todo.date}
				onChange={(event) => setTodo({ ...todo, date: event.target.value })}
			/>

			<button onClick={handleClick}>Add Todo</button>

			<TodoTable todos={todos} deleteTodo={handleDelete} />
		</>
	);
}

export default TodoList;

//1.Or before function: "export default function TodoList() {}...."
//2.If you don't want to write React.useState but only useState (only imports the hook funct from react)
//    -> import {useState } from 'react'
//    -> import {useState, useEffect } from 'react'
//3. <></>  = Shorthand for React.fragment
//4. "event" or "e"  -> e.target.value
//5. latest at the begining: "[description, ...todos]"
//6. Columns of table: <td>
