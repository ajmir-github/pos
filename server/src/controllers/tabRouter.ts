import { database } from "../database";
import { baseContext } from "../context";
import { createRouter } from "../utils/socketServer";

const getTabs = baseContext.resolve(async () => {
  const tabs = await database.tab.findMany();

  return {
    success: true,
    data: tabs,
  };
});

export const tabRouter = createRouter({
  getTabs,
});
