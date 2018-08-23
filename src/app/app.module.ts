import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { WwLaneUtilityModule } from '../../projects/wwlane-utility/src/lib/wwlane-utility.module';

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
