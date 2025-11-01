import { Injectable } from '@angular/core';
import { ApprovalRequest } from '../models/models';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ConfigureWorkflow, User, Role } from '../models/models';
import {
  getApprovalRequestDetails,
  getApprovalRequestsSummary,
  mockApprovalRequests,
} from '../mocks/approval-mock-data';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  requests: ApprovalRequest[] = [];
  configs: any[] = [];

  // mock users and roles
  private mockUsers = [
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000001', name: 'Alice Johnson' },
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000002', name: 'Bob Smith' },
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000003', name: 'Charlie Brown' },
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000004', name: 'Diana Evans' },
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000005', name: 'Ethan Walker' },
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000006', name: 'Fiona Clark' },
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000007', name: 'George Miller' },
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000008', name: 'Hannah Lewis' },
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000009', name: 'Ian Scott' },
    { id: 'd2e8e3a2-9f22-4d33-a233-100000000010', name: 'Julia Roberts' },
  ];

  private mockRoles = [
    { id: 'hr_manager', name: 'HR Manager' },
    { id: 'admin', name: 'Administrator' },
    { id: 'policy_reviewer', name: 'Policy Reviewer' },
    { id: 'finance_head', name: 'Finance Head' },
    { id: 'it_support', name: 'IT Support' },
  ];

  constructor() {
    const now = new Date();
    this.configs = [
      {
        id: 'b1d4b3f2-4a71-4b3c-8b0a-1a9b12c4e001',
        entity_type: 'user',
        operation: '*',
        enabled: true,
        workflow: [
          { stage: 1, approver_type: 'role', approver_identifier: 'hr_manager' },
          { stage: 2, approver_type: 'role', approver_identifier: 'admin' },
        ],
        timeout_policy: {
          reminder_days: 2,
          auto_escalate_after_days: 5,
          auto_reject_after_days: 10,
        },
        created_by: '11111111-aaaa-bbbb-cccc-111111111111',
        created_at: '2025-10-25T10:15:00Z',
        updated_at: '2025-10-25T10:15:00Z',
      },
      {
        id: 'b1d4b3f2-4a71-4b3c-8b0a-1a9b12c4e002',
        entity_type: 'role',
        operation: 'create',
        enabled: true,
        workflow: [
          {
            stage: 1,
            approver_type: 'user',
            approver_identifier: 'd2e8e3a2-9f22-4d33-a233-100000000001',
          },
        ],
        timeout_policy: {
          reminder_days: 3,
          auto_escalate_after_days: 7,
        },
        created_by: '11111111-aaaa-bbbb-cccc-111111111111',
        created_at: '2025-10-25T10:20:00Z',
        updated_at: '2025-10-25T10:20:00Z',
      },
      {
        id: 'b1d4b3f2-4a71-4b3c-8b0a-1a9b12c4e003',
        entity_type: 'policy_group',
        operation: '*',
        enabled: false,
        workflow: [
          { stage: 1, approver_type: 'role', approver_identifier: 'policy_reviewer' },
          { stage: 2, approver_type: 'role', approver_identifier: 'policy_admin' },
        ],
        timeout_policy: {
          reminder_days: 1,
          auto_reject_after_days: 5,
        },
        created_by: '11111111-aaaa-bbbb-cccc-111111111111',
        created_at: '2025-10-25T10:25:00Z',
        updated_at: '2025-10-25T10:25:00Z',
      },
      {
        id: 'b1d4b3f2-4a71-4b3c-8b0a-1a9b12c4e004',
        entity_type: 'master_lookup',
        operation: '*',
        enabled: true,
        workflow: [
          { stage: 1, approver_type: 'role', approver_identifier: 'data_owner' },
          { stage: 2, approver_type: 'role', approver_identifier: 'system_admin' },
        ],
        timeout_policy: {
          reminder_days: 2,
        },
        created_by: '11111111-aaaa-bbbb-cccc-111111111111',
        created_at: '2025-10-25T10:30:00Z',
        updated_at: '2025-10-25T10:30:00Z',
      },
    ];
  }

  getConfigs() {
    return this.configs.slice();
  }
  getMockUsers() {
    return getApprovalRequestsSummary(mockApprovalRequests);
  }

  getConfig(id: string) {
    return this.configs.find((c) => c.id === id);
  }

  updateConfig(payload: ConfigureWorkflow): Observable<ConfigureWorkflow> {
    // simulate server processing time (500ms)
    const simulatedLatencyMs = 500;

    const idx = this.configs.findIndex((c) => c.id === payload.id);
    if (idx === -1) {
      // simulate not found error
      return throwError(() => new Error('Config not found'));
    }

    // create updated object (avoid mutating original reference unexpectedly)
    const nowIso = new Date().toISOString();
    const updated: ConfigureWorkflow = {
      ...this.configs[idx],
      ...payload,
      updated_at: nowIso,
    };

    // update in-memory store
    this.configs[idx] = updated;

    // return observable like an HTTP call
    return of(updated).pipe(
      delay(simulatedLatencyMs),
      map((x) => x) // keep chain flexible for future operators
    );
  }

  getUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(delay(250));
  }

  getRoles(): Observable<Role[]> {
    return of(this.mockRoles).pipe(delay(250));
  }

  getMockRequestDetails(requestId: string) {
    return getApprovalRequestDetails(requestId);
  }
}
