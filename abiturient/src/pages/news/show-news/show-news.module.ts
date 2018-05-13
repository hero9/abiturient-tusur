import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowNewsPage } from './show-news';

@NgModule({
  declarations: [
    ShowNewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowNewsPage),
  ],
})
export class ShowNewsPageModule {}
