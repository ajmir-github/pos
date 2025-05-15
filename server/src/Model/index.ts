import Store from "./Store";
import Model from "./Model";

type CollectionItem = { id: string };
type LastIdMap = Record<string, number>;

export default class Database {
  private collections: Map<string, Model<any>> = new Map();
  private idStore: Store<LastIdMap>;

  constructor(private basePath: string) {
    this.idStore = new Store(`${basePath}/_lastId.json`, {});
  }

  getModel<T extends CollectionItem>(name: string): Model<T> {
    if (this.collections.has(name)) {
      return this.collections.get(name)!;
    }

    const store = new Store<T[]>(`${this.basePath}/${name}.json`, []);
    const model = new Model<T>(store);
    this.collections.set(name, model);
    return model;
  }

  async nextId(collectionName: string): Promise<string> {
    const ids = await this.idStore.get();
    const next = (ids[collectionName] ?? 0) + 1;
    ids[collectionName] = next;
    await this.idStore.set(ids);
    return String(next);
  }

  async resetAll(): Promise<void> {
    this.collections.clear();
    await this.idStore.set({});
  }
}
