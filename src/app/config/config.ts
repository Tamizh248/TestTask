import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ApprovalConfig } from './approval-config.model';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config.html',
  styleUrls: ['./config.scss']
})
export class ConfigComponent {

  configs: any[] = [
    {
      id: 'b1d4b3f2-4a71-4b3c-8b0a-1a9b12c4e001',
      entity_type: 'user',
      operation: '*',
      enabled: true,
      workflow: [
        { stage: 1, approver_type: 'role', approver_identifier: 'hr_manager' },
        { stage: 2, approver_type: 'role', approver_identifier: 'admin' }
      ],
      timeout_policy: {
        reminder_days: 2,
        auto_escalate_after_days: 5,
        auto_reject_after_days: 10
      },
      created_by: '11111111-aaaa-bbbb-cccc-111111111111',
      created_at: '2025-10-25T10:15:00Z',
      updated_at: '2025-10-25T10:15:00Z'
    },
    {
      id: 'b1d4b3f2-4a71-4b3c-8b0a-1a9b12c4e002',
      entity_type: 'role',
      operation: 'create',
      enabled: true,
      workflow: [
        { stage: 1, approver_type: 'user', approver_identifier: 'd2e8e3a2-9f22-4d33-a233-100000000001' }
      ],
      timeout_policy: {
        reminder_days: 3,
        auto_escalate_after_days: 7
      },
      created_by: '11111111-aaaa-bbbb-cccc-111111111111',
      created_at: '2025-10-25T10:20:00Z',
      updated_at: '2025-10-25T10:20:00Z'
    },
    {
      id: 'b1d4b3f2-4a71-4b3c-8b0a-1a9b12c4e003',
      entity_type: 'policy_group',
      operation: '*',
      enabled: false,
      workflow: [
        { stage: 1, approver_type: 'role', approver_identifier: 'policy_reviewer' },
        { stage: 2, approver_type: 'role', approver_identifier: 'policy_admin' }
      ],
      timeout_policy: {
        reminder_days: 1,
        auto_reject_after_days: 5
      },
      created_by: '11111111-aaaa-bbbb-cccc-111111111111',
      created_at: '2025-10-25T10:25:00Z',
      updated_at: '2025-10-25T10:25:00Z'
    },
    {
      id: 'b1d4b3f2-4a71-4b3c-8b0a-1a9b12c4e004',
      entity_type: 'master_lookup',
      operation: '*',
      enabled: true,
      workflow: [
        { stage: 1, approver_type: 'role', approver_identifier: 'data_owner' },
        { stage: 2, approver_type: 'role', approver_identifier: 'system_admin' }
      ],
      timeout_policy: {
        reminder_days: 2
      },
      created_by: '11111111-aaaa-bbbb-cccc-111111111111',
      created_at: '2025-10-25T10:30:00Z',
      updated_at: '2025-10-25T10:30:00Z'
    }
  ];

  selectedEntity = this.configs[0]; // default tab

  selectEntity(entity: any): void {
    this.selectedEntity = entity;
  }

  toggleActive(): void {
    this.selectedEntity.enabled = !this.selectedEntity.enabled;
  }

    countries = ['India', 'USA', 'UK', 'Canada', 'Australia'];
    selectedCountry = '';

  onSelect(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log('Selected country:', selectedValue);
  }
}
