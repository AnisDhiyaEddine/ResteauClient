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
import { RestoDialogComponent } from './restoDialog/restoDialog.component';
import { ClientDialogComponent } from './clientDialog/clientDialog.component';
import { ResponseDialogComponent } from './responseDialog/responseDialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    RestoDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private modalService = inject(NgbModal);

  constructor(private chatService: ChatService) {
    chatService.listen('broadcast').subscribe((data: any) => {
      if (this.requests.includes(data.content)) {
        const modalRef = this.modalService.open(ResponseDialogComponent, {
          centered: true,
        });
        modalRef.componentInstance.option = data.content;
        modalRef.closed.subscribe((result) => {
          this.chatService.sendMessage(
            data.client === 1 ? 2 : 1,
            result.type,
            JSON.stringify({ content: result.content })
          );
        });
      } else if (data.type[0] === 'Poll') {
        const modalRef = this.modalService.open(ResponseDialogComponent, {
          centered: true,
        });
        modalRef.componentInstance.option = 'Poll';
        modalRef.componentInstance.pollBody = JSON.parse(data.content);
        modalRef.closed.subscribe((result) => {
          this.chatService.sendMessage(
            data.client === 1 ? 2 : 1,
            result.type,
            JSON.stringify({ content: result.content })
          );
        });
      }
      this.messages.push(data);
    });
  }

  messageType = ['Text'];
  restoModel: any;
  clientModel: any;

  title = 'resteau';
  requests = ['YesNo', 'Order', 'Reservation'];

  messages: any[] = [];

  openRestoDialog() {
    const modalRef = this.modalService.open(RestoDialogComponent, {
      centered: true,
    });
    modalRef.closed.subscribe((result) => {
      const { type, content } = result;
      this.messageType = type;
      this.restoModel = content;
      this.sendMessage(1);
    });
  }

  openClientDialog() {
    const modalRef = this.modalService.open(ClientDialogComponent, {
      centered: true,
    });
    modalRef.closed.subscribe((result) => {
      const { type, content } = result;
      this.messageType = type;
      this.clientModel = content;
      this.sendMessage(2);
    });
  }

  sendMessage(client: number) {
    this.chatService.sendMessage(
      client,
      this.messageType,
      JSON.stringify({
        content: client === 1 ? this.restoModel : this.clientModel,
      })
    );
    client === 1 ? (this.restoModel = '') : (this.clientModel = ''); // cleaning the input
    this.messageType = ['Text'];
  }
}
