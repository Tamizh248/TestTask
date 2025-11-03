import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card';
import {  UserApprovalRequest } from '../../models/models';

@Component({
  selector: 'app-user-list-card',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user-list-card.html',
  styleUrls: ['./user-list-card.scss'],
})
export class UserListCardComponent implements OnInit {
  ngOnInit(): void {
    this.selectedUserId = this.selectedRequestId;
    console.log("selectedRequestId............", this.selectedRequestId)
    console.log("userssss...........", this.users);
    }
  @Input() title!: string;
  @Input() users: UserApprovalRequest[] = [];
  @Input() selectedRequestId: string | null = null;
  @Output() userSelected = new EventEmitter<string>();

  // ngOnInIt() {
  //   this.selectedUserId = this.selectedRequestId;
  //   console.log("selectedRequestId............", this.selectedRequestId)
  //   console.log("userssss...........", this.users);
  // }

  selectedUserId: string | null = null;

  onUserSelect(userId: string) {
    this.selectedUserId = userId;
    this.userSelected.emit(userId);
  }
}
