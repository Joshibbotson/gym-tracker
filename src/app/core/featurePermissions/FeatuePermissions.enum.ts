import { UserPermission } from './UserPermissions.enum';

export const FeaturePermission: Record<string, UserPermission[]> = {
  ADMIN: [UserPermission.ADMIN],
};
