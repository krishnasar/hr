import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTodoPage({ onAdd }) {
  const [description, setDescription] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      sn: Date.now(), // You can replace with an actual serial number system
      description,
      important: isImportant,
    };
    onAdd(task); // Adds task
    navigate("/todo"); // Redirect to Todo List page
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4">➕ Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Description */}
        <div>
          <label className="block font-medium">Task Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Toggle Button */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Important:</label>
          <input
            type="checkbox"
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
            className="h-5 w-5"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
