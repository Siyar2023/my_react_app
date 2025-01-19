import './App.css';
import { useState, useEffect } from "react"; // Importing useState and useEffect hooks

function App() {
    const [tasks, setTasks] = useState([]); // State to hold tasks
    const [newTask, setNewTask] = useState(''); // State for new task input
    const [editIndex, setEditIndex] = useState(null); // Index of the task being edited
    const [editTask, setEditTask] = useState(''); // The edited task
    const [currentDateTime, setCurrentDateTime] = useState(''); // State for current date and time

    // Function to handle adding a new task
    const addTask = () => {
        if (newTask.trim() === '') return; // Prevent empty tasks
        setTasks([...tasks, newTask]);
        setNewTask(''); // Clear input field
    };

    // Function to handle removing a task
    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Function to handle editing a task
    const startEditTask = (index) => {
        setEditIndex(index);
        setEditTask(tasks[index]); // Pre-fill the input field with the current task text
    };

    // Function to save the edited task
    const saveTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = editTask;
        setTasks(updatedTasks);
        setEditIndex(null); // Exit edit mode
        setEditTask('');
    };

    // Function to update the current date and time
    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentDateTime(now.toLocaleString()); // Set current date and time in state
        }, 1000); // Update every second

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App">
            <h1>To-Do list</h1>
            <div className="task-input">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            // Show edit mode for the current task
                            <>
                                <input
                                    type="text"
                                    value={editTask}
                                    onChange={(e) => setEditTask(e.target.value)}
                                />
                                <button onClick={() => saveTask(index)}>Save</button>
                                <button onClick={() => setEditIndex(null)}>Cancel</button>
                            </>
                        ) : (
                            // Show the task text and buttons for normal mode
                            <>
                                {task}
                                <button onClick={() => startEditTask(index)}>Edit</button>
                                <button onClick={() => removeTask(index)}>Remove</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* Display current date and time */}
            <div className="date-time">
                {currentDateTime}
            </div>
        </div>
    );
}

export default App;
