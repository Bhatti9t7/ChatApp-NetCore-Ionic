import { Component, OnInit } from '@angular/core';
import { countryCodes } from 'src/common/CountryCodes';
import { Platform, NavController } from '@ionic/angular';
import { ApiService } from './../services/api.service';
import { User } from '../models/user.model';
import { StorageService } from '../services/storage.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private countries: Array<any> = countryCodes;
  private confirmData: any = { countryCode: '+1', phoneNumber: '', name: '' };
  private logoPath = 'assets/imgs/chat.png';
  // private users: User[] = [];

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private api: ApiService,
    private storage: StorageService
  ) {
    if (!this.platform.is('cordova')) { this.logoPath = `/${this.logoPath}` };
    storage.getObject(`user`).then(user => {
      if (user) {
        this.navCtrl.navigateRoot('tabs/tabs');
      }
    });
  }

  ngOnInit() {

  }

  showEnterCodePage() {
    const { confirmData } = this;
    this.api
      .getAll(
        `users/filter/phoneno?countryCode=${encodeURIComponent(confirmData.countryCode)}&phoneNumber=${confirmData.phoneNumber}`)
      .subscribe(user => {
        this.storage.setObject(`user`, user).then(g => {
          this.navCtrl.navigateRoot('tabs/tabs');
        });

      }, err => {
        this.api.create('users', {
          countryCode: confirmData.countryCode,
          phoneNumber: confirmData.phoneNumber + '',
          name: confirmData.name,
          description: 'Hello There, I`m using .netChat',
          image: ''
        }).subscribe(savedUser => {
          this.storage.setObject(`user`, savedUser).then(g => {
            this.navCtrl.navigateRoot('tabs/tabs');
          });
        });

      });

    // this.navCtrl.navigateRoot('enter-code')
  }

}
