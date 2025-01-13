import { useReducer, useState } from "react";

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case "add_task":
            return [
                ...state,
                { id: Date.now(), text: action.text, completed: false },
            ];
        case "toggle_task":
            return state.map(function (task) {
                if (task.id === action.id) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            });
        case "delete_task":
            return state.filter(function (task) {
                return task.id !== action.id;
            });
        default:
            throw new Error("Acción no válida");
    }
}

export default function TaskList() {
    const [tasks, dispatch] = useReducer(reducer, initialState);
    const [newTask, setNewTask] = useState("");

    function handleAddTask() {
        if (newTask.trim()) {
            dispatch({ type: "add_task", text: newTask });
            setNewTask("");
        }
    }

    function handleToggleTask(id) {
        dispatch({ type: "toggle_task", id: id });
    }

    function handleDeleteTask(id) {
        dispatch({ type: "delete_task", id: id });
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Nueva tarea"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Añadir</button>
            <ul>
                {tasks.map(function (task) {
                    return (
                        <li key={task.id}>
                            <span
                                style={{
                                    textDecoration: task.completed
                                        ? "line-through"
                                        : "none",
                                }}
                                onClick={() => handleToggleTask(task.id)}
                            >
                                {task.text}
                            </span>
                            <button onClick={() => handleDeleteTask(task.id)}>
                                Eliminar
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
