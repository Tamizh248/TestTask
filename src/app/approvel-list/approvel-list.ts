import { Component } from '@angular/core';
import {  UserApprovalRequest } from '../models/models';
import { ApprovalRequestDetails } from '../mocks/approval-mock-data';
import { MockDataService } from '../services/mock-data.service';
import { CommonModule } from '@angular/common';
import { ApprovalBaseListComponent } from '../components/approval-base-list/approval-base-list';

@Component({
  selector: 'app-approvel-list',
  imports: [CommonModule, ApprovalBaseListComponent],
  templateUrl: './approvel-list.html',
  styleUrl: './approvel-list.scss',
})
export class ApprovelListComponent {
  users: UserApprovalRequest[] = [];
  selectedRequestId: string | null = null;
  details: ApprovalRequestDetails | null = null;

  constructor(private mockService: MockDataService) {}

  ngOnInit() {
    this.users = this.mockService.getMockUsers();
  }

  onUserSelect(requestId: string) {
    this.selectedRequestId = requestId;
    this.details = this.mockService.getMockRequestDetails(requestId);
  }

  approve() {
    console.log('Approved', this.selectedRequestId);
  }

  reject() {
    console.log('Rejected', this.selectedRequestId);
  }

  handleAction(action: string) {
    switch (action) {
      case 'approve':
        this.approve();
        break;
      case 'reject':
        this.reject();
        break;
    }
  }
}
