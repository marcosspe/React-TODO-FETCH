import React, { useState } from "react";

//create your first component
export function Home() {
	const [newTodo, setNewTodo] = useState("");
	const [todos, setTodos] = useState([]);

	function listenInput(e) {
		e.preventDefault();
		setNewTodo(e.target.value);
	}

	function New(e) {
		e.preventDefault();
		if (newTodo === "") return;
		setTodos([
			...todos,
			{ id: Date.now(), text: newTodo, numero: todos.length + 1 }
		]);
		e.target.reset();
	}

	function Remove(id) {
		setTodos(todos.filter(todo => todo.id !== id));
	}

	return (
		<div className="container">
			<div className="row justify-content-center mt-5 ">
				<div className="col-4">
					<h1 className="titulo d-flex justify-content-center text-secondary">
						todos
					</h1>

					<form onSubmit={New}>
						<input
							type="text"
							className="form-control mb-2 border border-secondary"
							placeholder={
								todos.length == 0
									? "No tasks, add a task"
									: "Add task"
							}
							onChange={listenInput}></input>
						<ul className="list-group border border-secondary">
							{todos.map((todo, index) => (
								<li className="list-group-item" key={index}>
									{todo.text}
									<button
										type="button"
										className="close"
										onClick={() => Remove(todo.id)}>
										<span aria-hidden="true">&times;</span>
									</button>
								</li>
							))}
						</ul>
						<div className="col mb-5">
							<small className="items">
								{todos.length} items left
							</small>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
