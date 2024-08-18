import { useEffect, useState } from 'react'

type TodoItem = {
    id: number;
    value: string;
}

export const TodoList = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState<TodoItem | null>(null);

    useEffect(() => {
        (async () => {
            const response = await (await fetch('http://localhost:3000/todos')).json();
            setTodos(response.todos)
        })();
    }, []);

    const handleAddTodo = async () => {
        if (newTodo && newTodo.value.trim() !== '') {
            let response = await (await fetch('http://localhost:3000/addTodo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo)
            })).json()
            console.log(response);

            setTodos(response.todos)
            setNewTodo(null);
        }
    }

    const handleDelete = async (id: number) => {
        let response = await (await fetch(`http://localhost:3000/deleteTodo/${id}`, {
            method: 'DELETE',
        })).json()
        setTodos(response.todos)
    }

    return (
        <div>
            <h2 className='text-2xl font-medium mb-4 text-center'>Todo list</h2>
            <input className='p-2 px-3 rounded' type="text" placeholder='Add todo' value={newTodo?.value ?? ''} onChange={(e) => setNewTodo({ id: new Date().getTime(), value: e.target.value })} />
            <button onClick={handleAddTodo} className='bg-zinc-900 transition hover:bg-blue-900 mt-3 p-2 px-3 ms-3 treansition rounded font-bold'>Add todo</button>
            <ul className='mt-4'>
                {todos.map((todo, index) => {
                    return <li className='px-2 py-1 bg-gray-700 rounded cursor-pointer mb-3 hover:bg-red-900 transition' key={index} onClick={() => handleDelete(todo.id)}>{todo.value}</li>
                })}
            </ul>
        </div>
    )
}

