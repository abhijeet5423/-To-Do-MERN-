import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignup } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // reuse the same styles

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});
type Form = z.infer<typeof schema>;

export default function Signup() {
  const { register, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const mutation = useSignup();
  const navigate = useNavigate();

  const onSubmit = (data: Form) => {
    setMsg("");
    setIsError(false);
    mutation.mutate(data, {
      onSuccess: (res: any) => {
        setMsg(res?.message || "Signup successful! Please login.");
        setIsError(false);
      },
      onError: (err: any) => {
        setMsg(err?.response?.data?.message || "Signup error");
        setIsError(true);
      },
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            {...register("name")}
            placeholder="Name"
            className="login-input"
          />
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
            {mutation.status === "pending" ? "Signing up..." : "Signup"}
          </button>

          {msg && (
            <p className={isError ? "error-msg" : "success-msg"}>{msg}</p>
          )}

          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}
