import { Injectable } from '@angular/core';
import { ApprovalRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class MockDataService {
    requests: ApprovalRequest[] = [];


    constructor() {
        const now = new Date();
        this.requests = [
            {
                id: 'REQ-2025-001', entity: 'user', operation: 'create', initiator: 'John Mathew',
                summary: 'Create Case Manager account', status: 'pending',
                createdAt: now.toISOString(), dueAt: new Date(now.getTime() + 24 * 3600 * 1000).toISOString(),
                history: [{ by: 'John Mathew', action: 'created request', at: now.toISOString() }]
            },
            {
                id: 'REQ-2025-002', entity: 'master_lookup', operation: 'update', initiator: 'Admin',
                summary: 'Update case status list', status: 'in_progress', createdAt: new Date(now.getTime() - 3600 * 1000).toISOString(),
                history: [{ by: 'Admin', action: 'created request', at: new Date(now.getTime() - 3600 * 1000).toISOString() }]
            },
            {
                id: 'REQ-2025-003', entity: 'policy_group', operation: 'update', initiator: 'Tamizh',
                summary: 'Change policy group rules', status: 'rejected', createdAt: new Date(now.getTime() - 3600 * 24 * 1000).toISOString(),
                history: [{ by: 'Tamizh', action: 'created request', at: new Date(now.getTime() - 3600 * 24 * 1000).toISOString() }, { by: 'Manager B', action: 'rejected', note: 'Missing justification', at: new Date(now.getTime() - 3600 * 23 * 1000).toISOString() }]
            }
        ];
    }


    listRequests() { return this.requests.slice(); }
    getRequest(id: string) { return this.requests.find(r => r.id === id); }
    createRequest(req: ApprovalRequest) { this.requests.unshift(req); }
    updateRequest(id: string, patch: Partial<ApprovalRequest>) { const r = this.getRequest(id); if (r) Object.assign(r, patch); }
    cancelRequest(id: string) { this.updateRequest(id, { status: 'cancelled' }); }
    approve(id: string, by = 'System') { this.updateRequest(id, { status: 'approved' }); const r = this.getRequest(id); r?.history.push({ by, action: 'approved', at: new Date().toISOString() }); }
    reject(id: string, by = 'System', note = '') { this.updateRequest(id, { status: 'rejected' }); const r = this.getRequest(id); r?.history.push({ by, action: 'rejected', note, at: new Date().toISOString() }); }
}