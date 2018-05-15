import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowEventsPage } from './show-events';

@NgModule({
  declarations: [
    ShowEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowEventsPage),
  ],
})
export class ShowEventsPageModule {}
