import { faker } from '@faker-js/faker';

export interface EmployeeData {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
}

export interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

/**
 * Generates dynamic test data using Faker.
 */
export class RandomDataGenerator {
  static username(): string {
    return `user_${faker.string.alphanumeric(8).toLowerCase()}`;
  }

  static password(): string {
    return `Pw@${faker.string.alphanumeric(10)}1`;
  }

  static firstName(): string {
    return faker.person.firstName();
  }

  static lastName(): string {
    return faker.person.lastName();
  }

  static middleName(): string {
    return faker.person.middleName();
  }

  static email(): string {
    return faker.internet.email().toLowerCase();
  }

  static phone(): string {
    return faker.string.numeric(10);
  }

  static employeeId(): string {
    return faker.string.numeric(6);
  }

  static employee(): EmployeeData {
    return {
      firstName: this.firstName(),
      middleName: this.middleName(),
      lastName: this.lastName(),
      employeeId: this.employeeId(),
    };
  }

  static candidate(): CandidateData {
    return {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(),
      contactNumber: this.phone(),
    };
  }

  static buzzPost(): string {
    return `Auto post ${faker.lorem.sentence(6)} ${Date.now()}`;
  }

  static jobTitle(): string {
    return faker.person.jobTitle();
  }
}
