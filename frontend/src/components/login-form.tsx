import { FormEvent } from "react";

const LoginForm = () => {
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const data = Object.fromEntries(formData.entries());

    console.log(data);

    // const loginUser = async () => {

    // }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email"></label>
      <input type="text" name="email" />
      <label htmlFor="password"></label>
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
