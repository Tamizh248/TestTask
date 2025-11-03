import { Injectable } from '@angular/core';
import { ApprovalHistory, ApprovalRequest, UserApprovalRequest } from '../models/models';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ConfigureWorkflow, User, Role, ApprovalRequestDetails, ApprovalResponse } from '../models/models';
import {
    mockApprovalRequests,
    mockUsers,
    mockRoles,
    configs,
    mockApprovalHistory,
} from '../mocks/approval-mock-data';

@Injectable({ providedIn: 'root' })
export class MockDataService {
    requests: ApprovalRequest[] = [];

    constructor() {
        const now = new Date();
    }

    getConfigs() {
        return configs.slice();
    }
    getMockUsers(): UserApprovalRequest[] {
        return mockApprovalRequests.map((request) => ({
            id: request.id,
            name: request.name,
            status: request.status,
            entity_type: request.entity_type,
        })) as UserApprovalRequest[];
    }

    getRequestsByUserId(userId: string): UserApprovalRequest[] {
        return mockApprovalRequests
            .filter(req => req.initiator_id === userId)
            .map(req => ({
                id: req.id,
                name: req.name,
                status: req.status,
                entity_type: req.entity_type,
            })) as UserApprovalRequest[];
    }

    getConfig(id: string) {
        return configs.find((c) => c.id === id);
    }

    updateConfig(payload: ConfigureWorkflow): Observable<ConfigureWorkflow> {
        // simulate server processing time (500ms)
        const simulatedLatencyMs = 500;

        const idx = configs.findIndex((c) => c.id === payload.id);
        if (idx === -1) {
            // simulate not found error
            return throwError(() => new Error('Config not found'));
        }

        // create updated object (avoid mutating original reference unexpectedly)
        const nowIso = new Date().toISOString();
        const updated: ConfigureWorkflow = {
            ...configs[idx],
            ...payload,
            updated_at: nowIso,
        };

        // update in-memory store
        configs[idx] = updated;

        // return observable like an HTTP call
        return of(updated).pipe(
            delay(simulatedLatencyMs),
            map((x) => x) // keep chain flexible for future operators
        );
    }

    getUsers(): Observable<User[]> {
        return of(mockUsers).pipe(delay(250));
    }

    getUserById(userId: string){
        return mockUsers.find(user => user.id === userId);
    }

    getRoles(): Observable<Role[]> {
        return of(mockRoles).pipe(delay(250));
    }

    getMockRequestDetails(requestId: string): ApprovalRequestDetails | null {
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

    getApprovalHistoryByRequest(requestId: string | null): ApprovalHistory[] {
        if (!requestId) {
            return [];
        }
        // Filter mockApprovalHistory by requestId
        return mockApprovalHistory.filter(history => history.request_id === requestId);
    }

    getHistoryData(requestId: string | null): ApprovalResponse {
        const filteredHistory = mockApprovalHistory.filter((history) => history.request_id === requestId);
        const requestDetails = mockApprovalRequests.find((request) => request.id === requestId);
        const configDetails = configs.find((config) => config.entity_type === requestDetails?.entity_type);
        return {
            stages: configDetails ? configDetails.workflow.length : 0,
            history: filteredHistory,
            workFlow: configDetails ? configDetails.workflow : [],
        };
    }
}
