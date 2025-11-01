import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() type: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) this.onClick.emit();
  }

  get buttonClass(): string {
    const base = `px-5 py-2  font-medium focus:outline-none transition-all duration-200`;

    const variants: Record<string, string> = {
      primary: `bg-[#0F3077] text-white hover:bg-blue-700 disabled:bg-blue-300`,
      secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-200`,
      danger: `bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300`,
    };

    return `${base} ${variants[this.type]}`;
  }
}
