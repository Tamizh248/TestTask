import { Component, Input, input, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { ApprovalResponse } from '../../models/models';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../services/mock-data.service';

type ActionType = 'APPROVED' | 'REJECTED' | 'PENDING';

@Component({
  selector: 'app-approval-history',
  imports: [CommonModule],
  templateUrl: './approval-history.html',
  styleUrls: ['./approval-history.scss'],
})



export class ApprovalHistoryComponent implements OnInit, OnChanges {

  @Input() data!: ApprovalResponse | null | undefined;
  approverType!: string;

  stagesData: Array<{
    stage: number;
    label: string;
    status: ActionType;
    comment?: string;
    date?: string;
  }> = [];

  constructor(private MockDataService: MockDataService) {}

  ngOnInit(): void {
    // this.approverType = this.data?.workFlow[0]?.approver_type || 'N/A';
    // console.log('Approver Type:', this.approverType);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      this.prepareStageData();
    }
    
    // console.log('Approver Type:', this.approverType);
    // if (this.approverType === 'user') {
    //   // get user names from mock data service or any other source
    //   console.log('Approver type is user, additional processing can be done here.');
    //   // Example: this.userService.getUserNames().subscribe(names => { ... });

    // }
  }

  prepareStageData() {
    const wf = this.data?.workFlow ?? [];
    const hist = this.data?.history ?? [];
    this.approverType = this.data?.workFlow[0]?.approver_type || 'N/A';

    // if approver_type is user then label should be user name
    if (this.approverType === 'user') {
      wf.forEach((w: any) => {
        // Here you would typically fetch the user name from a service
        // For demonstration, we'll just append "User" to the identifier
        w.approver_identifier = this.MockDataService.getUserById(w.approver_identifier)?.name || w.approver_identifier;
      });
    }
    console.log('Workflow Data:', wf);

    this.stagesData = wf.map((w: any) => {
      const rec = hist.find((h: any) => h.stage === w.stage);
      return {
        stage: w.stage,
        label: w.approver_identifier,
        status: rec ? (rec.action as ActionType) : 'PENDING',
        comment: rec?.comment,
        date: rec?.created_at,
        approverType: w.approver_type
      };
    });

    console.log('Prepared Stages Data:', this.stagesData);
  }

  statusClasses(status: ActionType) {
    switch (status) {
      case 'APPROVED':
        return {
          circle: 'bg-blue-600 border-blue-600 text-white',
          ring: 'ring-2 ring-blue-200',
          text: 'text-slate-700'
        };
      case 'REJECTED':
        return {
          circle: 'bg-red-600 border-red-600 text-white',
          ring: 'ring-2 ring-red-200',
          text: 'text-slate-700'
        };
      default:
        return {
          circle: 'bg-white border-slate-300 text-slate-600',
          ring: '',
          text: 'text-slate-500'
        };
    }
  }

  formatIndex(i: number) {
    // return two-digit like 01, 02
    const n = i + 1;
    return n < 10 ? `0${n}` : `${n}`;
  }
}
