import { FormEvent } from "react";
import { Task } from "../types/task-manager";

const CreateTaskForm = () => {
  const createTask = async (task: Task) => {
    const res = await fetch("http://localhost:5151/UserTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...task, userId: 1 }),
    });

    if (res.ok) {
      alert("Task created successfully!");
    } else {
      console.log(res);
      alert("Something went wrong!");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const formValues = Object.fromEntries(formData.entries());

    const taskData: Task = {
      taskTitle: String(formValues.taskTitle),
      taskDescription: String(formValues.taskDescription),
    };

    createTask(taskData);

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="taskTitle">Title</label>
      <input type="text" name="taskTitle" />
      <label htmlFor="taskDescription">Description</label>
      <input type="text" name="taskDescription" />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTaskForm;
