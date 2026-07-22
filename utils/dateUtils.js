/**
 * Date utility helpers for leave and timesheet scenarios.
 */
export class DateUtils {
  /**
   * @param {Date} [date=new Date()]
   * @returns {string} YYYY-MM-DD
   */
  static toISODate(date = new Date()) {
    return date.toISOString().slice(0, 10);
  }

  /**
   * @param {number} days
   * @param {Date} [from=new Date()]
   * @returns {string}
   */
  static addDays(days, from = new Date()) {
    const result = new Date(from);
    result.setDate(result.getDate() + days);
    return this.toISODate(result);
  }

  /**
   * @param {number} days
   * @param {Date} [from=new Date()]
   * @returns {string}
   */
  static subtractDays(days, from = new Date()) {
    return this.addDays(-days, from);
  }

  /**
   * Formats date as used by OrangeHRM date pickers (yyyy-mm-dd).
   * @param {Date} [date=new Date()]
   * @returns {string}
   */
  static formatOrangeHRM(date = new Date()) {
    return this.toISODate(date);
  }

  /**
   * @returns {{ startDate: string, endDate: string }}
   */
  static leaveRange() {
    return {
      startDate: this.addDays(7),
      endDate: this.addDays(8),
    };
  }
}
