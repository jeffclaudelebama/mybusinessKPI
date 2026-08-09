import prisma from './prisma';

/**
 * Validates if a user has a specific permission within a given company.
 * This is executed server-side.
 *
 * @param userId - The ID of the user requesting the action.
 * @param companyId - The ID of the company context.
 * @param requiredPermission - The specific permission required (e.g., "finance.view").
 * @returns boolean - True if the user has the permission, false otherwise.
 */
export async function hasPermission(
  userId: string,
  companyId: string,
  requiredPermission: string
): Promise<boolean> {
  // 1. Check if user is super admin
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isSuperAdmin: true },
  });

  if (user?.isSuperAdmin) {
    return true;
  }

  // 2. Fetch the roles the user has for the specific company
  const userRoles = await prisma.userCompanyRole.findMany({
    where: {
      userId,
      companyId,
    },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  // 3. Check if any of the assigned roles contain the required permission
  for (const userRole of userRoles) {
    for (const rolePermission of userRole.role.permissions) {
      if (rolePermission.permission.action === requiredPermission) {
        return true;
      }
    }
  }

  return false;
}
