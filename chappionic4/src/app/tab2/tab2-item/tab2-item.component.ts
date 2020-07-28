import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';
import { NavController } from '@ionic/angular';
import { Conversation } from 'src/app/models/conversation.model';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab2-item',
  templateUrl: './tab2-item.component.html',
  styleUrls: ['./tab2-item.component.scss'],
})
export class Tab2ItemComponent implements OnInit {
  @Input() contact: any;
  contactUserObj: User = null;
  @Input() currentUser: User = null;
  conversations: Conversation[] = [];
  constructor(
    private api: ApiService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    if (this.contact && this.contact.contactUserId) {
      this.api.getSingle(`users`, this.contact.contactUserId).subscribe((user: User) => {
        user.image = `https://ui-avatars.com/api/?name=${user.name}`;
        this.contactUserObj = user;

      });

      this.api.getAll(`conversations/filter/user/${this.currentUser.id}`).subscribe((conversations: Conversation[]) => {
        this.conversations = conversations;
      });
    }

  }
  private showConversationPage() {
    if (this.conversations.length > 0) {
      this.navCtrl.navigateForward('conversation',
        { queryParams: this.conversations[0] });
    } else {
      this.api.create(`conversations`, {
        userId: this.currentUser.id,
        contactId: this.contactUserObj.id
      }).subscribe((g: Conversation) => {
        this.navCtrl
          .navigateForward('conversation', { queryParams: g });
      });
    }
  }

}
