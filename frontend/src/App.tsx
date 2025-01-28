import "./App.css";
import AddUserForm from "./components/add-user-form";
import Users from "./components/users";

function App() {
  return (
    <>
      <div
        style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1fr" }}
      >
        <div>
          <h2>Users</h2>
          <Users />
        </div>
        <div>
          <h2>Add User</h2>
          <AddUserForm />
        </div>
      </div>
    </>
  );
}

export default App;
