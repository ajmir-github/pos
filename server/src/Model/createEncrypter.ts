// createEncrypter.ts
import crypto from "crypto";

export default function createEncrypter(password: string, salt: string) {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync(password, salt, 32);
  const ivLength = 16;
  const separator = "-";
  const encoding = "utf8";

  return {
    encrypt(data: string): string {
      const iv = crypto.randomBytes(ivLength);
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      const encrypted = Buffer.concat([
        cipher.update(data, encoding),
        cipher.final(),
      ]);
      return iv.toString("hex") + separator + encrypted.toString("hex");
    },

    decrypt(encrypted: string): string {
      const [ivHex, contentHex] = encrypted.split(separator);
      const iv = Buffer.from(ivHex, "hex");
      const content = Buffer.from(contentHex, "hex");
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      const decrypted = Buffer.concat([
        decipher.update(content),
        decipher.final(),
      ]);
      return decrypted.toString(encoding);
    },
  };
}
