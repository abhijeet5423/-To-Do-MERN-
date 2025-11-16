// src/pages/ForgotPassword.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // reuse login styles

// Validation schema
const schema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type Form = z.infer<typeof schema>;

// Placeholder API function — replace with your real API call
const safeForgot = async (_data: Form) => {
  try {
    // Example: return await forgot(_data);
    return { message: "Check your email for the reset link" };
  } catch {
    throw new Error("API request failed");
  }
};

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const [msg, setMsg] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate(); // type inferred automatically

  const onSubmit = async (_data: Form) => {
    setMsg("");
    setIsError(false);

    try {
      const res = await safeForgot(_data);
      setMsg(res.message || "Check your email for the reset link");
    } catch (err: any) {
      setIsError(true);
      setMsg(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Forgot Password?</h2>
        <p className="forgot-text">
          Enter your email to receive password reset instructions.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="login-input"
          />

          <button type="submit" className="login-btn">
            Send Reset Link
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
