import { FormEvent } from "react";
import { User } from "./users";

const UserUpdateForm = ({ user }: { user: User }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const data = Object.fromEntries(formData.entries());

    const updateUser = async () => {
      const res = await fetch(`http://localhost:5151/User/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("User updated successfully");
      } else {
        alert("Failed to update user");
      }
    };

    updateUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="id"
        placeholder="ID"
        readOnly
        value={user.id}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={user.name}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        defaultValue={user.email}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UserUpdateForm;
