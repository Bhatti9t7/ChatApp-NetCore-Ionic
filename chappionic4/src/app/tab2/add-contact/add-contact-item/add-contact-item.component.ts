import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-contact-item',
  templateUrl: './add-contact-item.component.html',
  styleUrls: ['./add-contact-item.component.scss'],
})
export class AddContactItemComponent implements OnInit {

  @Input() user: User;
  @Input() currentUserId: number;
  constructor(public api: ApiService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.user.image = `https://ui-avatars.com/api/?name=${this.user.name}`;
  }
  addContact() {
    this.api.create(`contacts`, {
      userId: this.currentUserId,
      contactUserId: this.user.id
    }).subscribe(u => {
      this.navCtrl.navigateRoot('tabs/tabs/tab2');
    })

  }

}
