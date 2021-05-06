import React, { useState } from "react";

//create your first component
export function Home() {
	const [newTodo, setNewTodo] = useState("");
	const [todos, setTodos] = useState([]);

	//función que está atenta a los cambios en el input
	function listenInput(e) {
		//Esta funcion se activa con el onChange del input
		e.preventDefault();
		setNewTodo(e.target.value); // el event target es el input, y luego queremos de ese input el value. lo que obtengamos aquí va a ser el newTodo
	}

	//función que guarda el estado en un objeto cuando ingresamos un todo en el input
	function New(e) {
		//Esta funcion se activa por el form onsubmit, acá obtenemos el valor que proviene del input de newTodo
		e.preventDefault();
		if (newTodo === "") return;
		setTodos([
			...todos,
			{ id: Date.now(), text: newTodo, numero: todos.length + 1 }
		]); //acá vamos a obtener todos los todos y los vamos a agregar en el array [] en forma de objeto
		e.target.reset();
		//console.log(newTodo) // imprime lo que ingresas en el input luego de apretar enter
		//console.log(todos.length +1)  //imprime la cantidad de items de la lista todos
	}

	//funcion que elimina los todo
	function Remove(id) {
		setTodos(todos.filter(todo => todo.id !== id)); //solo retorna el todo si el todo.id no es igual al id
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
							{todos.map(todo => (
								<li className="list-group-item" key={todo.id}>
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
