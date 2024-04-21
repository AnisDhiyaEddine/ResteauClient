import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbDateStruct,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resto-dialog',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './restoDialog.component.html',
  styleUrl: './restoDialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestoDialogComponent {
  activeModal: NgbActiveModal = inject(NgbActiveModal);
  dateValue: NgbDateStruct | null = null;
  optionIndex = 0;
  Uquestion: any;
  Pquestion = '';
  choice1 = '';
  choice2 = '';
  choice3 = '';
  choice4 = '';

  closeModal() {
    let result: any;
    switch (this.optionIndex) {
      case 0:
        result = { type: ['Text'], content: this.Uquestion };
        break;
      case 1:
        result = {
          type: ['Poll'],
          content: [
            {
              question: this.Pquestion,
              answers: [
                this.choice1,
                this.choice2,
                this.choice3,
                this.choice4,
              ].filter((c) => c),
            },
          ],
        };
        break;
      default:
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

  options = ['Request', 'Poll'];
  requests = ['YesNo', 'Order', 'Reservation'];

  // get result of activeModal.close() in app.component.ts
}
