
function Todo({todo, onClickHandler}) {

    return(
        <div style={{
            display: "flex",
            width: "100%",
            border: "1px solid lightgray",
            padding: "5px",
            margin: "5px",
            borderRadius: "8px"
        }}>
            <p style={{flex: "1 1 auto"}}>{todo.name}</p>
            <button onClick={()=>onClickHandler(todo.id)}>Complete</button>
        </div>
    )
}

export default Todo;