import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { WwLaneCoreUtilityModule } from 'wwlane-core-utility';
import { WwLaneUtilityModule } from 'wwlane-utility';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		WwLaneUtilityModule.forRoot(environment)
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
