import { promises as fs } from "fs";
import * as path from "path";

// Mock createEncrypter (replace with your own implementation if needed)
function createEncrypter(password: string, salt: string) {
  return {
    encrypt: (data: string) => Buffer.from(data, "utf8").toString("base64"),
    decrypt: (data: string) => Buffer.from(data, "base64").toString("utf8"),
  };
}

interface StoreOptions {
  encryptionPassword?: string;
  encryptionSalt?: string;
  verbose?: boolean;
}

const FILE_ENCODING = "utf8";

export default class Store<T = any> {
  private filePath: string;
  private defaultValue: T;
  private encrypter: ReturnType<typeof createEncrypter> | null = null;
  private cache: T | null = null;
  private verbose: boolean;

  constructor(filePath: string, defaultValue: T, options: StoreOptions = {}) {
    this.filePath = filePath;
    this.defaultValue = defaultValue;
    this.verbose = options.verbose ?? true;

    const { encryptionPassword, encryptionSalt } = options;
    if (encryptionPassword && encryptionSalt) {
      this.encrypter = createEncrypter(encryptionPassword, encryptionSalt);
    }
  }

  private log(message: string) {
    if (this.verbose) console.log(message);
  }

  private async ensureDirExists(): Promise<void> {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });
  }

  private async exists(): Promise<boolean> {
    try {
      await fs.access(this.filePath);
      return true;
    } catch {
      return false;
    }
  }

  private async writeRaw(content: string): Promise<void> {
    await this.ensureDirExists();
    await fs.writeFile(this.filePath, content, FILE_ENCODING);
    this.log(`✅ Written to ${this.filePath}`);
  }

  private async readRaw(): Promise<string> {
    const exists = await this.exists();
    if (!exists) {
      const defaultJson = JSON.stringify(this.defaultValue, null, 2);
      await this.writeRaw(defaultJson);
    }
    return await fs.readFile(this.filePath, FILE_ENCODING);
  }

  async get(): Promise<T> {
    if (this.cache !== null) return this.cache;

    const content = await this.readRaw();
    const decrypted = this.encrypter
      ? this.encrypter.decrypt(content)
      : content;

    try {
      this.cache = JSON.parse(decrypted);
      return this.cache as T;
    } catch (err: any) {
      throw new Error(`❌ Failed to parse JSON: ${err.message}`);
    }
  }

  async set(data: T): Promise<void> {
    this.cache = data;
    const json = JSON.stringify(data, null, 2);
    const toWrite = this.encrypter ? this.encrypter.encrypt(json) : json;
    await this.writeRaw(toWrite);
  }

  async clearCache(): Promise<void> {
    this.cache = null;
  }

  async delete(): Promise<void> {
    this.cache = null;
    try {
      await fs.unlink(this.filePath);
      this.log(`🗑️ Deleted ${this.filePath}`);
    } catch (err: any) {
      if (err.code === "ENOENT") {
        this.log(`⚠️ File "${this.filePath}" does not exist.`);
      } else {
        throw new Error(`❌ Failed to delete file: ${err.message}`);
      }
    }
  }
}
