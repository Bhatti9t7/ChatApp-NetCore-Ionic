import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../models/user.model';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  currentUser: User = null;
  constructor(
    private storage: StorageService,
    private navCtrl: NavController,
  ) {
    storage.getObject(`user`).then((u: any) => {
      this.currentUser = u;
    });
  }
  onLogout() {
    this.storage.removeItem(`user`).then(g => {
      this.navCtrl.navigateForward(`signup`);
    });
  }
}
