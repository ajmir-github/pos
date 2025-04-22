import { database } from "../database";
import { baseContext } from "../context";
import { createRouter } from "../utils/socketContext";
import { z, ZodError } from "zod";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../constants";

// get auth and cache it
const getAuth = baseContext.resolve(async (ctx) => {
  const token = ctx.getVerifiedToken();
  if (!token)
    return {
      success: false,
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
      success: false,
      error: {
        type: "Authentication",
        message: "This user does not exist anymore!",
      },
    };

  // cache and send it back
  ctx.setAuth(user);
  return {
    success: true,
    data: user,
  };
});

// sign in
const signIn = baseContext.resolveWithInput(
  z.object({ username: z.string().min(3), password: z.string().min(4) }),

  async ({ username, password }) => {
    const user = await database.user.findFirst({ where: { username } });
    if (!user)
      throw new ZodError([
        {
          path: ["username"],
          code: "custom",
          message: "Username not found!",
        },
      ]);

    const matched = bcryptjs.compareSync(password, user.password);
    if (!matched)
      throw new ZodError([
        {
          path: ["password"],
          code: "custom",
          message: "Password not matched!",
        },
      ]);

    const token = jwt.sign({ id: user.id }, env.SECRET_KEY);
    return {
      success: true,
      data: { token, user },
    };
  }
);

// sign up

export const authRouter = createRouter({
  getAuth,
  signIn,
});
