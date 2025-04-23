import { database } from "../database";
import { baseContext } from "../context";
import { createRouter } from "../utils/socketServer";

const getUsers = baseContext.resolve(async () => {
  const users = await database.user.findMany();

  return {
    success: true,
    data: users,
  };
});

export const userRouter = createRouter({
  getUsers,
});
