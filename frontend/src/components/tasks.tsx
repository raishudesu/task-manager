import { useEffect, useState } from "react";

type Task = {
  date: Date;
  summary: string;
  temperatureC: number;
  temperatureF: number;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("http://localhost:5151/WeatherForecast");

      const data = await res.json();

      console.log(data);
      setTasks(data);
    };

    getTasks();
  }, []);

  return (
    <div>
      {tasks?.map((task, index) => <div key={index}>{task.summary}</div>)}
    </div>
  );
};

export default Tasks;
