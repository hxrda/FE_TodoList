import React from "react";
import TodoTable from "./TodoTable";

function TodoList() {
	const [todo, setTodo] = React.useState({ date: "", description: "" });

	const [todos, setTodos] = React.useState([]);

	const handleClick = () => {
		setTodos([...todos, todo]);
		setTodo({ date: "", description: "" });
		//This worked as well: setTodo("");
	};

	const handleDelete = (row) => {
		//console.log("Delete: " + row);
		setTodos(todos.filter((todo, index) => index != row));
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
