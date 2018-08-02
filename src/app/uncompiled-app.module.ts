import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { WwLaneUtilityModule } from './lib/wwlane-utility.module';

import { UncompiledAppComponent } from './uncompiled-app.component';

@NgModule({
	declarations: [
		UncompiledAppComponent
	],
	imports: [
		BrowserModule,
		WwLaneUtilityModule.forRoot(environment)
	],
	providers: [],
	bootstrap: [UncompiledAppComponent]
})
export class UncompiledAppModule { }
