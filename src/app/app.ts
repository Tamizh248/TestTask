// src/app/app.ts (standalone component)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';

interface Approver {
  id: number;
  name: string;
}

interface Permissions {
  create: boolean;
  update: boolean;
  delete: boolean;
  all: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink], // <-- fixes NgFor/ngModel
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  permissions: Permissions = {
    create: true,
    update: true,
    delete: true,
    all: true
  };

  // <-- strongly typed keys so template indexing is safe
  readonly permissionKeys: (keyof Permissions)[] = ['create', 'update', 'delete', 'all'];

  isActive = true;
  viewMode: 'name' | 'role' = 'name';
  duration = 24;
  durationUnit: 'hours' | 'days' = 'hours';

  approvers: Approver[] = [
    { id: 1, name: 'Michael Jenkins' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Michael Jenkins' },
    { id: 4, name: 'John Doe' },
    { id: 5, name: 'John Doe' }
  ];

  togglePermission(key: keyof Permissions): void {
    this.permissions[key] = !this.permissions[key];
  }

  removeApprover(id: number): void {
    this.approvers = this.approvers.filter(app => app.id !== id);
  }

  setViewMode(mode: 'name' | 'role'): void {
    this.viewMode = mode;
  }

  setDurationUnit(unit: 'hours' | 'days'): void {
    this.durationUnit = unit;
  }

  // keep this only if you still want a method form (not necessary now)
  getPermissionKeys(): (keyof Permissions)[] {
    return this.permissionKeys;
  }
}
