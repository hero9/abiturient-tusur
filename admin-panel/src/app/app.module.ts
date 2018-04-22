import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { RouterModule } from '@angular/router';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import { AppRoutingModule } from './app-routing.module';
import { StatsRoutingModule } from './stats/stats-routing.module';
import { AppComponent } from './app.component';
import { AppsComponent } from './apps/apps.component';
import { AddComponent } from './add/add.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { PageComponent } from './page/page.component';
import { FormBuilder } from '@angular/forms';
import { EnrolleeListComponent } from './enrollee-list/enrollee-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AppsComponent,
    AddComponent,
    StatsComponent,
    SettingsComponent,
		EnrolleeListComponent,
		PageComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: 'stats', pathMatch: 'full' },
			{ path: 'stats', component: StatsComponent },
			{ path: 'apps', component: AppsComponent },
			{ path: 'add', component: AddComponent },
			{ path: 'settings', component: SettingsComponent },
			{ path: 'enrollee-list', component: EnrolleeListComponent },
			{ path: 'page', component: PageComponent }
		]),
		BrowserAnimationsModule,
		MaterialModule,
		FormsModule,
		NgbModule.forRoot(),
		HttpModule,
		HttpClientModule,
		ReactiveFormsModule,
		FroalaEditorModule.forRoot(),
		FroalaViewModule.forRoot(),
  ],
providers: [FormBuilder, DataService, DatePipe],
bootstrap: [AppComponent]
})
export class AppModule { }
