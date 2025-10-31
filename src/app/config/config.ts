import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ApprovalConfig } from './approval-config.model';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config.html',
  styleUrls: ['./config.scss']
})
export class ConfigComponent {
  configs: any[] = [];

  constructor(private mockDataService: MockDataService) {
    this.configs = this.mockDataService.getConfigs();
  }
  
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
