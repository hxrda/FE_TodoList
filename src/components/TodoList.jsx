import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//import { format } from "date-fns";

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

	const handleDateChange = (date) => {
		if (date) {
			const dateString = date.toISOString();
			const formattedDate = dateString.slice(0, 10);
			setTodo({ ...todo, date: formattedDate });
		} else {
			setTodo({ ...todo, date: "" }); // Case where no date is selected
		}
	};

	//Return for rendering:
	return (
		<>
			<Stack
				mt={2}
				direction="row"
				spacing={2}
				alignItems="center"
				justifyContent="center"
			>
				<TextField
					label="Description"
					value={todo.description}
					onChange={(event) =>
						setTodo({ ...todo, description: event.target.value })
					}
				/>

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker label="Date" onChange={handleDateChange} />
				</LocalizationProvider>

				<TextField
					label="Priority"
					value={todo.priority}
					onChange={(event) =>
						setTodo({ ...todo, priority: event.target.value })
					}
				/>

				<Button variant="contained" onClick={handleClick}>
					Add Todo
				</Button>
				<Button variant="contained" color="error" onClick={handleDelete}>
					Delete
				</Button>
			</Stack>

			<Stack alignItems="center" justifyContent="center">
				<div
					className="ag-theme-material"
					style={{ width: "50%", height: 500 }}
				>
					<AgGridReact
						ref={gridRef}
						onGridReady={(params) => (gridRef.current = params.api)}
						rowSelection="single"
						rowData={todos}
						columnDefs={columnDefs}
						animateRows={true}
					></AgGridReact>
				</div>
			</Stack>
		</>
	);
}

export default TodoList;
