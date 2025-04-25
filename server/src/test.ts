import { database } from "./database";
import { hashSync } from "bcryptjs";

database.user
  .create({
    data: {
      fullName: "Ajmir Raziqi",
      role: "admin",
      username: "ajmir",
      password: hashSync("123456", 10),
    },
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
