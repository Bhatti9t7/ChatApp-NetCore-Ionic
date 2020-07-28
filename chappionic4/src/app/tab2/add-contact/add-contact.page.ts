import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { Contact } from 'src/app/models/contact.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
  users: User[] = [];
  currentUser: User = null;
  constructor(
    private api: ApiService,
    private navCtrl: NavController,
    private storage: StorageService) {
    storage.getObject(`user`).then((currentUser: any) => {
      this.currentUser = currentUser;
      api.getAll(`contacts/filter/user/other/${currentUser.id}`).subscribe((users: User[]) => {
        this.users = users;
      });
    });

  }

  ngOnInit() {
  }

}
