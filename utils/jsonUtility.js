import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * JSON file read/write helpers for data-driven tests.
 */
export class JsonUtility {
  /**
   * @param {string} filePath Absolute or relative path
   * @returns {Promise<unknown>}
   */
  static async read(filePath) {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    const content = await fs.readFile(absolutePath, 'utf-8');
    return JSON.parse(content);
  }

  /**
   * @param {string} filePath
   * @param {unknown} data
   * @returns {Promise<void>}
   */
  static async write(filePath, data) {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    await fs.mkdir(path.dirname(absolutePath), { recursive: true });
    await fs.writeFile(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
