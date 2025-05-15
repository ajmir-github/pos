import * as fs from "fs";
import path from "path";

const CHUNK_SIZE = 2;
const buffer = Buffer.alloc(CHUNK_SIZE);
const filePath = path.join(__dirname, "Model", "data.dat");

async function main() {
  const fileDecripter = fs.openSync(filePath, "r");
  console.log(buffer, buffer.toString());
  fs.readSync(fileDecripter, buffer);
  console.log(buffer, buffer.toString());
}

main();
