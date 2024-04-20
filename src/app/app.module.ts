import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ChatService } from './chat.service';
import { OptionDialogComponent } from './optionDialog/optionDialog.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, OptionDialogComponent],
  providers: [ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
