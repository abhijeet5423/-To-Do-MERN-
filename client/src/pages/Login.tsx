import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type Form = z.infer<typeof schema>;

export default function Login() {
  const { register, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const mutation = useLogin();
  const navigate = useNavigate();

  const onSubmit = (data: Form) => {
    setMsg("");
    setIsError(false);
    mutation.mutate(data, {
      onSuccess: () => {
        navigate("/"); // redirect to todo list
      },
      onError: (err: any) => {
        setIsError(true);
        setMsg(err?.response?.data?.message || "Invalid credentials");
      },
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back 👋</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="login-input"
          />

          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="login-input"
          />

          <button
            type="submit"
            className="login-btn"
            disabled={mutation.status === "pending"}
          >
            {mutation.status === "pending" ? "Logging in..." : "Log In"}
          </button>

          {/* Forgot Password */}
          <button
            type="button"
            className="forgot-btn"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>

          {/* Error / Message */}
          {msg && <p className={isError ? "error-msg" : "success-msg"}>{msg}</p>}

          {/* Signup button */}
          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            Create New Account
          </button>
        </form>
      </div>
    </div>
  );
}
