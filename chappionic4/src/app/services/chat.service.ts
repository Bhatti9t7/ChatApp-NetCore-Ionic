import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Message } from '../models/message.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<boolean>();

  private connectionIsEstablished = false;
  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendMessage(message: Message) {
    this.hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.baseURL + '/chathub')
      .build();
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(() => { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('ReceiveMessage', (data: any) => {
      this.messageReceived.emit(data);
    });
  }
}
