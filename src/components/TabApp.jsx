import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import TodoList from "./TodoList";
import Home from "./Home";

function TabApp() {
	//States:
	const [value, setValue] = React.useState("one");

	//Methods:
	const handleChange = (event, value) => {
		setValue(value);
	};

	//Rendering:
	return (
		<div>
			<Tabs value={value} onChange={handleChange}>
				<Tab value="one" label="HOME" />
				<Tab value="two" label="TODOS" />
			</Tabs>
			{value === "one" && <Home />}
			{value === "two" && <TodoList />}
		</div>
	);
}

export default TabApp;

/*
{value === "one" && <div>Item One</div>}
{value === "two" && <div>Item Two</div>}
*/
