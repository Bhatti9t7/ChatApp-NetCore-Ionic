import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { ChatService } from './../services/chat.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  currentUser: User = null;
  contactUser: User = null;


  private contactInfo: any = {
    name: 'JOHN DOE',
    status: 'ONLINE'
  };
  private showOptions: boolean = false;
  messageText = '';
  // private messages: Array<any> = [
  //   { text: "Hey what's up?", type: 'received', created: '14:02' },
  //   { text: "Nothing", type: 'send', created: '14:05' },
  //   { text: "Want to go to the movies?", type: 'send', created: '14:05' },
  //   { text: "I'm sorry, I can't", type: 'received', created: '14:15' },
  //   { text: "but can we go tomorrow?", type: 'received', created: '14:16' },
  //   { text: "Nothing", type: 'send', created: '14:05' },
  //   { text: "Nothing", type: 'send', created: '14:05' },
  //   { text: "Nothing", type: 'send', created: '14:05' },
  //   { text: "Nothing", type: 'send', created: '14:05' },
  //   { text: "I'm sorry, I can't", type: 'received', created: '14:15' },
  //   { text: "but can we go tomorrow?", type: 'received', created: '14:16' },
  // ];
  messages: Message[] = [];
  conversationId = null;


  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private storage: StorageService,
    private api: ApiService,
    private chatservice: ChatService) {
    this.route.queryParams.subscribe(params => {
      if (params.id && params.contactId && params.userId) {
        storage.getObject(`user`).then((user: any) => {
          if (user) {
            this.currentUser = user;
            api
              .getSingle(`users`, params.contactId === this.currentUser.id ? params.userId : params.contactId)
              .subscribe((contactUser: User) => {
                this.contactUser = contactUser;
              });
            this.conversationId = parseInt(params.id + '');
            this.getAllMessages();
          }
        });


      } else {
        navCtrl.navigateForward('/tabs/tabs/tab2');
      }
    });
  }

  ngOnInit() {
    this.chatservice.messageReceived.subscribe((receivedMessage: Message) => {
      if (receivedMessage.receiverId === this.currentUser.id) {
        this.messages.push(receivedMessage);
      }
    });
  }
  getAllMessages() {
    this.api.getAll(`messages/filter/conversation/${this.conversationId}`)
      .subscribe((messages: Message[]) => {
        this.messages = messages;
      });
  }

  showOptionsToggle(value?: boolean) {
    if (value !== undefined) {
      this.showOptions = value;
      return;
    }
    this.showOptions = !this.showOptions;
  }


  onSend() {
    if (this.messageText !== '') {
      const messageObj: Message = {
        id: null,
        conversationId: this.conversationId,
        senderId: this.currentUser.id,
        receiverId: this.contactUser.id,
        message: this.messageText,
        date: new Date()
      };
      delete messageObj.id;
      this.api.create(`messages`, messageObj).subscribe((message: Message) => {
        console.log(message);
      });
      this.chatservice.sendMessage(messageObj);
      this.messages.push(messageObj);
      this.messageText = '';

    }
  }
}
