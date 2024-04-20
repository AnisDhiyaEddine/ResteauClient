import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NgbCalendar,
  NgbDatepickerModule,
  NgbDateStruct,
  NgbModal,
  NgbActiveModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { OptionDialogComponent } from './optionDialog/optionDialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    OptionDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private modalService = inject(NgbModal);

  constructor(private chatService: ChatService) {
    chatService.listen('broadcast').subscribe((data: any) => {
      this.messages.push(data);
    });
  }

  client1Model = '';
  client2Model = '';

  title = 'resteau';

  messages: any[] = [];

  openOptionDialog() {
    const modalRef = this.modalService.open(OptionDialogComponent, {
      centered: true,
    });
    modalRef.closed.subscribe((result) => {
      console.log(result);
    });
  }

  closeOptionDialog() {
    this.modalService.dismissAll();
  }

  sendMessage(client: number) {
    this.chatService.sendMessage(
      client,
      client === 1 ? this.client1Model : this.client2Model
    );
    client === 1 ? (this.client1Model = '') : (this.client2Model = ''); // cleaning the input
  }
}
