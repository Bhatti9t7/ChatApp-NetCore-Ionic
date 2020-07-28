import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';
import { Contact } from '../models/contact.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private contactsList: Array<any> = [];
  currentUser: User = null;
  constructor(
    private navCtrl: NavController,
    storage: StorageService,
    api: ApiService
  ) {
    storage.getObject(`user`).then((user: any) => {
      if (user) {
        this.currentUser = user;
        api.getAll(`contacts/filter/user/${user.id}`).subscribe((contacts: Contact[]) => {
          // this.contactsList = contacts.filter(m => m.userId === user.id);
          this.contactsList = contacts;
        });
      }
    });
  }

  onAddContact() {
    this.navCtrl.navigateRoot('add-contact');
  }


}
