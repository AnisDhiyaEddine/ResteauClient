import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbDateStruct,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-option-dialog',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './optionDialog.component.html',
  styleUrl: './optionDialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionDialogComponent {
  activeModal: NgbActiveModal = inject(NgbActiveModal);
  dateValue: NgbDateStruct | null = null;
  optionIndex = 0;
  question = '';

  closeModal() {
    let result = '';
    switch (this.optionIndex) {
      case 0:
        result = this.question;
        break;
      case 1:
        result = this.question;
        break;
      case 2:
        result = this.dateValue
          ? this.dateValue.day +
            '/' +
            this.dateValue.month +
            '/' +
            this.dateValue.day
          : '';
        break;
      default:
        this.activeModal.close();
        break;
    }
    this.activeModal.close(result);
  }
  incIndex() {
    this.optionIndex = (this.optionIndex + 1) % this.options.length;
  }
  decIndex() {
    this.optionIndex =
      (this.optionIndex - 1 + this.options.length) % this.options.length;
  }

  options = ['ultimatum', 'survey', 'date'];

  // get result of activeModal.close() in app.component.ts
}
