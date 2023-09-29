import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TodoList() {
	//States:
	const [todo, setTodo] = React.useState({
		date: "",
		description: "",
		priority: "",
	});
	const [todos, setTodos] = React.useState([]);
	const gridRef = React.useRef();

	const [columnDefs] = React.useState([
		{
			field: "description",
			sortable: true,
			filter: true,
			floatingFilter: true,
		},
		{
			field: "date",
			sortable: true,
			filter: true,
			headerName: "Due date",
			floatingFilter: true,
		},
		{
			field: "priority",
			sortable: true,
			filter: true,
			floatingFilter: true,
			cellStyle: (params) =>
				params.value === "High" ? { color: "red" } : { color: "black" },
		},
	]);

	//Methods:
	const handleClick = () => {
		setTodos([...todos, todo]);
		setTodo({ date: "", description: "", priority: "" });
		//This worked as well: setTodo("");
	};

	const handleDelete = () => {
		//console.log(gridRef.current.getSelectedNodes()[0].id);
		if (gridRef.current.getSelectedNodes().length > 0) {
			setTodos(
				todos.filter(
					(todo, index) => index != gridRef.current.getSelectedNodes()[0].id
				)
			);
		} else {
			alert("Please select a row first");
		}
	};

	//Return for rendering:
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
			<input
				placeholder="Priority"
				value={todo.priority}
				onChange={(event) => setTodo({ ...todo, priority: event.target.value })}
			/>

			<button onClick={handleClick}>Add Todo</button>
			<button onClick={handleDelete}>Delete</button>

			<div className="ag-theme-material" style={{ width: "100%", height: 500 }}>
				<AgGridReact
					ref={gridRef}
					onGridReady={(params) => (gridRef.current = params.api)}
					rowSelection="single"
					rowData={todos}
					columnDefs={columnDefs}
					animateRows={true}
				></AgGridReact>
			</div>
		</>
	);
}

export default TodoList;
