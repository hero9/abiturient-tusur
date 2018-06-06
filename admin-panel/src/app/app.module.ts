import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { RouterModule } from '@angular/router';
import * as $ from 'jquery';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';


import { AppRoutingModule } from './app-routing.module';
import { StatsRoutingModule } from './stats/stats-routing.module';
import { AppComponent } from './app.component';
import { AppsComponent } from './apps/apps.component';
import { AddNewsComponent } from './news/add-news/add-news.component';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { PageComponent } from './page/page.component';
import { FormBuilder } from '@angular/forms';
import { EnrolleeListComponent } from './enrollee-list/enrollee-list.component';
import { NewsComponent } from './news/news.component';
import { EventsComponent } from './events/events.component';
import { AddEventsComponent } from './events/add-events/add-events.component';
import { AddPageComponent } from './page/add-page/add-page.component';
import { PageContentComponent } from './page/page-content/page-content.component';
import { EditNewsComponent } from './news/edit-news/edit-news.component';
import { EditEventComponent } from './events/edit-event/edit-event.component';
import { EditPageComponent } from './page/edit-page/edit-page.component';
import { AuthComponent } from './auth/auth.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { QuizComponent } from './show-quiz/quiz/quiz.component';
import { ShowQuizComponent } from './show-quiz/show-quiz.component';
import { FroalaComponent } from './froala/froala.component';
import { MatNativeDateModule } from '@angular/material';
import { FacultiesComponent } from './faculties/faculties.component';
import { AddFacultiesComponent } from './faculties/add-faculties/add-faculties.component';


@NgModule({
  declarations: [
    AppComponent,
    AppsComponent,
    AddNewsComponent,
    StatsComponent,
    SettingsComponent,
		EnrolleeListComponent,
		PageComponent,
		NewsComponent,
		EventsComponent,
		AddEventsComponent,
		AddPageComponent,
		PageContentComponent,
		EditNewsComponent,
		EditEventComponent,
		EditPageComponent,
		AuthComponent,
		QuizComponent,
		ShowQuizComponent,
		FroalaComponent,
		FacultiesComponent,
		AddFacultiesComponent
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot([
			{ path: '', redirectTo: 'stats', pathMatch: 'full' },
			{ path: 'stats', component: StatsComponent, canActivate: [AuthGuard] },
			{ path: 'apps', component: AppsComponent, canActivate: [AuthGuard] },
			{ path: 'add-news', component: AddNewsComponent, canActivate: [AuthGuard] },
			{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
			{ path: 'enrollee-list', component: EnrolleeListComponent, canActivate: [AuthGuard] },
			{ path: 'page', component: PageComponent, canActivate: [AuthGuard] },
			{ path: 'news', component: NewsComponent, canActivate: [AuthGuard] },
			{ path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
			{ path: 'add-events', component: AddEventsComponent, canActivate: [AuthGuard] },
			{ path: 'add-page', component: AddPageComponent, canActivate: [AuthGuard] },
			{ path: 'page-content', component: PageContentComponent, canActivate: [AuthGuard] },
			{ path: 'edit-news', component: EditNewsComponent, canActivate: [AuthGuard] },
			{ path: 'edit-event', component: EditEventComponent, canActivate: [AuthGuard] },
			{ path: 'edit-page', component: EditPageComponent, canActivate: [AuthGuard] },
			{ path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
			{ path: 'show-quiz', component: ShowQuizComponent, canActivate: [AuthGuard] },
			{ path: 'faculties', component: FacultiesComponent, canActivate: [AuthGuard] },
			{ path: 'add-faculties', component: AddFacultiesComponent, canActivate: [AuthGuard] },
			{ path: 'auth', component: AuthComponent },

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
		JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwtToken');
        },
        whitelistedDomains: ['localhost:8080']
      }
    }),
  ],
	providers: [
		FormBuilder, 
		DataService, 
		DatePipe,
		AuthGuard, 
		AuthService,
		{
			provide: HTTP_INTERCEPTORS,
   		useClass: AuthInterceptor,
   		multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
