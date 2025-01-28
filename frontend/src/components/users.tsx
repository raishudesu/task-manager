import { useEffect, useState } from "react";
import UserUpdateForm from "./user-update-form";

export type User = {
  id: number;
  name: string;
  email: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [updateToggled, setUpdateToggled] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("http://localhost:5151/User");

      const data = await res.json();

      setUsers(data);
    };

    getTasks();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:5151/User/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("User deleted successfully");
    } else {
      alert("Failed to delete user");
    }
  };

  return (
    <div>
      {users?.map((user, index) => (
        <div key={index}>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>

          <button onClick={() => handleDelete(user.id)}>Delete</button>
          {updateToggled && <UserUpdateForm user={user} />}
          <button onClick={() => setUpdateToggled(!updateToggled)}>
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
