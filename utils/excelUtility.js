import path from 'node:path';
import * as XLSX from 'xlsx';

/**
 * Excel data loader for data-driven tests.
 */
export class ExcelUtility {
  /**
   * Reads the first sheet (or named sheet) into JSON rows.
   * @param {string} filePath
   * @param {string} [sheetName]
   * @returns {Record<string, unknown>[]}
   */
  static read(filePath, sheetName) {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.resolve(process.cwd(), filePath);
    const workbook = XLSX.readFile(absolutePath);
    const name = sheetName || workbook.SheetNames[0];
    const sheet = workbook.Sheets[name];
    return XLSX.utils.sheet_to_json(sheet);
  }
}
