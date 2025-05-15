import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import socket from "../socket";
import { setLocalToken } from "../utils/localToken";
import { useAuth } from "../state";

const inputValidator = z.object({
  username: z.string().min(3),
  password: z.string().min(4),
});

type Inputs = z.infer<typeof inputValidator>;

export default function LoginPage() {
  const authState = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputValidator),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    socket.emit("signIn", data, (response) => {
      if (response.data) {
        setLocalToken(response.data.token);
        authState.init(response.data.user);
        return;
      }
      if (response.error) {
        for (const { path, message } of response.error) {
          setError(path[0] as keyof Inputs, {
            message,
          });
        }
        return;
      }
      console.error(response);
    });

  return (
    <form
      className="p-8 rounded w-full max-w-sm grid gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("username")}
        className="border rounded p-2 border-gray-300"
        placeholder="Username"
      />
      {errors.username && (
        <span className="text-red-400 text-sm">{errors.username.message}</span>
      )}

      <input
        placeholder="Password"
        {...register("password")}
        className="border rounded p-2 border-gray-300"
      />
      {errors.password && (
        <span className="text-red-400 text-sm">{errors.password.message}</span>
      )}

      <button type="submit" className="bg-blue-500 rounded p-2">
        Login
      </button>
    </form>
  );
}
