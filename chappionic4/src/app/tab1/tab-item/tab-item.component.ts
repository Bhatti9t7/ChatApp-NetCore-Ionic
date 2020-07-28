import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Conversation } from 'src/app/models/conversation.model';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';
import { Message } from 'src/app/models/message.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
})
export class TabItemComponent implements OnInit {

  @Input() conversation: Conversation;
  contactUser: User = null;
  currentUser: User = null;
  lastMessage: Message = null;
  constructor(private navCtrl: NavController, private api: ApiService, private storage: StorageService) {

  }

  ngOnInit() {
    this.storage.getObject(`user`).then((u: any) => {
      this.currentUser = u;
      this.api
        .getSingle(`users`, this.conversation.contactId === this.currentUser.id ? this.conversation.userId : this.conversation.contactId)
        .subscribe((contactUser: User) => {
          this.contactUser = contactUser;
        });
      this.api.getAll(`messages/filter/conversation/${this.conversation.id}/last`).subscribe((lastMessage: Message) => {
        this.lastMessage = lastMessage;
      });
    });

  }
  private showConversationPage() {

    this.navCtrl.navigateForward('conversation',
      { queryParams: this.conversation });
  }

}
