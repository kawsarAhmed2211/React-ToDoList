import React, {useState, useRef, useEffect} from 'react';

function ToDoList() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
      });
    const [newTask, setnewTask] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    },[]);
      
      // Save tasks whenever they change
      useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }, [todos]);

      useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos"));
        if (savedTodos) {
          // Convert string todos to object format
          const formattedTodos = savedTodos.map(item =>
            typeof item === "string" ? { text: item, status: "undone" } : item
          );
          setTodos(formattedTodos);
        }
      }, []);
      

    function handleInputChange(event){
        // the event.target.value is used when we type in textbox it should change
        setnewTask(event.target.value);
    }

    function addTask(event){
        event.preventDefault();
        if (newTask.trim() === "") return;
        //the line below adds new tasks onto newtask
        //if you use todos in the t arrow function then it will only repeat the arrow function i.e what is there in the array
        setTodos(t => [...t, { text: newTask, status: "undone" }]);

        setnewTask("");
        inputRef.current.focus();
    }

    function deleteTask(index){
        const updatedTask = todos.filter((_, i) => i !== index);
        setTodos(updatedTask);
    }

    const toggleStatus = (index, status) => {
        const updated = [...todos];
        updated[index].status = status;
        setTodos(updated);
      };

    function moveTaskUp(index){
        if(index>0)
            {
            const updatedTask = [...todos];
            [updatedTask[index],updatedTask[index - 1]] = 
            [updatedTask[index-1], updatedTask[index]];
            setTodos(updatedTask);
            }
    }

    function moveTaskDown(index){
        if(index < todos.length - 1)
            {
            const updatedTask = [...todos];
            [updatedTask[index],updatedTask[index + 1]] = 
            [updatedTask[index+1], updatedTask[index]];
            setTodos(updatedTask);
            }
    }

  return (
    <>
    <div className='to-do-list'>
        <form onSubmit={addTask}>
        <h1>What do you want to do?</h1>
            <input 
            ref={inputRef}
            type="text"
            placeholder="Enter a Task"
            value = {newTask}
            onChange={handleInputChange}
            />
            <button 
            type='submit'
            className='add-button'
            >
                Add Task
            </button>
        </form>
            <ol>
                {todos.map((element,index) =>
                // the below method returns all elements from the array if you use todos but not element 
                    <li key ={index}>
                        <span
                        style={{
                            color: element.status === "done" ? "green" : "black",
                            animation: element.status === "undone" ? "blinker 1s linear infinite" : "none"
                        }}
                        >
                        {element.text}
                        </span>
                        <button className="done-button" onClick={() => toggleStatus(index, "done")}>
                            Done</button>
                        <button className="undone-button" onClick={() => toggleStatus(index, "undone")}>
                            Undone</button>
                        <button className='delete-button' onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                        <button className='move-button' onClick={() => moveTaskUp(index)}>
                            Move Up
                        </button>
                        <button className='move-button' onClick={() => moveTaskDown(index)}>
                            Move Down
                        </button>
                    </li>
                )}  
            </ol>
    </div>
    </>
  )
}

export default ToDoList