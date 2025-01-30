import { useEffect, useState, FormEvent } from "react";
import { Task } from "../types/task-manager";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [editing, setEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  const updateTask = async (task: Task) => {
    const res = await fetch(`http://localhost:5151/UserTask/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, userId: 1 }),
    });

    if (res.ok) {
      alert("Task updated successfully!");
    } else {
      console.log(res);
      alert("Something went wrong!");
    }
  };

  const handleDeleteTask = (id: number) => {
    const usePref = confirm("Are you sure you want to delete this task?");

    if (usePref) deleteTask(id);
  };

  const handleSubmitEditing = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const formValues = Object.fromEntries(formData.entries());

    const taskData: Task = {
      id: Number(formValues.id),
      taskTitle: String(formValues.taskTitle),
      taskDescription: String(formValues.taskDescription),
    };

    updateTask(taskData);
  };

  const handleTaskEditing = (task: Task) => {
    if (selectedTask) {
      setSelectedTask(null);
      setEditing(!editing);
      return;
    }

    setSelectedTask(task);

    setEditing(!editing);
  };
  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Description
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Actions
            </th>
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
                <button
                  onClick={() =>
                    handleTaskEditing({ id, taskTitle, taskDescription })
                  }
                >
                  Update
                </button>
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
      {editing && (
        <div>
          <form onSubmit={handleSubmitEditing}>
            <input name="id" defaultValue={selectedTask?.id} hidden />
            <label htmlFor="taskTitle">Title</label>
            <input
              type="text"
              name="taskTitle"
              defaultValue={selectedTask?.taskTitle}
            />
            <label htmlFor="taskDescription">Description</label>
            <input
              type="text"
              name="taskDescription"
              defaultValue={selectedTask?.taskDescription}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Tasks;
