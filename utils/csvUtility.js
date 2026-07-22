import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

/**
 * CSV data loader for data-driven tests.
 */
export class CsvUtility {
  /**
   * @param {string} filePath
   * @returns {Record<string, string>[]}
   */
  static read(filePath) {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  }
}
