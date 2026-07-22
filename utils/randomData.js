import { faker } from '@faker-js/faker';

/**
 * Generates dynamic test data using Faker.
 */
export class RandomDataGenerator {
  /**
   * @returns {string}
   */
  static username() {
    return `user_${faker.string.alphanumeric(8).toLowerCase()}`;
  }

  /**
   * @returns {string}
   */
  static password() {
    return `Pw@${faker.string.alphanumeric(10)}1`;
  }

  /**
   * @returns {string}
   */
  static firstName() {
    return faker.person.firstName();
  }

  /**
   * @returns {string}
   */
  static lastName() {
    return faker.person.lastName();
  }

  /**
   * @returns {string}
   */
  static middleName() {
    return faker.person.middleName();
  }

  /**
   * @returns {string}
   */
  static email() {
    return faker.internet.email().toLowerCase();
  }

  /**
   * @returns {string}
   */
  static phone() {
    return faker.string.numeric(10);
  }

  /**
   * @returns {string}
   */
  static employeeId() {
    return faker.string.numeric(6);
  }

  /**
   * @returns {{ firstName: string, middleName: string, lastName: string, employeeId: string }}
   */
  static employee() {
    return {
      firstName: this.firstName(),
      middleName: this.middleName(),
      lastName: this.lastName(),
      employeeId: this.employeeId(),
    };
  }

  /**
   * @returns {{ firstName: string, lastName: string, email: string, contactNumber: string }}
   */
  static candidate() {
    return {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(),
      contactNumber: this.phone(),
    };
  }

  /**
   * @returns {string}
   */
  static buzzPost() {
    return `Auto post ${faker.lorem.sentence(6)} ${Date.now()}`;
  }

  /**
   * @returns {string}
   */
  static jobTitle() {
    return faker.person.jobTitle();
  }
}
