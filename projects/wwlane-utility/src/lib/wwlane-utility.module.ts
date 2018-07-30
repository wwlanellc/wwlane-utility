import { NgModule, InjectionToken } from '@angular/core';

import { DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE } from './config';
import { ObjectPropertyService } from './object-property/object-property.service';
import { ObjectPropertyComponent } from './object-property/object-property.component';
import { LoadingIfDirective } from './loading-if.directive';

@NgModule({
	imports: [
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
				ObjectPropertyService,
				{
					provide: DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE,
					useValue: environment.defaultObjectPropertyUnknownValue
				}
			]
		};
	}
}
