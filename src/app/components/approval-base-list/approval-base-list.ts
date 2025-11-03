import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserApprovalRequest, ApprovalRequestDetails, ApprovalHistory, ApprovalResponse } from '../../models/models';
import { UserListCardComponent } from '../../components/user-list-card/user-list-card';
import { ButtonComponent } from '../../shared/button/button';
import { ApprovalHistoryComponent } from '../approval-history/approval-history';

@Component({
  selector: 'app-approval-base-list',
  standalone: true,
  imports: [CommonModule, UserListCardComponent, ButtonComponent, ApprovalHistoryComponent],
  templateUrl: './approval-base-list.html',
  styleUrls: ['./approval-base-list.scss']
})
export class ApprovalBaseListComponent {
  @Input() users: UserApprovalRequest[] = [];
  @Input() details: ApprovalRequestDetails | null = null;
  @Input() selectedRequestId: string | null = null;
  @Input() actionButtons: { label: string; type: 'primary' | 'secondary' | 'danger'; action: string }[] = [];
  @Input() historyData?: ApprovalResponse | null | undefined;

  @Output() userSelected = new EventEmitter<string>();
  @Output() actionClicked = new EventEmitter<string>();

  onUserSelect(id: string) {
    this.userSelected.emit(id);
  }

  triggerAction(action: string) {
    this.actionClicked.emit(action);
  }
}
