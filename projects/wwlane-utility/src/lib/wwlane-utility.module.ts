import { NgModule, InjectionToken } from '@angular/core';

import { DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE } from './config';
import { ObjectPropertyComponent } from './object-property/object-property.component';
import { LoadingIfDirective } from './loading-if.directive';
import { WwLaneCoreUtilityModule } from 'wwlane-core-utility';

@NgModule({
	imports: [
		WwLaneCoreUtilityModule
	],
	declarations: [
		ObjectPropertyComponent,
		LoadingIfDirective
	],
	exports: [
		ObjectPropertyComponent,
		LoadingIfDirective
	]
})
export class WwLaneUtilityModule {
	static forRoot(environment) {
		return {
			ngModule: WwLaneUtilityModule,
			providers: [
				{
					provide: DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE,
					useValue: environment.defaultObjectPropertyUnknownValue
				}
			]
		};
	}
}
