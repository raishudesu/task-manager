import { useEffect, useState } from "react";

type Task = {
  id: number;
  taskTitle: string;
  taskDescription: string;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:5151/UserTask");
      const data = await res.json();
      setTasks(data);
      console.log(data);
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id: number) => {
    const res = await fetch(`http://localhost:5151/UserTask/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const newTasks = tasks?.filter((task) => task.id !== id);
      setTasks(newTasks || []);
    }
  };

  const handleDeleteTask = (id: number) => {
    const usePref = confirm("Are you sure you want to delete this task?");

    if (usePref) deleteTask(id);
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>Title</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>
            Description
          </th>
          <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map(({ id, taskTitle, taskDescription }, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {taskTitle}
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {taskDescription}
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "8px",
                display: "flex",
                gap: "1rem",
              }}
            >
              <button>Update</button>
              <button
                onClick={() => handleDeleteTask(id)}
                style={{ backgroundColor: "red" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tasks;
