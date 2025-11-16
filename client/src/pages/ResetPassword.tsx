import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { reset } from "../api/auth";
import { useSearchParams } from "react-router-dom";

const schema = z.object({
  newPassword: z.string().min(6)
});

type Form = z.infer<typeof schema>;

export default function ResetPassword() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const token = params.get("token");

  const { register, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const [msg, setMsg] = React.useState("");

  const onSubmit = async (data: Form) => {
    try {
      const res = await reset({
        id: id!,
        token: token!,
        newPassword: data.newPassword,
      });
      setMsg(res.message);
    } catch (err: any) {
      setMsg(err?.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("newPassword")} placeholder="New password" type="password" />
        <button type="submit">Reset Password</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
