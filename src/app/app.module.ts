import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { MaterializeModule } from 'angular2-materialize';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppsComponent } from './apps/apps.component';
import { AddComponent } from './add/add.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    AppsComponent,
    AddComponent,
    StatsComponent,
    SettingsComponent
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
		MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
