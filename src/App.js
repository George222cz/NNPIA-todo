import './App.css';
import {useEffect, useState} from "react";
import Todo from "./todo";

function App() {

    const [name, setName] = useState("")
    const [data, setData] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState()

    useEffect(()=>{
        console.log("spuštěno")
        fetch('http://localhost:3001/todos')
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error("Unable to get data: "+response.statusText)
            })
            .then(json => setData(json))
            .catch((err) => setError(err.message))
            .finally(() => setIsPending(false))
    },[])


    const onSubmitHandler = event => {
        event.preventDefault()

        const newTodo = {
            name: name
        }

        fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        }).then(response=>response.json())
            .then(json=> {
                onNewTodoHandler(json);
                setName("");
            })
    }

    const onNewTodoHandler = (newTodo) => {
        const newData = [...data];
        newData.push(newTodo)
        setData(newData)
    }

    const removeTodoHandler = function (todoID) {
        fetch('http://localhost:3001/todos/'+todoID, {
            method: 'DELETE'
        })
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error("Unable to delete data: "+response.statusText)
            })
            .then(data => console.log(data))
            .catch((err) => setError(err.message))
            .finally(()=>{
                const newData = [...data];
                newData.splice(newData.findIndex(item=>item.id===todoID),1)
                setData(newData)
            })
    };

    return (
    <div className="App">
        <div style={{
            marginRight: "auto",
            marginLeft: "auto",
            width: "100%",
            maxWidth: "1100px"
        }}>
            <div style={{
                display: "flex",
                flexWrap: "wrap"
            }}>
                {isPending && "Loading data..."}
                {error && <div style={{color: "red"}}>{error}</div>}
                <form onSubmit={onSubmitHandler} style={{display: "flex", width: "100%", marginTop: "15px"}}>
                    <input type={"text"} placeholder={"Enter new todo"} value={name} onChange={(e) => setName(e.target.value)} style={{flex: "1 1 auto"}}/>
                    <input type={"submit"} value={"Add"}/>
                </form>
            </div>
            <div style={{
                display: "flex",
                flexWrap: "wrap"
            }}>
                <div style={{display: "flex", width: "100%",fontSize: "1.5em", marginTop: "15px"}}>
                    <div style={{flex: "1 1 auto"}}>Todo list</div>
                    {<div>There are {data.length} todos.</div>}
                </div>
                {data.map(item=> <Todo key={item.id} todo={item} onClickHandler={removeTodoHandler} />)}
            </div>
        </div>
    </div>
  );
}

export default App;
