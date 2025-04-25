import { database } from "./database";

database.color
  .create({
    data: {
      name: "Red",
      class: "bg-red-500",
    },
  })
  .then(async (res) => {
    console.log(res);
    const colors = await database.color.findMany();
    console.log(colors);
  })
  .catch((err) => {
    console.log(err);
  });
