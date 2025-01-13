import { useReducer } from "react";

const initialState = 0;

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        case "reset":
            return initialState;
        default:
            throw new Error("Acción no válida");
    }
}

export default function Counter() {
    const [count, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <h1>Contador: {count}</h1>
            <button onClick={() => dispatch({ type: "increment" })}>
                Incrementar
            </button>
            <button onClick={() => dispatch({ type: "decrement" })}>
                Decrementar
            </button>
            <button onClick={() => dispatch({ type: "reset" })}>
                Reiniciar
            </button>
        </div>
    );
}
