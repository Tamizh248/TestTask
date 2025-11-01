import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card';
import {  UserApprovalRequest } from '../../models/models';

@Component({
  selector: 'app-user-list-card',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user-list-card.html',
  styleUrls: ['./user-list-card.scss'],
})
export class UserListCardComponent {
  @Input() title!: string;
  @Input() users: UserApprovalRequest[] = [];
  @Output() userSelected = new EventEmitter<string>();

  selectedUserId: string | null = null;

  onUserSelect(userId: string) {
    this.selectedUserId = userId;
    this.userSelected.emit(userId);
  }
}
