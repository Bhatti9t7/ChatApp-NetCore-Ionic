import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddContactPage } from './add-contact.page';
import { AddContactItemComponent } from './add-contact-item/add-contact-item.component';

const routes: Routes = [
  {
    path: '',
    component: AddContactPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddContactPage, AddContactItemComponent]
})
export class AddContactPageModule { }
