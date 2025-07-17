// TodoPage.jsx
export default function TodoPage({ tasks }) {
  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-xl rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>
      <a
        href="/add"
        className="inline-block mb-4 text-sm text-blue-500 hover:underline"
      >
        ➕ Add New Task
      </a>
      <ul className="space-y-2">
        {tasks.length === 0 ? (
          <li className="text-gray-500 italic">No tasks yet.</li>
        ) : (
          tasks.map((task, index) => (
            <li key={task.id} className="p-2 bg-gray-100 rounded-md">
              <strong>SN:</strong> {index + 1} — {task.description}{" "}
              {task.important && <span className="text-red-500">★</span>}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
