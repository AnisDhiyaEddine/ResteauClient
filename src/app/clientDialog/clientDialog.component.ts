import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbActiveModal,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './clientDialog.component.html',
  styleUrl: './clientDialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDialogComponent {
  activeModal: NgbActiveModal = inject(NgbActiveModal);

  closeModal() {
    this.activeModal.close({ type: ['Text'], content: 'YesNo' });
  }
}
