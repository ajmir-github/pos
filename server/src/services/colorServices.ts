import { database } from "./client";
import { withId, parseId, stringifyId, deepClone, generateId } from "./helpers";

export const ColorCollection = database.collection("colors");

export interface Color {
  id: string;
  name: string;
  class: string;
}

// Query
export async function getColors(): Promise<Color[]> {
  const colors = await ColorCollection.find().toArray();
  return colors.map(stringifyId) as Color[];
}

// Create
export async function createColor(input: Omit<Color, "id">): Promise<Color> {
  const color = withId(input);
  await ColorCollection.insertOne(color);
  return deepClone(stringifyId(color)) as Color;
}

// Update
export async function updateColor({ id, ...rest }: Color): Promise<boolean> {
  const result = await ColorCollection.updateOne(generateId(id), {
    $set: rest,
  });
  return result.modifiedCount > 0;
}

// Delete
export async function deleteColor(id: string): Promise<boolean> {
  const result = await ColorCollection.deleteOne(generateId(id));
  return result.deletedCount > 0;
}
