import { database } from "../database";
import { baseContext } from "../context";
import { createRouter } from "../utils/socketServer";
import { z, ZodError } from "zod";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../constants";

// get auth and cache it
const getAuth = baseContext.resolve(async (ctx) => {
  const token = ctx.getVerifiedToken();
  if (!token)
    return {
      error: {
        type: "Authentication",
        message: "You are not signed in!",
      },
    };
  const user = await database.user.findFirst({
    where: { id: token.id },
  });
  if (!user)
    return {
      error: {
        type: "Authentication",
        message: "This user does not exist anymore!",
      },
    };

  // cache and send it back
  ctx.setAuth(user);
  return {
    data: user,
  };
});

// sign in
const signInValidation = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});
const signIn = baseContext.resolveWithInput(
  async (inputs: z.input<typeof signInValidation>) => {
    const validation = signInValidation.safeParse(inputs);
    if (!validation.success)
      return {
        error: validation.error.errors,
      };
    const user = await database.user.findFirst({
      where: { username: validation.data.username },
    });
    if (!user)
      return {
        error: new ZodError([
          {
            path: ["username"],
            code: "custom",
            message: "Username not found!",
          },
        ]).errors,
      };

    const matched = bcryptjs.compareSync(
      validation.data.password,
      user.password
    );
    if (!matched)
      return {
        error: new ZodError([
          {
            path: ["password"],
            code: "custom",
            message: "Password not matched!",
          },
        ]).errors,
      };

    const token = jwt.sign({ id: user.id }, env.SECRET_KEY);
    return {
      data: { token, user },
    };
  }
);

// sign out
const signOut = baseContext.resolve((context) => {
  return context.clearAuth();
});

export const authRouter = createRouter({
  getAuth,
  signIn,
  signOut,
});
