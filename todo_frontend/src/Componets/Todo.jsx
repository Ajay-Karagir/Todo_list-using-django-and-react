import { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todos/");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/todos/", newTodo);
      setNewTodo({ title: "", description: "" });
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div 
      style={{
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundImage: "url('/todo.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div style={{ 
        maxWidth: "400px", 
        textAlign: "center", 
        padding: "20px", 
        border: "1px solid #ddd", 
        borderRadius: "10px", 
        backgroundColor: "#f9f9f9", 
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ color: "#333" }}>Todo List</h1>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            style={{ padding: "8px", margin: "5px", width: "90%", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            style={{ padding: "8px", margin: "5px", width: "90%", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button onClick={addTodo} 
            style={{ 
              padding: "10px 15px", 
              backgroundColor: "#28a745", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer",
              transition: "background 0.3s ease" 
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
          >
            Add Todo
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: "0" }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{ 
              background: "white", 
              padding: "10px", 
              margin: "5px 0", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              borderRadius: "5px", 
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" 
            }}>
              <span><strong>{todo.title}</strong>: {todo.description}</span>
              <button onClick={() => deleteTodo(todo.id)} 
                style={{ 
                  background: "red", 
                  color: "white", 
                  border: "none", 
                  cursor: "pointer", 
                  padding: "5px 10px", 
                  borderRadius: "5px", 
                  transition: "background 0.3s ease" 
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "darkred"}
                onMouseOut={(e) => e.target.style.backgroundColor = "red"}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
