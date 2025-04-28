import { database } from "./database";

database.category
  .findMany({
    where: {
      parentId: null,
    },
    select: {
      id: true,
      name: true,
      children: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  .then((res) => console.dir(res, { depth: null }));
