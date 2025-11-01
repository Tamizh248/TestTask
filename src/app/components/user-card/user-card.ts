import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.html',
  styleUrls: ['./user-card.scss'],
})
export class UserCardComponent implements OnChanges {
  @Input() name!: string;
  @Input() status!: 'APPROVED' | 'PENDING' | 'REJECTED';
  @Input() entity_type!: string;
  @Input() id!: string;
  @Input() isSelected: boolean = false;
  @Output() selectUser = new EventEmitter<string>();

  labelText!: string;
  statusClass!: string;

  ngOnChanges() {
    switch (this.status) {
      case 'APPROVED':
        this.labelText = 'Approved';
        this.statusClass = 'bg-green-100 text-green-700';
        break;
      case 'REJECTED':
        this.labelText = 'Rejected';
        this.statusClass = 'bg-red-100 text-red-700';
        break;
      case 'PENDING':
        this.labelText = 'Pending';
        this.statusClass = 'bg-yellow-100 text-yellow-700';
        break;
      default:
        this.labelText = 'Unknown';
        this.statusClass = 'bg-gray-100 text-gray-600';
    }
  }

  onSelect() {
    this.selectUser.emit(this.id);
  }
}
