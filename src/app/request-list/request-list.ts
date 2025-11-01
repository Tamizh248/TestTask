import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../services/mock-data.service';
import {  UserApprovalRequest } from '../models/models';
import { ApprovalRequestDetails } from '../mocks/approval-mock-data';
import { ApprovalBaseListComponent } from '../components/approval-base-list/approval-base-list';

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

  constructor(private mockService: MockDataService) {}

  ngOnInit() {
    this.users = this.mockService.getMockUsers();
  }
  cancel() {
    console.log('Cancelled', this.selectedRequestId);
  }
  onUserSelect(requestId: string) {
    this.selectedRequestId = requestId;
    this.details = this.mockService.getMockRequestDetails(requestId);
  }

  handleAction(action: string) {
    switch (action) {
      case 'cancel':
        this.cancel();
        break;
    }
  }
}
