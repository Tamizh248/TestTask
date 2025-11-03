import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';
import {  UserApprovalRequest, ApprovalRequestDetails, ApprovalHistory, ApprovalResponse } from '../../models/models';
import { ApprovalBaseListComponent } from '../approval-base-list/approval-base-list';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, ApprovalBaseListComponent],
  templateUrl: './request-list.html',
  styleUrls: ['./request-list.scss'],
})
export class RequestListComponent implements OnInit {
  users: UserApprovalRequest[] = [];
  selectedRequestId: string | null = null;
  details: ApprovalRequestDetails | null = null;
  userId = 'd2e8e3a2-9f22-4d33-a233-100000000001';
  historyData: ApprovalResponse | null = null;

  constructor(private mockService: MockDataService) {} 

  ngOnInit() {
    this.users = this.mockService.getRequestsByUserId(this.userId);
    this.selectedRequestId = this.users.length > 0 ? this.users[0].id : null;
    console.log('Selected Request ID:', this.selectedRequestId);
    if (this.selectedRequestId) {
      this.details = this.mockService.getMockRequestDetails(this.selectedRequestId);
    }
    this.historyData = this.mockService.getHistoryData(this.selectedRequestId);
    console.log('History Data:', this.historyData);
  }
  cancel() {
    console.log('Cancelled', this.selectedRequestId);
  }
  onUserSelect(requestId: string) {
    console.log('User selected request ID:', requestId);
    this.selectedRequestId = requestId;
    this.details = this.mockService.getMockRequestDetails(requestId);
    this.historyData = this.mockService.getHistoryData(requestId);
    console.log('Updated History Data:', this.historyData);
  }

  handleAction(action: string) {
    switch (action) {
      case 'cancel':
        this.cancel();
        break;
    }
  }
}
