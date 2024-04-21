import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbAlertModule,
  NgbDateStruct,
  NgbDatepicker,
  NgbDatepickerModule,
  NgbTimepicker,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-response-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    NgbAlertModule,
    NgbTimepickerModule,
  ],
  templateUrl: './responseDialog.component.html',
  styleUrl: './responseDialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResponseDialogComponent {
  activeModal: NgbActiveModal = inject(NgbActiveModal);
  option = '';
  YesNo = '';
  reservation: any;
  order: any;

  dateValue: NgbDateStruct | null = null;

  timeValue = {
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  };
  nbPersonne = '0';
  nbEnfants = '0';
  preferences = '';

  start = '';
  dish = '';
  dessert = '';

  starts = [
    'Oeufs à la mayonnaise',
    'Salade tomates mozzarella',
    'Salade de chèvre chaud',
    'Salade César',
    'Salade de gésiers',
    '',
  ];
  dishes = [
    'Pates carbonara',
    'Pates bolognaise',
    'Escalope milanaise',
    'Steak frites',
    'Pizza',
    'Ravioles aux fromages',
    '',
  ];
  desserts = [
    'Tiramisu',
    'Mousse au chocolat',
    'Crème brulée',
    'Tarte aux pommes',
    'Tarte au citron',
    'Fondant au chocolat',
    'Café gourmand',
    '',
  ];

  pollBody: any;
  answers = [];

  closeModal() {
    let result: any;
    switch (this.option) {
      case 'YesNo':
        result = { type: ['Text'], content: this.YesNo };
        break;
      case 'Reservation':
        let day: any = this.dateValue?.day,
          month: any = this.dateValue?.month,
          year: any = this.dateValue?.year,
          hour: any = this.timeValue.hour,
          minute: any = this.timeValue.minute;
        day = Number(day) > 9 ? day : '0' + day;
        month = Number(month) > 9 ? month : '0' + month;
        hour = Number(hour) > 9 ? hour : '0' + hour;
        minute = Number(minute) > 9 ? minute : '0' + minute;
        this.reservation = {
          date: day + '/' + month + '/' + year + ' ' + hour + ':' + minute,
          nbPers: this.nbPersonne,
          child: {
            hasChild: !!this.nbEnfants,
            nbChild: this.nbEnfants,
          },
          preferences: this.preferences.includes(',')
            ? this.preferences.split(',')
            : [this.preferences || 'Aucune'],
        };
        result = { type: ['Reservation'], content: this.reservation };
        break;
      case 'Order':
        this.order = {
          Start: { inOrder: !!this.start, name: this.start },
          Dish: { inOrder: !!this.dish, name: this.dish },
          Desert: { inOrder: !!this.dessert, name: this.dessert },
        };
        result = { type: ['Order'], content: this.order };
        break;
      case 'Poll':
        result = {
          type: ['Text'],
          content: this.answers[0],
        };
        break;
      default:
        break;
    }
    this.activeModal.close(result);
  }
}
