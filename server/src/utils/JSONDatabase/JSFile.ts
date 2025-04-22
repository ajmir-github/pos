// JSONFile.ts
import fs from "fs";
import path from "path";
import _ from "lodash";

export default class JSONFile<Data extends object> {
  name: string;
  filePath: string;
  cache: boolean;
  private cachedData: Data | null;
  private defaultData?: Data;

  constructor(name: string, options?: { cache?: boolean; defaultData?: Data }) {
    this.name = name;
    this.filePath = path.join(process.cwd(), "source", name + ".jsd");
    this.cache = options?.cache ?? false;
    this.cachedData = null;
    this.defaultData = options?.defaultData;
  }

  clearCache() {
    this.cachedData = null;
  }

  async read(): Promise<Data> {
    if (this.cache && this.cachedData) return _.cloneDeep(this.cachedData);

    try {
      const buffer = await fs.promises.readFile(this.filePath, "utf-8");
      const { data } = JSON.parse(buffer) as { data: Data };
      if (this.cache) this.cachedData = data;
      return _.cloneDeep(data);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        await this.write(this.defaultData || ({} as Data));
        return this.read();
      }
      throw err;
    }
  }

  async write(data: Data): Promise<Data> {
    const buffer = JSON.stringify({ data }, null, 2);
    await fs.promises.writeFile(this.filePath, buffer, "utf-8");
    if (this.cache) this.cachedData = data;
    return _.cloneDeep(data);
  }
}
