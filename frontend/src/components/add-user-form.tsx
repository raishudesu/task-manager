import { FormEvent } from "react";

const AddUserForm = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const data = Object.fromEntries(formData.entries());

    const postData = async () => {
      const res = await fetch("http://localhost:5151/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("User added successfully");
      } else {
        alert("Failed to add user");
      }
    };

    postData();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <label htmlFor="id">ID</label>
      <input type="number" name="id" />
      <label htmlFor="name">Name</label>
      <input type="text" name="name" />
      <label htmlFor="email">Email</label>
      <input type="text" name="email" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddUserForm;
