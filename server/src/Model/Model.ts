import Store from "./Store";

export default class Model<T extends { id: string }> {
  constructor(private store: Store<T[]>) {}

  async all() {
    return await this.store.get();
  }

  async get(id: string) {
    return (await this.all()).find((item) => item.id === id) ?? null;
  }

  async add(item: T) {
    const items = await this.all();
    items.push(item);
    await this.store.set(items);
    return item;
  }

  async update(id: string, data: Partial<T>) {
    const items = await this.all();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Item with id "${id}" not found`);
    items[index] = { ...items[index], ...data };
    await this.store.set(items);
    return items[index];
  }

  async delete(id: string) {
    const items = await this.all();
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length)
      throw new Error(`Item with id "${id}" not found`);
    await this.store.set(filtered);
  }
}
