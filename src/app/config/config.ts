import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ApprovalConfig } from './approval-config.model';
import { MockDataService } from '../services/mock-data.service';
import { ConfigureWorkflow, WorkflowStage, User, Role } from '../models/models';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config.html',
  styleUrls: ['./config.scss']
})
export class ConfigComponent {
  configs: ConfigureWorkflow[] = [];
  selectedEntity: ConfigureWorkflow;
  saving: boolean = false;
  approverMode: 'user' | 'role' = 'role';

  // lists loaded from service
  users: User[] = [];
  roles: Role[] = [];

  // selected identifiers (ids of users or roles)
  selectedItems: string[] = [];

  // dropdown open state
  dropdownOpen = false;

  private subs = new Subscription();

  constructor(private mockDataService: MockDataService) {
    this.configs = this.mockDataService.getConfigs();
    this.selectedEntity = this.configs[0]; // default tab

    // load users & roles
    this.subs.add(this.mockDataService.getUsers().subscribe(u => (this.users = u)));
    this.subs.add(this.mockDataService.getRoles().subscribe(r => (this.roles = r)));

    // init selection from selectedEntity.workflow
    this.syncSelectedItemsFromWorkflow();
  }

  selectEntity(entity: ConfigureWorkflow): void {
    this.selectedEntity = entity;
    this.syncSelectedItemsFromWorkflow();
  }

  toggleActive(): void {
    console.log('Toggling active', this.selectedEntity.enabled);
    this.selectedEntity.enabled = !this.selectedEntity.enabled;
    console.log('New enabled state:', this.selectedEntity.enabled);
  }

  // segmented control
  setApproverMode(mode: 'user' | 'role') {
    if (this.approverMode === mode) return;
    this.approverMode = mode;
    this.syncSelectedItemsFromWorkflow();
    this.dropdownOpen = false;
  }

  // check if id is selected
  isSelected(id: string): boolean {
    return this.selectedItems.indexOf(id) !== -1;
  }

  // toggle checkbox item
  toggleItem(id: string, checked: boolean) {
    if (checked) {
      if (!this.isSelected(id)) this.selectedItems = [...this.selectedItems, id];
    } else {
      this.selectedItems = this.selectedItems.filter(x => x !== id);
    }
    this.updateWorkflowFromSelectedItems();
  }

  // remove tag (×)
  removeTag(event: Event, id: string) {
    event.stopPropagation();
    this.selectedItems = this.selectedItems.filter(x => x !== id);
    this.updateWorkflowFromSelectedItems();
  }

  // Turn selectedItems into WorkflowStage[] and assign to selectedEntity.workflow
  private updateWorkflowFromSelectedItems() {
    if (!this.selectedEntity) return;
    const type = this.approverMode === 'user' ? 'user' : 'role';
    const newWorkflow: WorkflowStage[] = this.selectedItems.map((identifier, idx) => ({
      stage: idx + 1,
      approver_type: type,
      approver_identifier: identifier
    }));
    this.selectedEntity.workflow = newWorkflow;
  }

  // Initialize selectedItems from current workflow depending on approverMode
  private syncSelectedItemsFromWorkflow() {
    if (!this.selectedEntity || !this.selectedEntity.workflow) {
      this.selectedItems = [];
      return;
    }
    const type = this.approverMode === 'user' ? 'user' : 'role';
    this.selectedItems = (this.selectedEntity.workflow || [])
      .filter(s => s.approver_type === type)
      .sort((a, b) => a.stage - b.stage)
      .map(s => s.approver_identifier);
  }

  getUserName(id: string): string {
    const user = this.users.find(u => u.id === id);
    return user ? user.name : id;
  }

  getRoleName(id: string): string {
    const role = this.roles.find(r => r.id === id);
    return role ? role.name : id;
  }


  saveConfig(): void {
    console.log('Configuration saved:', this.selectedEntity);
    // optional: disable UI while saving
    this.saving = true;

    // Call simulated API
    this.mockDataService
      .updateConfig(this.selectedEntity)
      .pipe(finalize(() => (this.saving = false)))
      .subscribe({
        next: updated => {
          // replace local configs array reference (so UI consumers who read array get latest)
          this.configs = this.mockDataService.getConfigs();
          // ensure selectedEntity references the updated object from service
          this.selectedEntity = updated;
          console.log('UPDATED Configuration saved:', updated);
        },
        error: err => {
          console.error('Failed to save configuration', err);
          alert('Failed to save configuration: ' + err.message);
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
