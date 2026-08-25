import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * JSON file read/write helpers for data-driven tests.
 */
export class JsonUtility {
  static async read<T = unknown>(filePath: string): Promise<T> {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    const content = await fs.readFile(absolutePath, 'utf-8');
    return JSON.parse(content) as T;
  }

  static async write(filePath: string, data: unknown): Promise<void> {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
