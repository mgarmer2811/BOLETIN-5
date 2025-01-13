import { useReducer } from "react";

const initialState = {
    name: "",
    email: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "update_field":
            return { ...state, [action.field]: action.value };
        case "reset":
            return initialState;
        default:
            throw new Error("Acción no válida");
    }
}

export default function Form() {
    const [formState, dispatch] = useReducer(reducer, initialState);

    function handleChange(event) {
        const { name, value } = event.target;
        dispatch({ type: "update_field", field: name, value: value });
    }

    function handleReset() {
        dispatch({ type: "reset" });
    }

    return (
        <div>
            <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formState.name}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                placeholder="Correo"
                value={formState.email}
                onChange={handleChange}
            />
            <button onClick={handleReset}>Resetear</button>
            <p>Nombre: {formState.name}</p>
            <p>Correo: {formState.email}</p>
        </div>
    );
}
