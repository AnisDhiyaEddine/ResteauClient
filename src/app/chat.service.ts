import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  socket: any;
  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }

  ngOnInit(): void {}

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  sendMessage(client: number, type: string[], content: string) {
    this.socket.emit('new-message', JSON.stringify({ client, type, content }));
  }
}
