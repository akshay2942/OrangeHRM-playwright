/**
 * Date utility helpers for leave and timesheet scenarios.
 */
export class DateUtils {
  static toISODate(date: Date = new Date()): string {
    return date.toISOString().slice(0, 10);
  }

  static addDays(days: number, from: Date = new Date()): string {
    const result = new Date(from);
    result.setDate(result.getDate() + days);
    return this.toISODate(result);
  }

  static subtractDays(days: number, from: Date = new Date()): string {
    return this.addDays(-days, from);
  }

  /** Formats date as used by OrangeHRM date pickers (yyyy-mm-dd). */
  static formatOrangeHRM(date: Date = new Date()): string {
    return this.toISODate(date);
  }

  static leaveRange(): { startDate: string; endDate: string } {
    return {
      startDate: this.addDays(7),
      endDate: this.addDays(8),
    };
  }
}
