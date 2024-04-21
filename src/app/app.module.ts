import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ChatService } from './chat.service';
import { RestoDialogComponent } from './restoDialog/restoDialog.component';
import { ClientDialogComponent } from './clientDialog/clientDialog.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RestoDialogComponent, ClientDialogComponent],
  providers: [ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
