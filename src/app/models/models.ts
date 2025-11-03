export interface ApprovalRequest {
  id: string;
  entity: 'user' | 'role' | 'policy_group' | 'master_lookup';
  operation: 'create' | 'update' | 'delete';
  initiator: string;
  summary: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'in_progress';
  createdAt: string;
  dueAt?: string;
  history: Array<{ by: string; action: string; note?: string; at: string }>;
}

export interface ConfigureWorkflow {
  id: string;
  entity_type: string;
  operation: string;
  enabled: boolean;
  workflow: WorkflowStage[];
  timeout_policy: TimeoutPolicy;
  created_by: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface WorkflowStage {
  stage: number;
  approver_type: string;
  approver_identifier: string;
}

export interface TimeoutPolicy {
  reminder_days: number;
  auto_escalate_after_days?: number;
  auto_reject_after_days?: number;
}

export interface User {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface UserApprovalRequest {
  id: string;
  name: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  entity_type: 'user' | 'role' | 'policy group' | 'master lookup';
}

export interface ApprovalRequestDetails {
  id: string;
  name: string;
  email: string;
  role: string;
  payload_summary: string;
  created_at: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface ApprovalHistory {
  id: string;
  request_id: string;
  actor_id: string | null;
  action: string;
  stage: number;
  comment: string;
  created_at: string;
  metadata: Record<string, any>;
}


export type ApprovalResponse = {
  stages: number;
  history: ApprovalHistory[];
  workFlow: WorkflowStage[];
};
