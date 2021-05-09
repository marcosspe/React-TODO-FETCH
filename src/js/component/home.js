import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [newTodo, setNewTodo] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcosspe", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp);
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcosspe", {
			method: "PUT",
			body: JSON.stringify(
				todos.map(label => {
					return { label: label, done: false };
				})
			),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	}, [todos]);

	function clearAll() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcosspe", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp);
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}

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

	const Delete = id => {
		const arrFilter = todos.filter(item => item.id !== id);
		setTodos(arrFilter);
	};

	return (
		<div className="container">
			<div>
				<h1 className="titulo text-secondary d-flex justify-content-center">
					todos
				</h1>
			</div>
			<div className="row justify-content-center mt-5 ">
				<div className="col">
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
										onClick={() => Delete(todo.id)}>
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
				{/* <div className="col-2">
					<button
						type="button"
						className="btn btn-info btn-sm btn-block mb-2"
						onClick={clearAll}>
						Clean
					</button>
				</div> */}
			</div>
		</div>
	);
}
