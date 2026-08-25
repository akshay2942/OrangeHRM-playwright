/**
 * User role constants for OrangeHRM Admin module.
 */
export const ROLES = Object.freeze({
  ADMIN: 'Admin',
  ESS: 'ESS',
} as const);

export type RoleKey = keyof typeof ROLES;
