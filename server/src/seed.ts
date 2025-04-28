import { database } from "./database";
import { hashSync } from "bcryptjs";

export function run(funs: Promise<any>[]) {
  Promise.all(funs)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

const createUsers = database.user.createMany({
  data: [
    {
      id: 1,
      fullName: "Ajmir Raziqi",
      role: "admin",
      username: "ajmir",
      password: hashSync("123456", 10),
    },
    {
      id: 2,
      fullName: "Farid Nizai",
      username: "farid",
      role: "waiter",
      password: hashSync("123456", 10),
    },
  ],
});

const createCategories = database.category.createMany({
  data: [
    {
      id: 1,
      name: "Soft Drinks",
    },
    {
      id: 2,
      name: "Vodka",
    },
    {
      id: 3,
      name: "Steaks",
    },
    {
      id: 4,
      name: "Pizza",
    },
    {
      id: 5,
      name: "Cooktails",
    },
    {
      id: 6,
      name: "Wines",
    },
    {
      id: 7,
      name: "Bears",
    },
  ],
});

run([createUsers, createCategories]);
