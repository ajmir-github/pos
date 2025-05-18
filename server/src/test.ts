import { createColor, getColors, trackColors } from "./services/colorServices";

async function main() {
  console.log(await getColors());
}

main();
