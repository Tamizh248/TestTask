export interface ApprovalRequest {
id: string;
entity: 'user'|'role'|'policy_group'|'master_lookup';
operation: 'create'|'update'|'delete';
initiator: string;
summary: string;
status: 'pending'|'approved'|'rejected'|'cancelled'|'in_progress';
createdAt: string;
dueAt?: string;
history: Array<{ by: string; action: string; note?: string; at: string }>;
}