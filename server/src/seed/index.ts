import { database } from "../database";
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
      name: "Steaks",
    },
    {
      id: 2,
      name: "Pasta",
    },
    {
      id: 3,
      name: "Soft Drinks",
    },
    {
      id: 4,
      name: "Vodka",
    },
    {
      id: 5,
      name: "Cooktails",
    },

    {
      id: 6,
      name: "Gin",
      parentId: 5,
    },
    {
      id: 7,
      name: "Vodka",
      parentId: 5,
    },
    {
      id: 8,
      name: "Rum",
      parentId: 5,
    },
    {
      id: 9,
      name: "Other",
      parentId: 5,
    },
    {
      id: 10,
      name: "Non-alcoholic",
      parentId: 5,
    },
  ],
});

const createColor = database.color.createMany({
  data: [
    { id: 1, name: "Red", class: "bg-red-500" },
    { id: 2, name: "Blue", class: "bg-blue-500" },
    { id: 3, name: "Green", class: "bg-green-500" },
    { id: 4, name: "Yellow", class: "bg-yellow-500" },
    { id: 5, name: "Gray", class: "bg-gray-500" },
    { id: 6, name: "Pink", class: "bg-pink-500" },
    { id: 7, name: "Purple", class: "bg-purple-500" },
    { id: 8, name: "Aqua", class: "bg-aqua-500" },
    { id: 9, name: "Orange", class: "bg-orange-500" },
  ],
});

const createItems = database.item.createMany({
  data: [
    { id: 1, categoryId: 6, colorId: 1, name: "Plank Steak", price: 18.5 },
    {
      id: 2,
      categoryId: 1,
      colorId: 1,
      name: "",
      price: 2,
    },
  ],
});

run([createUsers, createCategories, createColor]);
