import prisma from './prisma';

interface AuditLogParams {
  userId: string;
  companyId?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  oldValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  ipAddress?: string;
}

/**
 * Creates an audit log entry for sensitive actions securely on the server-side.
 *
 * @param params - The details of the action to log.
 */
export async function logAuditAction(params: AuditLogParams) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId,
        companyId: params.companyId,
        action: params.action,
        resourceType: params.resourceType,
        resourceId: params.resourceId,
        oldValue: params.oldValue ? JSON.stringify(params.oldValue) : undefined,
        newValue: params.newValue ? JSON.stringify(params.newValue) : undefined,
        ipAddress: params.ipAddress,
      },
    });
  } catch (error) {
    // In a production environment, you would use a robust logging service (e.g., Datadog, Sentry)
    // to capture failures in writing audit logs without breaking the application flow.
    console.error('Failed to write audit log:', error);
  }
}
