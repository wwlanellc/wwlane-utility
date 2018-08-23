import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { WwLaneCoreUtilityModule } from 'wwlane-core-utility';

import { DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE, ENVIRONMENT_CODE_HANDLE } from './config/config';

import { LoadingIfDirective } from './directive/loading-if.directive';
import { ImportantClassDirective } from './directive/important-class.directive';

import { ObjectPropertyComponent } from './object/property/object-property.component';
import { ObjectPropertyPipe } from './object/property/object-property.pipe';
import { LoadingDefaultComponent } from './element/loading-default/loading-default.component';

@NgModule({
	imports: [
		CommonModule,
		WwLaneCoreUtilityModule
	],
	declarations: [
		LoadingIfDirective,
		ImportantClassDirective,
		ObjectPropertyComponent,
		ObjectPropertyPipe,
		LoadingDefaultComponent
	],
	exports: [
		LoadingIfDirective,
		ImportantClassDirective,
		ObjectPropertyComponent,
		ObjectPropertyPipe
	],
	entryComponents: [
		LoadingDefaultComponent
	]
})
export class WwLaneUtilityModule {
	static forRoot(environment): ModuleWithProviders {
		return {
			ngModule: WwLaneUtilityModule,
			providers: [
				{
					provide: DEFAULT_OBJECT_PROPERTY_UNKNOWN_VALUE,
					useValue: environment.defaultObjectPropertyUnknownValue
				},
				{
					provide: ENVIRONMENT_CODE_HANDLE,
					useValue: environment.codeHandle
				}
			]
		};
	}
}
