// src/app/mocks/approval-mock-data.ts

import { UserApprovalRequest } from '../models/models';

export const mockApprovalRequests = [
  {
    id: 'REQ-B302A9E8',
    name: 'spider man',
    email: 'spiderman@gmail.com',
    role: 'Engineer',
    entity_type: 'user',
    operation: 'create',
    entity_id: 'USR-001',
    initiator_id: 'INI-001',
    payload: {
      name: 'Ravi Kumar',
      role: 'Engineer',
      department: 'Development',
    },
    payload_summary: 'New user creation request: Ravi Kumar',
    config_id: 'CFG-001',
    current_stage: 1,
    stage_metadata: { stage: 1, approver: 'hr_manager' },
    status: 'PENDING',
    created_at: '2025-10-25T11:00:00Z',
    updated_at: '2025-10-25T11:00:00Z',
    due_at: '2025-10-30T11:00:00Z',
    meta: { priority: 'medium' },
    ip: '192.168.1.10',
  },
  {
    id: 'REQ-D7BC3E92',
    name: 'bat man',
    email: 'batman@gmail.com',
    role: 'Admin',
    entity_type: 'role',
    operation: 'update',
    entity_id: 'ROLE-001',
    initiator_id: 'INI-002',
    payload: { role: 'Admin', permissions: ['manage_users', 'view_logs'] },
    payload_summary: 'Role update for Admin privileges',
    config_id: 'CFG-002',
    current_stage: 2,
    stage_metadata: { stage: 2, approver: 'system_admin' },
    status: 'APPROVED',
    created_at: '2025-10-20T10:00:00Z',
    updated_at: '2025-10-21T10:00:00Z',
    due_at: '2025-10-28T10:00:00Z',
    meta: { priority: 'high' },
    ip: '10.0.0.15',
  },
  {
    id: 'REQ-AFBC47D2',
    name: 'ant man',
    email: 'antman@gmail.com',
    role: 'Admin',
    entity_type: 'policy_group',
    operation: 'delete',
    entity_id: 'POL-001',
    initiator_id: 'INI-003',
    payload: { policy_name: 'Data Retention Policy' },
    payload_summary: 'Request to delete Data Retention Policy',
    config_id: 'CFG-003',
    current_stage: 1,
    stage_metadata: { stage: 1, approver: 'policy_reviewer' },
    status: 'REJECTED',
    created_at: '2025-10-23T09:30:00Z',
    updated_at: '2025-10-24T11:00:00Z',
    due_at: null,
    meta: { priority: 'low' },
    ip: '172.16.0.3',
  },
];

export function getApprovalRequestsSummary(requests: typeof mockApprovalRequests): UserApprovalRequest[] {
  return requests.map((request) => ({
    id: request.id,
    name: request.name,
    status: request.status,
    entity_type: request.entity_type,
  })) as UserApprovalRequest[];
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

export function getApprovalRequestDetails(requestId: string): ApprovalRequestDetails | null {
  const request = mockApprovalRequests.find((req) => req.id === requestId);

  if (!request) {
    return null;
  }

  return {
    id: request.id,
    name: request.name,
    email: request.email,
    role: request.role,
    payload_summary: request.payload_summary,
    created_at: request.created_at,
    status: request.status as ApprovalRequestDetails['status'],
  };
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
export const mockApprovalHistory: ApprovalHistory[] = [
  {
    id: 'HIST-001',
    request_id: 'REQ-B302A9E8',
    actor_id: null,
    action: 'SUBMITTED',
    stage: 1,
    comment: 'Request created and submitted by HR',
    created_at: '2025-10-25T11:05:00Z',
    metadata: { ip: '192.168.1.10' },
  },
  {
    id: 'HIST-002',
    request_id: 'REQ-D7BC3E92',
    actor_id: 'ACT-002',
    action: 'APPROVED',
    stage: 2,
    comment: 'Approved by system admin',
    created_at: '2025-10-21T09:00:00Z',
    metadata: { notes: 'All checks passed' },
  },
  {
    id: 'HIST-003',
    request_id: 'REQ-AFBC47D2',
    actor_id: 'ACT-003',
    action: 'REJECTED',
    stage: 1,
    comment: 'Policy deletion denied by reviewer',
    created_at: '2025-10-24T10:00:00Z',
    metadata: { reason: 'Policy under compliance review' },
  },
];

