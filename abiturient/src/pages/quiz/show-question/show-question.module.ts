import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowQuestionPage } from './show-question';

@NgModule({
  declarations: [
    ShowQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowQuestionPage),
  ],
})
export class ShowQuestionPageModule {}
