import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppsComponent } from './apps/apps.component';
import { AddComponent } from './add/add.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { FormBuilder } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AppsComponent,
    AddComponent,
    StatsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: 'stats', pathMatch: 'full' },
			{ path: 'stats', component: StatsComponent },
			{ path: 'apps', component: AppsComponent },
			{ path: 'add', component: AddComponent },
			{ path: 'settings', component: SettingsComponent }
		]),
		BrowserAnimationsModule,
		MaterialModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
